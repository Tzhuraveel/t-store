import { Inject, Injectable } from '@nestjs/common';

import { UserEntity } from '#infra/database/entities/user.entity';

import { USER_REPOSITORY } from '../model/constants/user.constants';
import { CreateUserRequestDto } from '../model/dtos/request/create-user-request.dto';
import { UserServiceInterface } from '../model/interfaces/user-service.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async create(user: CreateUserRequestDto): Promise<UserEntity> {
    return await this.userRepository.createAndSave(user);
  }
}
