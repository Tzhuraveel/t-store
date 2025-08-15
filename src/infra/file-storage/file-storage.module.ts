import { Module } from '@nestjs/common';

import {
  FILE_STORAGE_SERVICE,
  STORAGE_PROVIDER,
} from './models/constants/file-storage.constants';
import { FileStorageService } from './services/file-storage.service';
import { LocalFileStorageService } from './services/local-file-storage.service';

@Module({
  providers: [
    { useClass: FileStorageService, provide: FILE_STORAGE_SERVICE },
    { useClass: LocalFileStorageService, provide: STORAGE_PROVIDER },
  ],
  exports: [FILE_STORAGE_SERVICE],
})
export class FileStorageModule {}
