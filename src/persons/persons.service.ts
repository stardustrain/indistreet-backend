import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Person } from './entities/person.entity'

import { FindallPersonDto } from './dto/findall-person.dto'

import { getPaginationOption } from '../utils/pagination'

import type { Repository } from 'typeorm'

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  findAll({ page }: FindallPersonDto) {
    const { skip, take } = getPaginationOption(page)

    return this.personRepository.find({
      skip,
      take,
    })
  }

  findOne(id: number) {
    return this.personRepository.findOne(id)
  }
}
