import { createConnection } from 'typeorm'
import { config } from 'dotenv'

import { Album } from '../src/albums/entities/album.entity'
import dummy from './fixtures/albums'

const parsedConfig = config({
  path: '.env',
}).parsed

const insertAlbums = async () => {
  const connection = await createConnection({
    type: 'postgres',
    host: parsedConfig?.HOST,
    port:
      typeof parsedConfig?.PORT === 'string'
        ? parseInt(parsedConfig?.PORT)
        : parsedConfig?.PORT,
    username: parsedConfig?.USERNAME,
    password: parsedConfig?.PASSWORD,
    database: 'indistreet',
    entities: [Album],
  })

  try {
    const albums = dummy.map((album) => {
      const newAlbum = new Album()
      Object.entries(album).forEach(([key, value]) => {
        // @ts-ignore
        newAlbum[key] = value
      })
      return newAlbum
    })

    await connection.getRepository(Album).save(albums)
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    connection.close()
  }
}

export default insertAlbums
