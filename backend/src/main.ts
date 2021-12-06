import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify" 
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import compression from 'fastify-compress';
import { readFileSync } from 'fs';
import { join } from "path";
import fastifyCORS from 'fastify-cors';
import fastifyHelmet from 'fastify-helmet';
// import fastifyCsrf from 'fastify-csrf';

declare const module: any;

const bootstrap = async () => {
  const fastifyOptions = process.env.NODE_ENV == "production" ? {
    http2: true,
    https: {
      allowHTTP1: true, // fallback support for HTTP1
      key: readFileSync(join(__dirname, '..', 'test.key')),
      cert: readFileSync(join(__dirname, '..', 'test.crt')),
    }
  } : { http2: false, https: false };
  const fastifyAdapter = new FastifyAdapter(fastifyOptions);
  const app: NestFastifyApplication = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter);

  // we set up our validation pipe and transfer JSON objects
  // into Data Transfer Objects once passing validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Helmet
  app.register(fastifyHelmet);

  // Compression
  app.register(compression, { encodings: ['gzip', 'deflate'] });

  // CORS
  app.register(fastifyCORS);

  // CSRF protection
  // app.register(fastifyCsrf);

  try {
    await app.listen(process.env.BACKEND_PORT || 8080, '0.0.0.0');
  } catch (error) {
    console.error(error);
    console.error(`Error: App failed to listen on PORT ${process.env.BACKEND_PORT || 8080}`);
  }
}

if (isNaN(parseInt(process.env.BACKEND_PORT))) {
  console.error('No port provided. 👏');
  process.exit(666);
}

bootstrap().then(() => {
  console.log(`Service listening on PORT ${process.env.BACKEND_PORT || 8080}`)
}).catch(error => { console.error(error); });
