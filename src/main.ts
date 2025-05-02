import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

export const createNestServer = async (expressInstance = server) => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));
  app.enableCors();
  await app.init();
  return expressInstance;
};

if (!process.env.VERCEL) {
  createNestServer().then((app) =>
    app.listen(3000, () => {
      console.log(`NestJS app running on http://localhost:3000`);
    }),
  );
}
