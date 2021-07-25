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

@Entity()
export class Musician {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: true,
  })
  bio: string

  @Column()
  isSolo: boolean

  @OneToMany(() => Person, (person) => person.musician)
  members: Person[]

  @OneToMany(() => Album, (album) => album.musician)
  albums: Album[]

  // lives

  @ManyToMany(() => Genre)
  @JoinTable()
  genres: Genre[]

  // videos

  @Column()
  instagramLink: string

  @Column()
  twitterLink: string

  @Column()
  spotifyLink: string

  @Column()
  appleMusicLink: string

  @Column()
  melonLink: string

  @Column()
  soundcloudLink: string

  @Column()
  facebookLink: string

  @Column()
  bandcampLink: string

  @Column()
  youtubeChannelLink: string

  @Column()
  nameEn: string

  @Column()
  nameJp: string

  // songs:

  @Column()
  isRemoved: boolean

  // products:

  // festival_item_time_tables:
}
