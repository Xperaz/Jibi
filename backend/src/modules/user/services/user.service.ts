import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from '../dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findUserByEmail(email: string) {
    const userInfo = await this.userRepository.findOne({ where: { email } });
    if (!userInfo) {
      return null;
    }
    delete userInfo.password;

    return userInfo;
  }

  async findUserById(id: string) {
    const userInfo = await this.userRepository.findOne({ where: { id } });

    if (!userInfo) {
      return null;
    }

    delete userInfo.password;

    return userInfo;
  }

  createUser(user: Partial<UserEntity>): UserEntity {
    return this.userRepository.create(user);
  }

  async saveUser(user: Partial<UserEntity>): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      return null;
    }

    if (updateUserDto.password) {
      updateUserDto.password = await argon.hash(updateUserDto.password);
    }

    const updateUser = await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });

    delete updateUser.password;

    return updateUser;
  }
}
