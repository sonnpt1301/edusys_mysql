import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth-guard';
import { CategoriesModule } from './modules/categories/categories.module';
import { StudentsModule } from './modules/students/students.module';
import { PaginationModule } from './shared/pagination/pagination.module';
import { FlcModule } from './modules/flc/flc.module';

@Module({
  imports: [
    StudentsModule,
    AuthModule,
    TypeOrmModule.forRoot(),
    PaginationModule,
    AdminModule,
    CategoriesModule,
    FlcModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
