import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { UserEntity } from '#infra/database/entities/user.entity';
import { FILE_STORAGE_SERVICE } from '#infra/file-storage/models/constants/file-storage.constants';
import { FileType } from '#infra/file-storage/models/enums/file-type.enum';
import { FileStorageServiceInterface } from '#infra/file-storage/models/interfaces/file-storage-service.interface';
import { UploadedFileData } from '#infra/file-storage/models/interfaces/file-stream.interface';

import { USER_REPOSITORY } from '../models/constants/user.constants';
import { UserServiceInterface } from '../models/interfaces/user-service.interface';
import { CreateUserInput } from '../models/types/create-user-input.type';
import { UserData } from '../models/types/user-data.type';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(FILE_STORAGE_SERVICE)
    private readonly fileStorageService: FileStorageServiceInterface,
  ) {}

  async create(data: CreateUserInput): Promise<UserEntity> {
    return await this.userRepository.createAndSave(data);
  }

  async profile(userId: number): Promise<UserEntity> {
    return await this.userRepository.findOneById(userId);
  }

  async ensureEmailIsUnique(email: string): Promise<void> {
    const isUserExist = await this.userRepository.existsBy({
      email,
    });

    if (isUserExist) {
      throw new ConflictException('Email already exists');
    }
  }

  async uploadAvatar(user: UserData, file: UploadedFileData): Promise<any> {
    const avatarKey = await this.fileStorageService.upload(
      file,
      user.userId,
      FileType.AVATAR,
    );

    await this.userRepository.update({ id: user.userId }, { avatarKey });

    await this.fileStorageService.delete(user.avatarKey);
  }
}
