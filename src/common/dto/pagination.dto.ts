import { IsInt, IsPositive, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'

export class PaginationDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  page?: number

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  pageSize?: number
}
