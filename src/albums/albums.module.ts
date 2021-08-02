import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AlbumsService } from './albums.service'
import { AlbumsController } from './albums.controller'
import { Album } from './entities/album.entity'
import { CaslModule } from '../casl/casl.module'

@Module({
  imports: [TypeOrmModule.forFeature([Album]), CaslModule],
  providers: [AlbumsService],
  controllers: [AlbumsController],
})
export class AlbumsModule {}
