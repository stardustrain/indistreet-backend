import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MusiciansService } from './musicians.service'
import { MusiciansController } from './musicians.controller'
import { Musician } from './entities/musician.entity'
import { CaslModule } from '../casl/casl.module'

@Module({
  imports: [TypeOrmModule.forFeature([Musician]), CaslModule],
  providers: [MusiciansService],
  controllers: [MusiciansController],
})
export class MusiciansModule {}
