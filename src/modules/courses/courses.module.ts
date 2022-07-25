import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { AdminModule } from '../admin/admin.module';
import { TutorsModule } from '../tutors/tutors.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), AdminModule, TutorsModule],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
