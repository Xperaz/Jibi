import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  createUser(user: Partial<UserEntity>): UserEntity {
    return this.userRepository.create(user);
  }

  async saveUser(user: Partial<UserEntity>): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }
}
