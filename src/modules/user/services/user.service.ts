import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { UserEntity } from '#infra/database/entities/user.entity';

import { USER_REPOSITORY } from '../models/constants/user.constants';
import { UserServiceInterface } from '../models/interfaces/user-service.interface';
import { CreateUserInput } from '../models/types/create-user-input.type';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async create(data: CreateUserInput): Promise<UserEntity> {
    return await this.userRepository.createAndSave(data);
  }

  async profile(userId: number): Promise<UserEntity> {
    return await this.userRepository.findOneById(userId);
  }

  async ensureEmailIsUnique(email: string): Promise<void> {
    const isUserExist = await this.userRepository.existsBy({
      email,
    });

    if (isUserExist) {
      throw new ConflictException('Email already exists');
    }
  }
}
