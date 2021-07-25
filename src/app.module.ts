import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'

import { AlbumsModule } from './albums/albums.module'
import { MusiciansModule } from './musicians/musicians.module'
import { PersonsModule } from './persons/persons.module'

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
      autoLoadEntities: true,
      logging: ['query'],
    }),
    AlbumsModule,
    MusiciansModule,
    PersonsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
