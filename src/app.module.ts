import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port:
        typeof process.env.PORT === 'string'
          ? parseInt(process.env.PORT)
          : process.env.PORT,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: 'indistreet',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
