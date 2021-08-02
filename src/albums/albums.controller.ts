import {
  Controller,
  Get,
  Query,
  Param,
  UseInterceptors,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AlbumsService } from './albums.service'
import { FindallAlbumDto } from './dto/findall-album.dto'
import { CreateAlbumDto } from './dto/create-album.dto'

import { NotFoundInterceptor } from '../common/interseptors/not-found-interceptor'
import { PoliciesGuard } from '../common/guards/policies.guard'
import { JwtGuard } from '../common/guards/jwt.guard'
import CheckPolicies from '../common/decorators/CheckPolicies'
import { CreateAlbumPolicyHandler } from './policies/create-album.policy'

@ApiTags('Albums')
@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  findAll(@Query() query: FindallAlbumDto) {
    return this.albumsService.findAll(query)
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  findOne(@Param() id: number) {
    return this.albumsService.findOne(id)
  }

  @UseGuards(JwtGuard, PoliciesGuard)
  @CheckPolicies(new CreateAlbumPolicyHandler())
  @Post()
  create(@Body() body: CreateAlbumDto) {
    return this.albumsService.create(body)
  }
}
