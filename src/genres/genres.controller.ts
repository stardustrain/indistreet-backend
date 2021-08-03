import { Controller, Query, Param, Get, UseInterceptors } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { GenresService } from './genres.service'

import { FindallGenreDto } from './dto/findall-genre.dto'

import { NotFoundInterceptor } from '../common/interseptors/not-found-interceptor'

@ApiTags('Genres')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  findAll(@Query() query: FindallGenreDto) {
    return this.genresService.findAll(query)
  }

  @Get('/:id')
  @UseInterceptors(NotFoundInterceptor)
  findOne(@Param() { id }: { id: string }) {
    return this.genresService.findOne(id)
  }
}
