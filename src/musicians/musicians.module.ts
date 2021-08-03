import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MusiciansService } from './musicians.service'
import { MusiciansController } from './musicians.controller'
import { Musician } from './entities/musician.entity'
import { CaslModule } from '../casl/casl.module'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([Musician]), CaslModule, UsersModule],
  exports: [MusiciansService],
  providers: [MusiciansService],
  controllers: [MusiciansController],
})
export class MusiciansModule {}
