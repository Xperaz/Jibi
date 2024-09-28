import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

class AuthDto {
  @ApiProperty({
    required: true,
    example: 'example@gmail.com',
    description: 'The email address of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    example: 'password',
    description: 'The password of the user',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignUpDto extends AuthDto {
  @ApiProperty({
    required: false,
    example: 'John Doe',
    description: 'The full name of the user',
  })
  @IsOptional()
  fullName?: string;
}

export class SignInDto extends AuthDto {}
