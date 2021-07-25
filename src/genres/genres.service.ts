import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Genre } from './entities/genre.entity'

import { FindallGenreDto } from './dto/findall-genre.dto'

import { getPaginationOption } from '../utils/pagination'

import type { Repository } from 'typeorm'

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  findAll({ page }: FindallGenreDto) {
    const { skip, take } = getPaginationOption(page)
    return this.genreRepository.findAndCount({
      relations: ['musicians'],
      skip,
      take,
    })
  }

  findOne(id: number) {
    return this.genreRepository.findOne(id)
  }
}
