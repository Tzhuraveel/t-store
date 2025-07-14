import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './base/base.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ select: false, name: 'password_hash' })
  passwordHash: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column({ nullable: true, name: 'first_name' })
  firstName?: string;

  @Column({ nullable: true, name: 'last_name' })
  lastName?: string;
}
