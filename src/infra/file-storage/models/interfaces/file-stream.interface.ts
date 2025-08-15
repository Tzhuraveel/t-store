export interface UploadedFileData {
  // fieldname: string;
  extention: string;
  encoding: string;
  mimeType: string;
  stream: NodeJS.ReadableStream;
  // fields: Record<string, string>;
}

export interface StorageOptions {
  limits?: {
    fileSize?: number;
    // files?: number;
    // fields?: number;
    // fieldSize?: number;
  };
  validation?: FileValidation;
}

export interface FileValidation {
  mimeTypes: string[];
}
