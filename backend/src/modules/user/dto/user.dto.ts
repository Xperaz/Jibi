import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserResponseDto {
  id: string;
  email: string;
  fullName: string;
  created_at: Date;
}

export class UpdateUserDto {
  @ApiProperty({
    required: false,
    example: 'John Doe',
    description: 'The full name of the user',
  })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({
    required: false,
    example: 'example@gmail.com',
    description: 'The email address of the user',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    required: false,
    example: 'password',
    description: 'The password of the user',
  })
  @IsOptional()
  @IsString()
  password?: string;
}
