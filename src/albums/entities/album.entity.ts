import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm'

import { Musician } from '../../musicians/entities/musician.entity'
import { Song } from '../../songs/entities/song.entity'

export enum AlbumTypeEnum {
  SINGLE = 'single',
  EP = 'ep',
  MINI_ALBUM = 'miniAlbum',
  FULL_ALBUM = 'fullAlbum',
  OST = 'ost',
  UNKNOWN = 'unknown',
}

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: true,
  })
  title: string

  @Column({
    type: 'enum',
    enum: AlbumTypeEnum,
    default: AlbumTypeEnum.UNKNOWN,
  })
  albumType: AlbumTypeEnum

  @ManyToOne(() => Musician, (musician) => musician.albums)
  musician: Musician

  @Column()
  buyLink: string

  @Column()
  melonLink: string

  @Column()
  vibeLink: string

  @Column()
  bugsLink: string

  @Column()
  spotifyLink: string

  @Column()
  youtubeMusicLink: string

  @Column()
  appleMusicLink: string

  @Column()
  description: string

  @Column()
  isRemoved: boolean

  @Column('date')
  releaseDate: Date

  @OneToMany(() => Song, (song) => song.album, {
    cascade: true,
  })
  songs: Song[]
}
