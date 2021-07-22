import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number

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
