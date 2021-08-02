import {
  Injectable,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common'
import { InjectRepository, InjectConnection } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { hash } from 'bcrypt'
import { omit } from 'ramda'

import { User } from './entities/user.entity'
import { UserCreateDto } from './dto/user-create.dto'
import { UserUpdateDto } from './dto/user-update.dto'
import { TokenService } from '../token/token.service'
import { Token } from '../token/entities/token.entity'

import type { Repository, Connection } from 'typeorm'
import type { ValidatedUser } from './strategies/local.strategy'
import type { ValidateJwt } from './strategies/jwt.strategy'

export type JwtPayload = ReturnType<UsersService['generatePayload']>

const SALT_ROUND = 10

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  generatePayload = (user: ValidatedUser) => ({
    username: user.username,
    sub: user.id,
  })

  findByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } })
  }

  async create(userDto: UserCreateDto) {
    const { password, ...restUserFields } = omit(['passwordConfirm'], userDto)

    const user = this.userRepository.create(restUserFields)
    user.password = await hash(password, SALT_ROUND)
    const savedUser = await this.userRepository.save(user)

    return this.login(savedUser)
  }

  async login(validatedUser: ValidatedUser) {
    const payload = this.generatePayload(validatedUser)
    const token = this.jwtService.sign(payload)

    const queryRunner = this.connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      // Remove existing token
      const user = await queryRunner.manager.findOne(User, validatedUser.id, {
        select: ['id'],
        relations: ['token'],
      })

      if (!user) {
        throw new ForbiddenException()
      }

      if (user.token) {
        await queryRunner.manager.remove(user.token)
      }

      // Create new token
      const tokenEntity = queryRunner.manager.create(Token, {
        token,
      })
      const createdToken = await queryRunner.manager.save(tokenEntity)
      user.token = createdToken
      const updatedUser = await queryRunner.manager.preload(User, user)

      if (!updatedUser) {
        throw new InternalServerErrorException()
      }

      await queryRunner.manager.update(User, updatedUser.id, updatedUser)

      await queryRunner.commitTransaction()

      return {
        accessToken: createdToken.token,
      }
    } catch (e) {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
  }

  async update(jwtPayload: ValidateJwt, userUpdateDto: UserUpdateDto) {
    const updatedUser = await this.userRepository.preload({
      id: jwtPayload.id,
      ...userUpdateDto,
    })

    if (!updatedUser) {
      throw new ForbiddenException()
    }

    await this.userRepository.update(updatedUser.id, updatedUser)
    return updatedUser
  }

  async logout(jwtPayload: ValidateJwt) {
    return this.tokenService.remove(jwtPayload.id)
  }
}
