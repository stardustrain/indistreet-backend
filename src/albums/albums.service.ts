import { Injectable } from '@nestjs/common'
import { InjectRepository, InjectConnection } from '@nestjs/typeorm'
import { Repository, Connection } from 'typeorm'

import { Album } from './entities/album.entity'
import { Musician } from '../musicians/entities/musician.entity'

import { FindallAlbumDto } from './dto/findall-album.dto'
import { CreateAlbumDto } from './dto/create-album.dto'

import { getPaginationOption } from '../utils/pagination'

import type { FindManyOptions } from 'typeorm'

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectConnection()
    private readonly connection: Connection,
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

  async create(body: CreateAlbumDto) {
    const queryRunner = this.connection.createQueryRunner()

    await queryRunner.connect()

    const musician = await queryRunner.manager.findOneOrFail(
      Musician,
      body.musicianId,
      {
        select: ['id'],
      },
    )

    const album = this.albumRepository.create({
      ...body,
      musician,
    })

    return this.albumRepository.save(album)
  }
}
