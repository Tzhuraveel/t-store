import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '#infra/database/entities/user.entity';

import { UserRepositoryInterface } from '../models/interfaces/user-repository.interface';

@Injectable()
export class UserRepository
  extends Repository<UserEntity>
  implements UserRepositoryInterface
{
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  async findOneById(id: number): Promise<UserEntity | null> {
    return await this.createQueryBuilder('users')
      .where('users.id = :id', { id })
      .getOne();
  }

  async createAndSave(user: Partial<UserEntity>): Promise<UserEntity> {
    return await this.save(this.create(user));
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.findOne({ where: { email } });
  }

  async findForAuthentication(email: string): Promise<UserEntity | null> {
    return await this.findOne({
      where: { email },
      select: { id: true, passwordHash: true },
    });
  }
}
