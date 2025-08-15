import { FileType } from '../enums/file-type.enum';
import { UploadedFileData } from './file-stream.interface';

export interface FileStorageServiceInterface {
  upload(
    file: UploadedFileData,
    itemId: number,
    fileType: FileType,
  ): Promise<string>;
  delete(key?: string): Promise<void>;
}
