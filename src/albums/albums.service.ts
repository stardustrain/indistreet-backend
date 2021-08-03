import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository, InjectConnection } from '@nestjs/typeorm'
import { Repository, Connection } from 'typeorm'

import { Album } from './entities/album.entity'
import { Musician } from '../musicians/entities/musician.entity'
import { UsersService } from '../users/users.service'

import { FindallAlbumDto } from './dto/findall-album.dto'
import { CreateAlbumDto } from './dto/create-album.dto'
import { UpdateAlbumDto } from './dto/update-album.dto'

import { getPaginationOption, getPaginationResponse } from '../utils/pagination'

import type { FindManyOptions } from 'typeorm'

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectConnection()
    private readonly connection: Connection,
    private readonly usersService: UsersService,
  ) {}

  async findAll({ page, pageSize, removed }: FindallAlbumDto) {
    const where: FindManyOptions<Album>['where'] = {}

    if (typeof removed !== 'undefined') {
      where['isRemoved'] = removed
    }

    const { skip, take } = getPaginationOption(page, pageSize)

    const [albums, totalCount] = await this.albumRepository.findAndCount({
      skip,
      take: take + 1,
      where,
    })

    return getPaginationResponse({
      data: albums,
      currentPage: page ?? 1,
      currentEntitiesLength: albums.length,
      totalCount,
      pageSize: take,
    })
  }

  async findOne(id: number) {
    // return this.connection
    //   .getRepository(Album)
    //   .createQueryBuilder('album')
    //   .where({ id })
    //   .leftJoinAndSelect('album.musician', 'album_musician')
    //   .leftJoin('album_musician.albums', 'musician_albums')
    //   .addSelect(['musician_albums.title', 'musician_albums.id'])
    //   .getOne()

    return this.albumRepository.findOne(id, {
      relations: ['musician'],
    })
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

  async update(id: number, body: UpdateAlbumDto) {
    const updatedAlbum = await this.albumRepository.preload({
      id,
      ...body,
    })

    if (!updatedAlbum) {
      throw new NotFoundException()
    }

    return this.albumRepository.save(updatedAlbum)
  }
}
