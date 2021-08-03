import { IsEnum, IsString, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'

import Match from '../../common/decorators/Match'
import { UserRole, UserLanguage } from '../entities/user.entity'
import { Musician } from '../../musicians/entities/musician.entity'

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
  @IsEnum(UserRole)
  role?: UserRole

  @Type(() => String)
  @IsOptional()
  @IsEnum(UserLanguage)
  language?: UserLanguage

  @Type(() => Date)
  @IsOptional()
  birthday?: Date

  @Type(() => Musician)
  @IsOptional()
  musician?: Musician
}
