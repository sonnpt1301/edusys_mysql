import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth-guard';
import { CategoriesModule } from './modules/categories/categories.module';
import { CoursesModule } from './modules/courses/courses.module';
import { StudentsModule } from './modules/students/students.module';
import { TutorsModule } from './modules/tutors/tutors.module';
import { PaginationModule } from './shared/pagination/pagination.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    StudentsModule,
    AuthModule,
    PaginationModule,
    AdminModule,
    CategoriesModule,
    CoursesModule,
    TutorsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
