import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../modules/auth/auth.module';
import { StudentsModule } from '../modules/students/students.module';
import { PaginationModule } from '../shared/pagination/pagination.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    StudentsModule,
    AuthModule,
    TypeOrmModule.forRoot(),
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
