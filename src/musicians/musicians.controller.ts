import { Controller, Param, Query, Get } from '@nestjs/common'

import { MusiciansService } from './musicians.service'

import { FindallMusicianDto } from './dto/findall-musician.dto'

@Controller('musicians')
export class MusiciansController {
  constructor(private readonly musiciansService: MusiciansService) {}

  @Get()
  findAll(@Query() query: FindallMusicianDto) {
    return this.musiciansService.findAll(query)
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.musiciansService.findOne(id)
  }
}
