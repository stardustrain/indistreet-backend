module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'indistreet',
  password: 'pass123',
  database: 'indistreet',
  entities: ['src/**/entities/*.ts'],
  migrations: ['src/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
}
