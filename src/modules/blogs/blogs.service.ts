import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoursesService } from '../courses/courses.service';
import { StudentsService } from '../students/students.service';
import { CreateBlogDto, UpdateBlogDto } from './dto/blogs.req.dto';
import { Blog } from './entities/blog.entity';
import { Status } from './enum/blogs.enum';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog) private blogsRepo: Repository<Blog>,
    private coursesService: CoursesService,
    private studentsService: StudentsService,
  ) {}

  async getListBlogs() {
    return this.blogsRepo.find({
      relations: ['createdBy', 'course'],
      order: { createdAt: -1 },
    });
  }

  async createBlog(body: CreateBlogDto) {
    const { courseId } = body;

    const [course, student] = await Promise.all([
      this.coursesService.findOne(courseId),
      this.studentsService.getStudentInfo(),
    ]);

    return this.blogsRepo.save({
      title: body.title,
      content: body.content,
      image: body.image,
      status: Status.PENDING,
      course: course,
      createdBy: student,
    });
  }

  async updateBlog(blogId: number, body: UpdateBlogDto) {
    return this.blogsRepo
      .createQueryBuilder()
      .where('id = :blogId', { blogId })
      .update(body)
      .execute();
  }
}
