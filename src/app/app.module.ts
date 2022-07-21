import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from '../modules/accounts/accounts.module';
import { StudentsModule } from '../modules/students/students.module';
import { PaginationModule } from '../shared/pagination/pagination.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    StudentsModule,
    AccountsModule,
    TypeOrmModule.forRoot(),
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
