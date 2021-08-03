import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { UsersService } from '../users.service'

import type { JwtPayload } from '../users.service'
import type { PromiseReturnType } from '../../utils/typeUtility'

export type ValidateJwt = PromiseReturnType<JwtStrategy['validate']>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    })
  }

  async validate(payload: JwtPayload) {
    const token = await this.usersService.getUserToken(payload.sub)

    if (!token) {
      throw new UnauthorizedException()
    }

    return {
      id: payload.sub,
      username: payload.username,
      role: payload.role,
      musicianId: payload.musicianId,
    }
  }
}
