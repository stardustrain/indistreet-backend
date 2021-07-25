import { IsInt, IsPositive, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'

export class FindallMusicianDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  page?: number
}
