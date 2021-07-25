import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

export enum AlbumTypeEnum {
  SINGLE = 'single',
  EP = 'ep',
  MINI_ALBUM = 'miniAlbum',
  FULL_ALBUM = 'fullAlbum',
  OST = 'ost'
}

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: AlbumTypeEnum,
    nullable: true
  })
  albumType: AlbumTypeEnum

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
}
