import { UserEntity } from '#infra/database/entities/user.entity';

export interface UserRepositoryInterface {
  createAndSave(user: Partial<UserEntity>): Promise<UserEntity>;
  findOneById(id: number): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findForAuthentication(email: string): Promise<UserEntity | null>;
}
