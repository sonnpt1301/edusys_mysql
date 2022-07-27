import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationService } from '../../shared/pagination/pagination.service';
import { getRandomString } from '../../utils/random-string';
import { AdminService } from '../admin/admin.service';
import { CategoriesService } from '../categories/categories.service';
import { StudentsService } from '../students/students.service';
import { TutorsService } from '../tutors/tutors.service';
import {
  CreateCourseDto,
  GetListCourseQuery,
  JoinCourseDto,
  UpdateCourseStatusQuery,
  UpdateJoinCourseDto,
} from './dto/courses.req.dto';
import { Course } from './entities/course.entity';
import { UsersCourses } from './entities/users-courses.entity';
import { JoinCourseStatus, Status } from './enum/courses.enum';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private coursesRepo: Repository<Course>,
    @InjectRepository(UsersCourses)
    private usersCoursesRepo: Repository<UsersCourses>,
    private adminService: AdminService,
    private tutorsService: TutorsService,
    private categoriesService: CategoriesService,
    private studentService: StudentsService,
    private readonly paginationService: PaginationService,
  ) {}
  async findOne(courseId: number): Promise<Course> {
    const course = await this.coursesRepo.findOne(courseId);
    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    return course;
  }

  async getListCourses(query: GetListCourseQuery) {
    const { status, createdBy, categoryId, reason } = query;

    const course = this.coursesRepo
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.category', 'category')
      .leftJoinAndSelect('course.createdBy', 'createdBy');
    if (status) {
      course.andWhere('course.status = :status', { status });
    }
    if (createdBy) {
      course.andWhere('course.createdBy = :createdBy', { createdBy });
    }
    if (categoryId) {
      course.andWhere('course.categoryId = :categoryId', {
        categoryId,
      });
    }
    if (reason) {
      course.andWhere('course.reason = :reason', {
        reason,
      });
    }

    const { data, pagination } = await this.paginationService.commonPagination(
      query,
      course,
    );
    if (data.length) {
      const gettingTotalStudents = data.map(async (course) => {
        const studentsList = await this.usersCoursesRepo
          .createQueryBuilder('users_courses')
          .innerJoinAndSelect('users_courses.student', 'student')
          .where('courseId =:courseId', { courseId: course.id })
          .andWhere('status = :status', { status: JoinCourseStatus.ACCEPTED })
          .orderBy('student.firstName', 'ASC')
          .getMany();

        return {
          ...course,
          pagination,
          studentsList: studentsList.map((e) => e.student),
        };
      });
      return Promise.all(gettingTotalStudents);
    }

    return this.paginationService.commonPagination(query, course);
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

  async requestJoinCourse(courseId: number, body: JoinCourseDto) {
    const { secretKey } = body;
    const [course, student] = await Promise.all([
      this.findOne(courseId),
      this.studentService.getStudentInfo(),
    ]);
    const isJoined = await this.usersCoursesRepo.findOne({
      where: {
        student: student.id,
        course: course.id,
      },
    });
    if (secretKey !== course.secretKey) {
      throw new HttpException(`Wrong secret key`, HttpStatus.BAD_REQUEST);
    }
    if (isJoined) {
      throw new HttpException('Already joined', HttpStatus.BAD_REQUEST);
    }

    await this.usersCoursesRepo.save({
      student,
      course,
      status: JoinCourseStatus.PENDING,
    });
  }

  async updateJoinCourseStatus(courseId: number, body: UpdateJoinCourseDto) {
    const { status, studentIds } = body;

    const updatingStatus = studentIds.map(async (studentId) => {
      const userCourse = await this.usersCoursesRepo.findOne({
        where: {
          course: courseId,
          student: studentId,
          status: JoinCourseStatus.PENDING,
        },
      });
      if (userCourse) {
        userCourse.status = status;
        await this.usersCoursesRepo
          .createQueryBuilder()
          .update(userCourse)
          .execute();
      }
    });
    await Promise.all(updatingStatus);

    return 'success';
  }
}
