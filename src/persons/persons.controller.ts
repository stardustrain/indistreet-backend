import { Controller, Param, Query, Get, UseInterceptors } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { PersonsService } from './persons.service'

import { FindallPersonDto } from './dto/findall-person.dto'

import { NotFoundInterceptor } from '../common/interseptors/not-found-interceptor'

@ApiTags('Persons')
@Controller('persons')
export class PersonsController {
  constructor(private readonly personService: PersonsService) {}

  @Get()
  findAll(@Query() query: FindallPersonDto) {
    return this.personService.findAll(query)
  }

  @Get('/:id')
  @UseInterceptors(NotFoundInterceptor)
  findOne(@Param() { id }: { id: string }) {
    return this.personService.findOne(id)
  }
}
