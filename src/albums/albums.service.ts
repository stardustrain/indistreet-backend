import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Album } from './entities/album.entity'
import { FindallAlbumDto } from './dto/findall-album.dto'

import type { FindManyOptions } from 'typeorm'

const DEFAULT_PAGE_SIZE = 20

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  findAll({ page = 1, removed }: FindallAlbumDto) {
    const where: FindManyOptions<Album>['where'] = {}

    if (typeof removed !== 'undefined') {
      where['isremoved'] = removed
    }

    return this.albumRepository.findAndCount({
      skip: (page - 1) * DEFAULT_PAGE_SIZE,
      take: DEFAULT_PAGE_SIZE,
      where,
    })
  }

  findOne(id: number) {
    return this.albumRepository.findOne(id)
  }
}
