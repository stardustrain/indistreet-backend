import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Req,
  UseGuards,
  HttpCode,
} from '@nestjs/common'
import { ApiTags, ApiBody } from '@nestjs/swagger'

import { UsersService } from './users.service'

import { UserLoginDto } from './dto/user-login.dto'
import { UserCreateDto } from './dto/user-create.dto'
import { UserUpdateDto } from './dto/user-update.dto'

import { LocalAuthGuard } from './guards/local-auth.guard'
import { JwtGuard } from './guards/jwt.guard'
import { PoliciesGuard } from '../common/guards/policies.guard'
import CheckPolicies from '../common/decorators/CheckPolicies'
import { UpdateUserPolicyHandler } from './policies/update-user.policy'

import type { FastifyRequestWithAuthGuard } from 'fastify'
import type { ValidateJwt } from './strategies/jwt.strategy'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiBody({ type: UserLoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  signin(@Req() req: FastifyRequestWithAuthGuard) {
    return this.userService.login(req.user)
  }

  @Post('signup')
  create(@Body() body: UserCreateDto) {
    return this.userService.create(body)
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  profile(@Req() req: FastifyRequestWithAuthGuard) {
    return req.user
  }

  @UseGuards(JwtGuard, PoliciesGuard)
  @CheckPolicies(new UpdateUserPolicyHandler())
  @Patch('profile')
  update(@Req() req: { user: ValidateJwt }, @Body() body: UserUpdateDto) {
    return this.userService.update(req.user, body)
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  @HttpCode(204)
  logout(@Req() req: { user: ValidateJwt }) {
    return this.userService.logout(req.user)
  }
}
