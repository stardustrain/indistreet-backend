import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Strategy } from 'passport-local'
import { omit } from 'ramda'
import { compare } from 'bcrypt'

import { UsersService } from '../users.service'
import { PromiseReturnType } from '../../utils/typeUtility'

export type ValidatedUser = PromiseReturnType<LocalStrategy['validate']>

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super()
  }

  async validate(username: string, password: string) {
    const user = await this.userService.findByUsername(username)
    const isValidUser = await compare(password, user?.password ?? '')

    if (!user || !isValidUser) {
      throw new UnauthorizedException()
    }

    return omit(['password'], user)
  }
}
