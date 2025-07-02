import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '#infra/database/entities/user.entity';

import { UserRepositoryInterface } from '../model/interfaces/user-repository.interface';

@Injectable()
export class UserRepository
  extends Repository<UserEntity>
  implements UserRepositoryInterface
{
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  async createAndSave(user: UserEntity): Promise<UserEntity> {
    return await this.save(this.create(user));
  }
}
