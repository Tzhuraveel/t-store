import { UserEntity } from '#infra/database/entities/user.entity';

export type CreateUserInput = Pick<
  UserEntity,
  'email' | 'passwordHash' | 'firstName' | 'lastName'
>;
