import { Controller, Query, Param, Get, UseInterceptors } from '@nestjs/common'

import { GenresService } from './genres.service'

import { FindallGenreDto } from './dto/findall-genre.dto'

import { NotFoundInterceptor } from '../common/interseptors/not-found-interceptor'

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  findAll(@Query() query: FindallGenreDto) {
    return this.genresService.findAll(query)
  }

  @Get('/:id')
  @UseInterceptors(NotFoundInterceptor)
  findOne(@Param() id: number) {
    return this.genresService.findOne(id)
  }
}
