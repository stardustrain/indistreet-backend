import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { hash } from 'bcrypt'

import { User } from './entities/user.entity'
import { UserCreateDto } from './dto/user-create.dto'

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
  ) {}

  generatePayload = (user: ValidatedUser) => ({
    username: user.username,
    sub: user.id,
  })

  findByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } })
  }

  async create(userDto: UserCreateDto) {
    const user = new User()
    user.username = userDto.username
    user.password = await hash(userDto.password, SALT_ROUND)
    return this.userRepository.save(user)
  }

  signin(user: ValidatedUser) {
    const payload = this.generatePayload(user)
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
