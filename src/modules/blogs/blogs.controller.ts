import { CreateBlogDto, UpdateBlogDto } from './dto/blogs.req.dto';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Role } from '../../shared/constants/common.constant';
import { Auth } from '../../shared/decorators/auth.decorator';

@Auth(Role.STUDENT)
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get('get-list-blogs')
  async getListBlogs() {
    return this.blogsService.getListBlogs();
  }

  @Post('create-blog')
  async createBlog(@Body() body: CreateBlogDto) {
    return this.blogsService.createBlog(body);
  }

  @Patch('update-blog/:blogId')
  async updateBlog(
    @Param('blogId') blogId: number,
    @Body() body: UpdateBlogDto,
  ) {
    return this.blogsService.updateBlog(blogId, body);
  }
}
