import { UserEntity } from '#infra/database/entities/user.entity';

export interface UserRepositoryInterface {
  createAndSave(user: UserEntity): Promise<UserEntity>;
}
