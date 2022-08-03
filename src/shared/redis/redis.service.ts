import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  redis: Redis;
  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
    });
    this.redis.on('ready', () => {
      this.redis.config('SET', 'notify-keyspace-events', 'Ex');
    });
  }

  get(key: string): Promise<string> {
    return this.redis.get(key);
  }

  set(type: string, key: string, value: string, expire: number) {
    this.redis
      .multi()
      .set(key, value)
      .set(`${type}:${key}`, 1)
      .expire(`${type}:${key}`, expire)
      .exec();
  }
}
