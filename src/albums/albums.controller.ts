import { Controller, Get, Query, Param } from '@nestjs/common'

import { AlbumsService } from './albums.service'
import { FindallAlbumDto } from './dto/findall-album.dto'

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  findAll(@Query() query: FindallAlbumDto) {
    return this.albumsService.findAll(query)
  }

  @Get(':id')
  findOne(@Param() id: number) {
    return this.albumsService.findOne(id)
  }
}
