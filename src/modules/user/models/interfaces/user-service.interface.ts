import { UserEntity } from '#infra/database/entities/user.entity';
import { UploadedFileData } from '#infra/file-storage/models/interfaces/file-stream.interface';

import { CreateUserInput } from '../types/create-user-input.type';
import { UserData } from '../types/user-data.type';

export interface UserServiceInterface {
  create(user: CreateUserInput): Promise<UserEntity>;
  ensureEmailIsUnique(email: string): Promise<void>;
  profile(userId: number): Promise<UserEntity>;
  uploadAvatar(user: UserData, file: UploadedFileData): Promise<any>;
}
