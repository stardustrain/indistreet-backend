import { PartialType, OmitType } from '@nestjs/mapped-types'

import { UserCreateDto } from './user-create.dto'

export class UserUpdateDto extends OmitType(PartialType(UserCreateDto), [
  'password',
  'passwordConfirm',
  'role',
  'username',
]) {}
