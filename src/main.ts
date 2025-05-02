// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Aktifkan CORS untuk frontend
  app.enableCors({
    origin: 'http://localhost:5173',
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Sistem Manajemen Tugas Mahasiswa')
    .setDescription('API dokumentasi untuk login, register, dan tugas')
    .setVersion('1.0')
    .addBearerAuth() // untuk endpoint protected
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // http://localhost:3000/api

  await app.listen(3000);
}
bootstrap();
