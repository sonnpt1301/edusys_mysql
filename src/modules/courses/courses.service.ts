import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getRandomString } from '../../utils/random-string';
import { AdminService } from '../admin/admin.service';
import { CategoriesService } from '../categories/categories.service';
import { Status } from '../categories/enum/courses.enum';
import { TutorsService } from '../tutors/tutors.service';
import {
  CreateCourseDto,
  UpdateCourseStatusQuery,
} from './dto/courses.req.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private coursesRepo: Repository<Course>,
    private adminService: AdminService,
    private tutorsService: TutorsService,
    private categoriesService: CategoriesService,
  ) {}
  async findOne(courseId: number): Promise<Course> {
    const course = await this.coursesRepo.findOne(courseId);
    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    return course;
  }

  async createCourse(categoryId: number, body: CreateCourseDto) {
    const [createdBy, category] = await Promise.all([
      this.tutorsService.getTutorsInfo(),
      this.categoriesService.fineOne(categoryId),
    ]);

    return this.coursesRepo.save({
      ...body,
      category,
      status: Status.PENDING,
      secretKey: getRandomString(5),
      createdBy,
    });
  }

  async updateCourseStatus(courseId: number, query: UpdateCourseStatusQuery) {
    const { status } = query;
    await this.findOne(courseId);

    return this.coursesRepo
      .createQueryBuilder('course')
      .update({ status })
      .where('id = :courseId', { courseId })
      .execute();
  }
}
