import { UploadedFileData } from '#infra/file-storage/models/interfaces/file-stream.interface';

declare global {
  namespace Express {
    interface Request {
      uploadedFile: UploadedFileData;
    }
  }
}
