import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Role } from '../../shared/constants/common.constant';
import { Roles } from '../../shared/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';
import { RolesGuard } from '../auth/guards/role-guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/category.req.dto';

@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('create-category')
  async createCategory(@Body() body: CreateCategoryDto) {
    return this.categoriesService.createCategory(body);
  }
}
