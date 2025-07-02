import { UserEntity } from '#infra/database/entities/user.entity';

export interface UserRepositoryInterface {
  createAndSave(user: Partial<UserEntity>): Promise<UserEntity>;
  findOneById(id: number): Promise<UserEntity | null>;
}
