import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

export const createNestServer = async () => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  });
  await app.init();
  return server;
};

// Jangan listen jika di Vercel
if (!process.env.VERCEL) {
  createNestServer().then((app) => {
    app.listen(3000, () => {
      console.log(`Running on http://localhost:3000`);
    });
  });
}
