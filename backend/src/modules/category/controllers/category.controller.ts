import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto';
import { CategoryEntity } from '../entities/category.entity';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/modules/auth/guards';

@ApiTags('category')
@Controller('category')
@UseGuards(JwtGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('all')
  findAllCategories() {
    return this.categoryService.findAllCategories();
  }

  @Post('create')
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Patch(':id')
  updateCategory(
    @Body() updateCategory: UpdateCategoryDto,
    @Param('id') id: string,
  ): Promise<CategoryEntity> {
    return this.categoryService.updateCategory(id, updateCategory);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
