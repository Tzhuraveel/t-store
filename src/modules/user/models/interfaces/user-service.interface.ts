import { UserEntity } from '#infra/database/entities/user.entity';

import { CreateUserInput } from '../types/create-user-input.type';

export interface UserServiceInterface {
  create(user: CreateUserInput): Promise<UserEntity>;
  ensureEmailIsUnique(email: string): Promise<void>;
}
