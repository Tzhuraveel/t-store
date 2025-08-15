import { Inject } from '@nestjs/common';

import { STORAGE_PROVIDER } from '../models/constants/file-storage.constants';
import { FileType } from '../models/enums/file-type.enum';
import { FileStorageServiceInterface } from '../models/interfaces/file-storage-service.interface';
import { UploadedFileData } from '../models/interfaces/file-stream.interface';
import { StorageProviderInterface } from '../models/interfaces/storage-provider.interface';

export class FileStorageService implements FileStorageServiceInterface {
  constructor(
    @Inject(STORAGE_PROVIDER)
    private readonly storageProvider: StorageProviderInterface,
  ) {}

  async upload(
    file: UploadedFileData,
    itemId: number,
    fileType: FileType,
  ): Promise<string> {
    const buildedKey = this.storageProvider.buildKey(
      file.extention,
      itemId,
      fileType,
    );

    return await this.storageProvider.save(file.stream, buildedKey);
  }

  async delete(key?: string): Promise<void> {
    if (key) await this.storageProvider.delete(key);
  }
}
