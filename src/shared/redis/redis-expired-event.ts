import Redis from 'ioredis';
import { RedisService } from './redis.service';

const subscriber = new Redis({
  host: process.env.REDIS_HOST,
  port: +process.env.REDIS_PORT,
});

export default function RedisExpiredEvents() {
  subscriber.subscribe('__keyevent@0__:expired');
  subscriber.on('message', async (channel, message) => {
    // Handle event
    const [type, key] = message.split(':');
    const redisService = new RedisService();
    switch (type) {
      case 'schedule-meeting': {
        const value = await redisService.get(key);
        console.log('value: ', value);
        break;
      }
    }
  });
}
