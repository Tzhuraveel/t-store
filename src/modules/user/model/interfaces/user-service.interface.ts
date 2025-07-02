import { UserEntity } from '#infra/database/entities/user.entity';

import { CreateUserRequestDto } from '../dtos/request/create-user-request.dto';

export interface UserServiceInterface {
  create(user: CreateUserRequestDto): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
}
