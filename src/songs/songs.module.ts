import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Song } from './entities/song.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Song])],
})
export class SongsModule {}
