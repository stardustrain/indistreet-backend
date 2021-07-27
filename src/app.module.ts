import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'

import { AlbumsModule } from './albums/albums.module'
import { MusiciansModule } from './musicians/musicians.module'
import { PersonsModule } from './persons/persons.module'
import { GenresModule } from './genres/genres.module';
import { SongsModule } from './songs/songs.module';
import { ProductsModule } from './products/products.module';

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
    GenresModule,
    SongsModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
