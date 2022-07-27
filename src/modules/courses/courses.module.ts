import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { AdminModule } from '../admin/admin.module';
import { TutorsModule } from '../tutors/tutors.module';
import { CategoriesModule } from '../categories/categories.module';
import { UsersCourses } from './entities/users-courses.entity';
import { StudentsModule } from '../students/students.module';
import { PaginationModule } from '../../shared/pagination/pagination.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, UsersCourses]),
    AdminModule,
    TutorsModule,
    CategoriesModule,
    StudentsModule,
    PaginationModule,
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
