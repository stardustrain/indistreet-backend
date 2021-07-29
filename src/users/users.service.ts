import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { hash } from 'bcrypt'
import { omit } from 'ramda'

import { User } from './entities/user.entity'
import { UserCreateDto } from './dto/user-create.dto'
import { UserUpdateDto } from './dto/user-update.dto'
import { CaslAbilityFactory, Action } from '../casl/casl-ability.factory'

import type { Repository } from 'typeorm'
import type { ValidatedUser } from './strategies/local.strategy'

export type JwtPayload = ReturnType<UsersService['generatePayload']>

const SALT_ROUND = 10

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
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
    return this.userRepository.save(user)
  }

  signin(user: ValidatedUser) {
    const payload = this.generatePayload(user)
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async update(jwtPayload: JwtPayload, userUpdateDto: UserUpdateDto) {
    const user = await this.userRepository.findOne(jwtPayload.sub, {
      select: ['id'],
    })
    if (!user) {
      throw new BadRequestException()
    }
    const ability = this.caslAbilityFactory.createForUser(user)

    if (!ability.can(Action.Update, user)) {
      throw new ForbiddenException()
    }

    const updatedUesr = await this.userRepository.update(user.id, userUpdateDto)

    return updatedUesr
  }
}
