import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

import { Album } from '../../albums/entities/album.entity'

@Entity()
export class Musician {
  @PrimaryGeneratedColumn()
  id: number

  bio: string

  @Column()
  isSolo: boolean

  // members

  @OneToMany(() => Album, (album) => album.musician)
  albums: Album[]

  // lives

  // genres

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
