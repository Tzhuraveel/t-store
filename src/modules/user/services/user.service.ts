import { Inject, Injectable } from '@nestjs/common';

import { UserEntity } from '#infra/database/entities/user.entity';

import { USER_REPOSITORY } from '../model/constants/user.constants';
import { UserRepositoryInterface } from '../model/interfaces/user-repository.interface';
import { UserServiceInterface } from '../model/interfaces/user-service.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async create(user: any): Promise<UserEntity> {
    return await this.userRepository.createAndSave(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
}
