import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm'

import { Token } from '../../token/entities/token.entity'

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MUSICIAN = 'musician',
}

export enum UserLanguage {
  EN = 'en',
  KO = 'ko',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true,
  })
  username: string

  @Column()
  password: string

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole

  @Column({
    type: 'enum',
    enum: UserLanguage,
    nullable: true,
  })
  language: UserLanguage

  @Column({
    nullable: true,
  })
  birthday: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToOne(() => Token, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  token: Token
}
