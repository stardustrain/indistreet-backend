import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

import { Musician } from '../../musicians/entities/musician.entity'

export enum ProductTypeEnum {
  GOODS = 'goods',
  ALBUM = 'album',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: ProductTypeEnum,
  })
  productType: ProductTypeEnum

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  purchaseLink: string

  @Column()
  price: number

  @Column()
  isRemoved: boolean

  @Column()
  isSoldOut: boolean

  @ManyToOne(() => Musician, (musician) => musician.products)
  musician: Musician
}
