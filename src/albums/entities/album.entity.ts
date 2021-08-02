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

  @Column()
  title: string

  @Column({
    type: 'enum',
    enum: AlbumTypeEnum,
    default: AlbumTypeEnum.UNKNOWN,
  })
  albumType: AlbumTypeEnum

  @ManyToOne(() => Musician, (musician) => musician.albums)
  musician: Musician

  @Column({
    nullable: true,
  })
  buyLink: string

  @Column({
    nullable: true,
  })
  melonLink: string

  @Column({
    nullable: true,
  })
  vibeLink: string

  @Column({
    nullable: true,
  })
  bugsLink: string

  @Column({
    nullable: true,
  })
  spotifyLink: string

  @Column({
    nullable: true,
  })
  youtubeMusicLink: string

  @Column({
    nullable: true,
  })
  appleMusicLink: string

  @Column({
    nullable: true,
  })
  description: string

  @Column({
    default: false,
  })
  isRemoved: boolean

  @Column('date', {
    nullable: true,
  })
  releaseDate: Date

  @OneToMany(() => Song, (song) => song.album, {
    cascade: true,
  })
  songs: Song[]
}
