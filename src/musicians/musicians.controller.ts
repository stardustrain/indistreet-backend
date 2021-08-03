import {
  Controller,
  Param,
  Query,
  Body,
  Get,
  Post,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { MusiciansService } from './musicians.service'
import { FindallMusicianDto } from './dto/findall-musician.dto'
import { CreateMusicianDto } from './dto/create-musician.dto'

import { NotFoundInterceptor } from '../common/interseptors/not-found-interceptor'
import { JwtGuard } from '../common/guards/jwt.guard'
import { PoliciesGuard } from '../common/guards/policies.guard'
import CheckPolicies from 'src/common/decorators/CheckPolicies'
import { CreateMusicianPolicyHandler } from './policies/create-musician.policy'

import type { ValidateJwt } from '../users/strategies/jwt.strategy'

@ApiTags('Musicians')
@Controller('musicians')
export class MusiciansController {
  constructor(private readonly musiciansService: MusiciansService) {}

  @Get()
  findAll(@Query() query: FindallMusicianDto) {
    return this.musiciansService.findAll(query)
  }

  @Get('/:id')
  @UseInterceptors(NotFoundInterceptor)
  findOne(@Param('id') id: number) {
    return this.musiciansService.findOne(id)
  }

  @UseGuards(JwtGuard, PoliciesGuard)
  @CheckPolicies(new CreateMusicianPolicyHandler())
  @Post()
  create(@Body() body: CreateMusicianDto, @Req() req: { user: ValidateJwt }) {
    return this.musiciansService.create(body, req)
  }
}
