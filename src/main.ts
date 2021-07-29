import { NestFactory } from '@nestjs/core'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

import type { NestFastifyApplication } from '@nestjs/platform-fastify'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    }),
  )

  const config = new DocumentBuilder()
    .setTitle('Indistreet API')
    .setDescription('Indistreet API description')
    .setVersion('0.1.0')
    .addTag('Albums')
    .addTag('Genres')
    .addTag('Musicians')
    .addTag('Persons')
    .addTag('Products')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-document', app, document, {
    swaggerOptions: {},
  })

  await app.listen(3000)
}
bootstrap()
