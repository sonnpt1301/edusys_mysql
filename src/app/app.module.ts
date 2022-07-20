import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationModule } from '../shared/pagination/pagination.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot(), PaginationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
