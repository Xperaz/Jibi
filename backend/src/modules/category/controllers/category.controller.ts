import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../dto';
import { CategoryEntity } from '../entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('all')
  findAllCategories() {
    return 'all categories';
  }

  @Post('create')
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.categoryService.createCategory(createCategoryDto);
  }
}
