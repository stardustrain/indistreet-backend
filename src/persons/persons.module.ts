import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PersonsService } from './persons.service'
import { PersonsController } from './persons.controller'
import { Person } from './entities/person.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  providers: [PersonsService],
  controllers: [PersonsController],
})
export class PersonsModule {}
