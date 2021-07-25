import { Controller, Get, Query, Param, UseInterceptors } from '@nestjs/common'

import { AlbumsService } from './albums.service'

import { FindallAlbumDto } from './dto/findall-album.dto'

import { NotFoundInterceptor } from '../common/interseptors/not-found-interceptor'

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
}
