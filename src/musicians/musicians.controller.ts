import { Controller, Param, Query, Get, UseInterceptors } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { MusiciansService } from './musicians.service'
import { FindallMusicianDto } from './dto/findall-musician.dto'

import { NotFoundInterceptor } from '../common/interseptors/not-found-interceptor'

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
}
