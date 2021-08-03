import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Token } from './entities/token.entity'

import type { Repository } from 'typeorm'

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  create(token: string) {
    const newToken = this.tokenRepository.create({
      token,
    })
    return this.tokenRepository.save(newToken)
  }

  findByUserId(userId: number) {
    return this.tokenRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    })
  }

  async remove(userId: number) {
    const token = await this.findByUserId(userId)

    if (!token) {
      throw new BadRequestException()
    }

    return this.tokenRepository.remove(token)
  }
}
