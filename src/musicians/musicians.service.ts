import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Musician } from './entities/musician.entity'

import { FindallMusicianDto } from './dto/findall-musician.dto'
import { CreateMusicianDto } from './dto/create-musician.dto'

import { getPaginationOption } from '../utils/pagination'

import type { Repository } from 'typeorm'

@Injectable()
export class MusiciansService {
  constructor(
    @InjectRepository(Musician)
    private readonly musicianRepository: Repository<Musician>,
  ) {}

  async findAll({ page }: FindallMusicianDto) {
    const { skip, take } = getPaginationOption(page)

    const [musicians, count] = await this.musicianRepository.findAndCount({
      skip,
      take,
    })

    return {
      data: musicians,
      count,
    }
  }

  findOne(id: number) {
    return this.musicianRepository.findOne(id, {
      relations: ['albums', 'songs', 'members', 'genres', 'products'],
    })
  }

  create(body: CreateMusicianDto) {
    const musician = this.musicianRepository.create(body)
    return this.musicianRepository.save(musician)
  }
}
