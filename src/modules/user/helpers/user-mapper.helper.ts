import { UserEntity } from '#infra/database/entities/user.entity';

import { UserData } from '../models/types/user-data.type';

export class UserMapper {
  static toData(user: UserEntity | null): UserData {
    return {
      userId: user.id,
    };
  }
}
