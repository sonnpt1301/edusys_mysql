import './env';
import './listener';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { appConfig } from './configs/configs.constants';
import { HttpExceptionFilter } from './shared/filter/http-exception.filter';
import { SwaggerInitialize } from './shared/swaggers/document';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';
import { AppModule } from './app.module';
import RedisExpiredEvents from './shared/redis/redis-expired-event';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerInitialize(app);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, forbidNonWhitelisted: true }),
  );
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.enableCors();
  RedisExpiredEvents();
  const { port } = appConfig;
  await app.listen(port || 3000, () => {
    console.log(`Server is running on ${port}`);
  });
}
bootstrap();
