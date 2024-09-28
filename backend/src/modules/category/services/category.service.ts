import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAllCategories(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: {
        name: createCategoryDto.name,
      },
    });

    if (category) {
      throw new ConflictException(
        `Category with name '${createCategoryDto.name}' already exists in this category type`,
      );
    }

    const newCategory = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(newCategory);
  }

  async updateCategory(
    id: string,
    updateCategory: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    const newCategory = { ...category, ...updateCategory };

    return await this.categoryRepository.save(newCategory);
  }

  async deleteCategory(id: string) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return await this.categoryRepository.delete(id);
  }
}
