import { Type } from 'class-transformer'
import {
  IsString,
  IsEnum,
  IsOptional,
  IsNumber,
  IsPositive,
} from 'class-validator'
import { AlbumTypeEnum } from '../entities/album.entity'
import Default from '../../common/decorators/Default'

export class CreateAlbumDto {
  @Type(() => String)
  @IsString()
  title: string

  @Type(() => String)
  @IsEnum(AlbumTypeEnum)
  albumType: AlbumTypeEnum

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  musicianId: number

  @Type(() => String)
  @IsOptional()
  buyLink: string

  @Type(() => String)
  @IsOptional()
  melonLink: string

  @Type(() => String)
  @IsOptional()
  vibeLink: string

  @Type(() => String)
  @IsOptional()
  bugsLink: string

  @Type(() => String)
  @IsOptional()
  spotifyLink: string

  @Type(() => String)
  @IsOptional()
  youtubeMusicLink: string

  @Type(() => String)
  @IsOptional()
  appleMusicLink: string

  @Type(() => String)
  @IsOptional()
  description: string

  @Type(() => Boolean)
  @IsOptional()
  @Default(false)
  isRemoved: boolean

  @Type(() => Date)
  @IsOptional()
  releaseDate: Date

  // @OneToMany(() => Song, (song) => song.album, {
  //   cascade: true,
  // })
  // songs: Song[]
}
