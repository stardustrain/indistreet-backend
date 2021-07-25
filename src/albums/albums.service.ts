import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Album } from './entities/album.entity'

import { FindallAlbumDto } from './dto/findall-album.dto'

import { getPaginationOption } from '../utils/pagination'

import type { FindManyOptions } from 'typeorm'

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  findAll({ page, removed }: FindallAlbumDto) {
    const where: FindManyOptions<Album>['where'] = {}

    if (typeof removed !== 'undefined') {
      where['isRemoved'] = removed
    }

    const { skip, take } = getPaginationOption(page)

    return this.albumRepository.findAndCount({
      skip,
      take,
      where,
    })
  }

  findOne(id: number) {
    return this.albumRepository.findOne(id)
  }
}
