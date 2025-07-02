import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './base/base.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hashPassword: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;
}
