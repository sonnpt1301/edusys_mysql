import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminService } from '../admin/admin.service';
import { CreateCategoryDto } from './dto/category.req.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoriesRepo: Repository<Category>,
    private adminService: AdminService,
  ) {}

  async fineOne(id: number) {
    const category = await this.categoriesRepo.findOne(id);
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return category;
  }

  async createCategory(body: CreateCategoryDto) {
    const { name } = body;
    const categoryExist = await this.categoriesRepo
      .createQueryBuilder('cat')
      .where('name = :name', { name })
      .getOne();
    if (categoryExist) {
      throw new HttpException(
        'Category already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdBy = await this.adminService.getAdminInfo();
    return this.categoriesRepo.save({ name, createdBy });
  }
}
