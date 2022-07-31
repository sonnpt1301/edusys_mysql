import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { PaginationService } from '../../shared/pagination/pagination.service';
import { AuthService } from '../auth/auth.service';
import { CoursesService } from '../courses/courses.service';
import {
  CreateScheduleMeetingDto,
  GetSchedulesQuery,
} from './dto/schedule-meetings.req.dto';
import { ScheduleMeeting } from './entities/schedule-meeting.entity';

@Injectable()
export class ScheduleMeetingsService {
  constructor(
    @InjectRepository(ScheduleMeeting)
    private scheduleMeetingRepo: Repository<ScheduleMeeting>,
    private readonly coursesService: CoursesService,
    private readonly authService: AuthService,
    private readonly paginationService: PaginationService,
  ) {}

  async getSchedules(query: GetSchedulesQuery) {
    try {
      const account = await this.authService.getAccountId();
      const schedules = this.scheduleMeetingRepo
        .createQueryBuilder('schedule')
        .leftJoinAndMapOne('account1', 'schedule.accounts', 'totalAccounts')
        .leftJoinAndSelect('schedule.accounts', 'accounts')
        .where(
          new Brackets((qb) => {
            qb.where('totalAccounts.id = :id', { id: account['accountId'] });
          }),
        )
        .andWhere('accounts.id <> :id', { id: account['accountId'] });

      return this.paginationService.commonPagination(query, schedules);
    } catch (error) {
      console.log(error);
    }
  }

  async createScheduleMeeting(
    courseId: number,
    body: CreateScheduleMeetingDto,
  ) {
    const [
      {
        createdBy: { account: tutorAccount },
      },
      studentAccounts,
    ] = await Promise.all([
      this.coursesService.findOne(courseId, {
        relations: ['createdBy', 'createdBy.account'],
      }),
      this.coursesService.getStudentAccountsByCourseId(courseId),
    ]);

    const accounts = [tutorAccount, ...studentAccounts];
    console.log(accounts);
    await this.scheduleMeetingRepo.save({
      accounts,
      addressLink: body.addressLink,
      location: body.location,
      scheduleAt: body.scheduleAt,
    });
  }
}
