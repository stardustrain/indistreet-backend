import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

import { Album } from '../../albums/entities/album.entity'
import { Musician } from '../../musicians/entities/musician.entity'

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToOne(() => Album, (album) => album.songs, {
    onDelete: 'CASCADE',
  })
  album: Album

  @Column()
  melonLink: string

  @Column()
  bugsLink: string

  @Column()
  youtubeMusicLink: string

  @Column()
  spotifyLink: string

  @Column()
  vibeLink: string

  @ManyToOne(() => Musician, (musician) => musician.songs)
  musician: Musician

  @Column()
  isRemoved: boolean
}
