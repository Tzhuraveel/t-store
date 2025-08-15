import { UploadedFileData } from '#infra/file-storage/models/interfaces/file-stream.interface';
import { UserData } from '#modules/user/models/types/user-data.type';

declare global {
  namespace Express {
    interface Request {
      uploadedFile?: UploadedFileData;
      user?: UserData;
    }
  }
}
