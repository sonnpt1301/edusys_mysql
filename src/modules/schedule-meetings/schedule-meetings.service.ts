import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import ical, { ICalAlarmData } from 'ical-generator';
import * as moment from 'moment';
import { Brackets, Repository } from 'typeorm';
import { PaginationService } from '../../shared/pagination/pagination.service';
import { RedisService } from '../../shared/redis/redis.service';
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
    private readonly redisService: RedisService,
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
    const schedule = await this.scheduleMeetingRepo.save({
      accounts,
      addressLink: body.addressLink,
      location: body.location,
      scheduleAt: body.scheduleAt,
    });
    const then = moment
      .utc(schedule.scheduleAt)
      .subtract(5, 'minutes')
      .format('YYYY-MM-DD HH:mm:ss');
    const now = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    const expired = moment(then).diff(moment(now), 'seconds');
    console.log(now, then);
    console.log(expired);

    this.redisService.set(
      'schedule-meeting',
      `scheduleId_${schedule.id}`,
      `${JSON.stringify(schedule)}`,
      3,
    );
  }

  async downloadCalendarFile() {
    const cal = ical({
      prodId: '//superman-industries.com//ical-generator//EN',
      events: [
        {
          start: moment().add('3', 'day'),
          end: moment().add(3, 'day').add(1, 'hours'),
          location: 'Google Meet',
          summary: 'Example Event',
          description: 'It works ;)',
          url: 'https://example.com',
          alarms: <ICalAlarmData[]>[
            {
              type: 'audio',
              triggerBefore: 2,
            },
          ],
        },
      ],
    });

    return cal;
  }
}
