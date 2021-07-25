import { IsBoolean, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'

import { PaginationDto } from '../../common/dto/pagination.dto'

export class FindallAlbumDto extends PaginationDto {
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  removed?: boolean
}
