export default {
  HOST: process.env.HOST,
  PORT:
    typeof process.env.PORT === 'string'
      ? parseInt(process.env.PORT)
      : process.env.PORT,
  USERNAME: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET ?? 'secretForLocal',
}
