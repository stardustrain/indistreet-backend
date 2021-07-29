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

import type { FastifyRequestWithAuthGuard } from 'fastify'
import type { JwtPayload } from './users.service'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiBody({ type: UserLoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(200)
  signin(@Req() req: FastifyRequestWithAuthGuard) {
    return this.userService.signin(req.user)
  }

  @Post('signup')
  create(@Body() userCreateDto: UserCreateDto) {
    return this.userService.create(userCreateDto)
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  profile(@Req() req: FastifyRequestWithAuthGuard) {
    return req.user
  }

  @UseGuards(JwtGuard)
  @Patch('profile')
  update(
    @Req() req: { user: JwtPayload },
    @Body() userUpdateDto: UserUpdateDto,
  ) {
    return this.userService.update(req.user, userUpdateDto)
  }
}
