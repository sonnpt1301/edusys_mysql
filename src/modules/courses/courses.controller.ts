import { Body, Controller, Param, Patch, Post, Query } from '@nestjs/common';
import { Role } from '../../shared/constants/common.constant';
import { Auth } from '../../shared/decorators/auth.decorator';
import { CoursesService } from './courses.service';
import {
  CreateCourseDto,
  JoinCourseDto,
  UpdateCourseStatusQuery,
} from './dto/courses.req.dto';

@Auth()
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Auth(Role.TUTORS)
  @Post(':categoryId/create-course')
  async createCourse(
    @Param('categoryId') categoryId: number,
    @Body() body: CreateCourseDto,
  ) {
    return this.coursesService.createCourse(categoryId, body);
  }

  @Auth(Role.ADMIN)
  @Patch('update-course-status/:courseId')
  async updateCourseStatus(
    @Param('courseId') courseId: number,
    @Query() query: UpdateCourseStatusQuery,
  ) {
    return this.coursesService.updateCourseStatus(courseId, query);
  }

  @Auth(Role.STUDENT)
  @Post('request-join-course/:courseId')
  async requestJoinCourse(
    @Param('courseId') courseId: number,
    @Body() body: JoinCourseDto,
  ) {
    return this.coursesService.requestJoinCourse(courseId, body);
  }
}
