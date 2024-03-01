import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

import { Config, RedisConfig } from '../../configs/config.type';
import { REDIS_PROVIDER } from './redis.constants';
import { RedisService } from './redis.service';

const redisProvider = {
  provide: REDIS_PROVIDER,
  useFactory: (config: ConfigService<Config>): Redis => {
    const redisConfig = config.get<RedisConfig>('redis');
    return new Redis({
      host: redisConfig.host,
      port: redisConfig.port,
      password: redisConfig.password,
    });
  },
  inject: [ConfigService],
};

@Module({
  imports: [],
  controllers: [],
  providers: [redisProvider, RedisService],
  exports: [],
})
export class RedisModule {}
