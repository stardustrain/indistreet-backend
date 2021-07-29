import { IsEnum, IsString, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'

import Match from '../../common/decorators/Match'
import Default from '../../common/decorators/Default'
import { UserRole, UserLanguage } from '../entities/user.entity'

export class UserCreateDto {
  @Type(() => String)
  @IsString()
  username: string

  @Type(() => String)
  @IsString()
  password: string

  @Type(() => String)
  @IsString()
  @Match('password')
  passwordConfirm: string

  @Type(() => String)
  @IsOptional()
  @Default(UserRole.USER)
  @IsEnum(() => UserRole)
  role: UserRole

  @Type(() => String)
  @IsOptional()
  @IsEnum(() => UserLanguage)
  language?: UserLanguage

  @Type(() => Date)
  @IsOptional()
  birthday?: Date
}
