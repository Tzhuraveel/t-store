import { FileType } from '../enums/file-type.enum';

export interface StorageProviderInterface {
  get(key: string): Promise<NodeJS.ReadableStream>;
  save(stream: NodeJS.ReadableStream, key: string): Promise<string>;
  delete(key: string): Promise<any>;
  buildKey(extention: string, itemId: number, fileType: FileType): string;
}
