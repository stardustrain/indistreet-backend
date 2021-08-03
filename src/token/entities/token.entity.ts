import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm'
import { User } from '../../users/entities/user.entity'

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  token: string

  @OneToOne(() => User, (user) => user.token)
  user: User
}
