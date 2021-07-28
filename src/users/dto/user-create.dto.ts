import { IsString } from 'class-validator'
import { Type } from 'class-transformer'
import Match from '../../common/decorators/Match'

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
}
