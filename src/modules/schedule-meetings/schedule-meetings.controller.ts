import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  CreateScheduleMeetingDto,
  GetSchedulesQuery,
} from './dto/schedule-meetings.req.dto';
import { ScheduleMeetingsService } from './schedule-meetings.service';

@Controller('schedule-meetings')
export class ScheduleMeetingsController {
  constructor(
    private readonly scheduleMeetingsService: ScheduleMeetingsService,
  ) {}

  @Get('schedules')
  async getSchedules(@Query() query: GetSchedulesQuery) {
    return this.scheduleMeetingsService.getSchedules(query);
  }

  @Post(':courseId/create-schedule-meeting')
  async createScheduleMeeting(
    @Param('courseId') courseId: number,
    @Body() body: CreateScheduleMeetingDto,
  ) {
    return this.scheduleMeetingsService.createScheduleMeeting(courseId, body);
  }
}
