import {
  IsString,
  IsBoolean,
  IsOptional,
  ValidateNested,
  IsArray,
} from 'class-validator'
import { Type } from 'class-transformer'

import { CreateAlbumDto } from '../../albums/dto/create-album.dto'

export class CreateMusicianDto {
  @Type(() => String)
  @IsString()
  name: string

  @Type(() => String)
  @IsOptional()
  nameEn: string

  @Type(() => String)
  @IsOptional()
  nameJp: string

  @Type(() => String)
  @IsOptional()
  bio: string

  @Type(() => Boolean)
  @IsBoolean()
  isSolo: boolean

  // @Type(() => Person)
  // @IsOptional()
  // @IsArray()
  // members: Person[]

  @Type(() => CreateAlbumDto)
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  albums: CreateAlbumDto[]

  // @ManyToMany(() => Genre, {
  //   cascade: true,
  // })
  // @IsOptional()
  // genres: Genre[]

  @Type(() => String)
  @IsOptional()
  instagramLink: string

  @Type(() => String)
  @IsOptional()
  twitterLink: string

  @Type(() => String)
  @IsOptional()
  spotifyLink: string

  @Type(() => String)
  @IsOptional()
  appleMusicLink: string

  @Type(() => String)
  @IsOptional()
  melonLink: string

  @Type(() => String)
  @IsOptional()
  soundcloudLink: string

  @Type(() => String)
  @IsOptional()
  facebookLink: string

  @Type(() => String)
  @IsOptional()
  bandcampLink: string

  @Type(() => String)
  @IsOptional()
  youtubeChannelLink: string

  // @OneToMany(() => Song, (song) => song.musician, {
  //   cascade: true,
  // })
  // @IsOptional()
  // songs: Song[]

  @Type(() => Boolean)
  @IsOptional()
  isRemoved: boolean

  // @OneToMany(() => Product, (product) => product.musician, {
  //   cascade: true,
  // })
  // @IsOptional()
  // products: Product[]
}
