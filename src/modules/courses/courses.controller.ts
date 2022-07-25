import { Body, Controller, Param, Patch, Post, Query } from '@nestjs/common';
import { Role } from '../../shared/constants/common.constant';
import { Auth } from '../../shared/decorators/auth.decorator';
import { CoursesService } from './courses.service';
import {
  CreateCourseDto,
  UpdateCourseStatusQuery,
} from './dto/courses.req.dto';

@Auth()
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Auth(Role.TUTORS)
  @Post('create-course')
  async createCourse(@Body() body: CreateCourseDto) {
    return this.coursesService.createCourse(body);
  }

  @Auth(Role.ADMIN)
  @Patch('update-course-status/:courseId')
  async updateCourseStatus(
    @Param('courseId') courseId: number,
    @Query() query: UpdateCourseStatusQuery,
  ) {
    return this.coursesService.updateCourseStatus(courseId, query);
  }
}
