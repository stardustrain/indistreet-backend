import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm'

import { Album } from '../../albums/entities/album.entity'
import { Person } from '../../persons/entities/person.entity'
import { Genre } from '../../genres/entities/genre.entity'
import { Song } from '../../songs/entities/song.entity'
import { Product } from '../../products/entities/product.entity'

@Entity()
export class Musician {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({
    nullable: true,
  })
  nameEn: string

  @Column({
    nullable: true,
  })
  nameJp: string

  @Column({
    nullable: true,
  })
  bio: string

  @Column()
  isSolo: boolean

  @OneToMany(() => Person, (person) => person.musician, {
    cascade: true,
  })
  members: Person[]

  @OneToMany(() => Album, (album) => album.musician, {
    cascade: true,
  })
  albums: Album[]

  // lives

  @ManyToMany(() => Genre, {
    cascade: true,
  })
  @JoinTable()
  genres: Genre[]

  // videos

  @Column({
    nullable: true,
  })
  instagramLink: string

  @Column({
    nullable: true,
  })
  twitterLink: string

  @Column({
    nullable: true,
  })
  spotifyLink: string

  @Column({
    nullable: true,
  })
  appleMusicLink: string

  @Column({
    nullable: true,
  })
  melonLink: string

  @Column({
    nullable: true,
  })
  soundcloudLink: string

  @Column({
    nullable: true,
  })
  facebookLink: string

  @Column({
    nullable: true,
  })
  bandcampLink: string

  @Column({
    nullable: true,
  })
  youtubeChannelLink: string

  @OneToMany(() => Song, (song) => song.musician, {
    cascade: true,
  })
  songs: Song[]

  @Column({
    default: false,
  })
  isRemoved: boolean

  @OneToMany(() => Product, (product) => product.musician, {
    cascade: true,
  })
  products: Product[]

  // festival_item_time_tables:
}
