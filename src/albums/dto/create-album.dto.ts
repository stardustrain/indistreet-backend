import { Type } from 'class-transformer'
import {
  IsString,
  IsEnum,
  IsOptional,
  IsNumber,
  IsPositive,
  IsUrl,
  IsDate,
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
  @IsUrl()
  buyLink?: string

  @Type(() => String)
  @IsOptional()
  @IsUrl()
  melonLink?: string

  @Type(() => String)
  @IsOptional()
  @IsUrl()
  vibeLink?: string

  @Type(() => String)
  @IsOptional()
  @IsUrl()
  bugsLink?: string

  @Type(() => String)
  @IsOptional()
  @IsUrl()
  spotifyLink?: string

  @Type(() => String)
  @IsOptional()
  @IsUrl()
  youtubeMusicLink?: string

  @Type(() => String)
  @IsOptional()
  @IsUrl()
  appleMusicLink?: string

  @Type(() => String)
  @IsOptional()
  description?: string

  @Type(() => Boolean)
  @IsOptional()
  @Default(false)
  isRemoved?: boolean

  @Type(() => Date)
  @IsOptional()
  @IsDate()
  releaseDate?: Date

  // @OneToMany(() => Song, (song) => song.album, {
  //   cascade: true,
  // })
  // songs: Song[]
}
