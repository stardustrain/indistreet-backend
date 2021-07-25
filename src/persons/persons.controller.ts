import { Controller, Param, Query, Get } from '@nestjs/common'

import { PersonsService } from './persons.service'

import { FindallPersonDto } from './dto/findall-person.dto'

@Controller('persons')
export class PersonsController {
  constructor(private readonly personService: PersonsService) {}

  @Get()
  findAll(@Query() query: FindallPersonDto) {
    return this.personService.findAll(query)
  }

  @Get('/:id')
  findOne(@Param() id: number) {
    return this.personService.findOne(id)
  }
}
