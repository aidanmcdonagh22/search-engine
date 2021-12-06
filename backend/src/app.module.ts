import { Module, CacheModule } from '@nestjs/common';
import { TypegooseModule } from "nestjs-typegoose";
import { Garment } from './models/garment.model';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    // Connect to MongoDB
    TypegooseModule.forRoot(
      'mongodb://' +
      `${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}` +
      `@${process.env.MONGO_HOST}:${process.env.MONGO_PORT || 27017}` +
      `/${process.env.MONGO_DB_NAME}?authSource=admin`
    ),
    // Create Schema for Garments
    TypegooseModule.forFeature([Garment]),
    // RedisCacheModule
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST || "cache",
      port: +process.env.REDIS_PORT || 6379,
      ttl: 86400, // time til expiration of data - 1 day
      max: 1000 // max data pairs - 1000
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
