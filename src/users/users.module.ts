import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { UsersController } from './users.controller'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { CaslModule } from '../casl/casl.module'
import { TokenModule } from '../token/token.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '5d',
        },
      }),
    }),
    CaslModule,
    TokenModule,
  ],
  providers: [UsersService, LocalStrategy, JwtStrategy],
  exports: [],
  controllers: [UsersController],
})
export class UsersModule {}
