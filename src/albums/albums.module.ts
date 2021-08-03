import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AlbumsService } from './albums.service'
import { AlbumsController } from './albums.controller'
import { Album } from './entities/album.entity'
import { CaslModule } from '../casl/casl.module'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([Album]), CaslModule, UsersModule],
  providers: [AlbumsService],
  controllers: [AlbumsController],
})
export class AlbumsModule {}
