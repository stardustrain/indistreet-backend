import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'

import { AlbumsModule } from './albums/albums.module'
import { MusiciansModule } from './musicians/musicians.module'
import { PersonsModule } from './persons/persons.module'
import { GenresModule } from './genres/genres.module'
import { SongsModule } from './songs/songs.module'
import { ProductsModule } from './products/products.module'
import { UsersModule } from './users/users.module'
import { CaslModule } from './casl/casl.module'
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
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
    UsersModule,
    CaslModule,
    TokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
