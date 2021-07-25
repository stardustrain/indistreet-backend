import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MusiciansService } from './musicians.service'
import { MusiciansController } from './musicians.controller'
import { Musician } from './entities/musician.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Musician])],
  providers: [MusiciansService],
  controllers: [MusiciansController],
})
export class MusiciansModule {}
