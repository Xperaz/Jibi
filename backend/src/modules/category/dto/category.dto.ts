import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CategoryType } from '../entities/category.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Food',
    description: 'The name of the category',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '#FF0000',
    description: 'The color of the category',
  })
  @IsNotEmpty()
  @IsString()
  color: string;

  @ApiProperty({
    example: 'expense or income',
    description: 'The type of the category',
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(CategoryType)
  type: CategoryType;
}

export class UpdateCategoryDto {
  @ApiProperty({
    example: 'Food',
    description: 'The name of the category',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: '#FF0000',
    description: 'The color of the category',
  })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({
    example: 'expense or income',
    description: 'The type of the category',
  })
  @IsEnum(CategoryType)
  type?: CategoryType;
}
