import { IsInt, IsPositive, IsBoolean, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'

export class FindallAlbumDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  page?: number

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  removed?: boolean
}
