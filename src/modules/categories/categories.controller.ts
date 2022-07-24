import { Body, Controller, Post } from '@nestjs/common';
import { Role } from '../../shared/constants/common.constant';
import { Auth } from '../../shared/decorators/auth.decorator';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/category.req.dto';

@Auth(Role.ADMIN)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('create-category')
  async createCategory(@Body() body: CreateCategoryDto) {
    return this.categoriesService.createCategory(body);
  }
}
