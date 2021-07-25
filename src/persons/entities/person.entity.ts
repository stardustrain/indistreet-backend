import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

import { Musician } from '../../musicians/entities/musician.entity'

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToOne(() => Musician, (musician) => musician.members)
  musician: Musician

  @Column()
  twitterLink: string

  @Column()
  instagramLink: string
}
