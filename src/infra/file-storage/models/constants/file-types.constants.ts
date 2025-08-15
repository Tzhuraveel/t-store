import { MimeType } from '#common/models/enums/mime-type.enum';

import { FileType } from '../enums/file-type.enum';

export const ALLOWED_FILE_TYPES: Record<FileType, MimeType[]> = {
  [FileType.AVATAR]: [MimeType.PNG, MimeType.JPEG],
};
