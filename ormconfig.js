const parsedConfig = require('dotenv').config({
  path: '.env',
}).parsed

module.exports = {
  type: 'postgres',
  host: parsedConfig.HOST,
  port: parsedConfig.PORT,
  username: parsedConfig.USERNAME,
  password: parsedConfig.PASSWORD,
  database: 'indistreet',
  entities: ['src/**/entities/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
}
