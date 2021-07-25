import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'

import { Musician } from '../../musicians/entities/musician.entity'

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany(() => Musician)
  misicians: Musician[]
}
