import { PaginationModule } from './../../shared/pagination/pagination.module';
import { ScheduleMeeting } from './entities/schedule-meeting.entity';
import { Module } from '@nestjs/common';
import { ScheduleMeetingsService } from './schedule-meetings.service';
import { ScheduleMeetingsController } from './schedule-meetings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from '../courses/courses.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScheduleMeeting]),
    CoursesModule,
    AuthModule,
    PaginationModule,
  ],
  controllers: [ScheduleMeetingsController],
  providers: [ScheduleMeetingsService],
})
export class ScheduleMeetingsModule {}
