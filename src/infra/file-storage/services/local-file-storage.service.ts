import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';

import { Injectable } from '@nestjs/common';

import { FileType } from '../models/enums/file-type.enum';
import { StorageProviderInterface } from '../models/interfaces/storage-provider.interface';

@Injectable()
export class LocalFileStorageService implements StorageProviderInterface {
  private readonly baseDir: string;

  constructor() {
    this.baseDir = './uploads';

    if (!fs.existsSync(this.baseDir)) {
      fs.mkdirSync(this.baseDir, { recursive: true });
    }
  }

  async get(key: string): Promise<NodeJS.ReadableStream> {
    const absolutePath = this.buildAbsolutePath(key);
    return fs.createReadStream(absolutePath);
  }

  async save(stream: NodeJS.ReadableStream, key: string): Promise<string> {
    const absolutePath = this.buildAbsolutePath(key);

    const dir = path.dirname(absolutePath);
    await fsPromises.mkdir(dir, { recursive: true });

    const writeStream = fs.createWriteStream(absolutePath);
    await pipeline(stream, writeStream);

    return key;
  }

  async delete(key: string): Promise<void> {
    const absolutePath = this.buildAbsolutePath(key);
    await fs.promises.unlink(absolutePath);
  }

  buildKey(extention: string, itemId: number, fileType: FileType): string {
    return path.join(fileType, `${itemId}`, `${randomUUID()}.${extention}`);
  }

  buildAbsolutePath(key: string): string {
    return path.join(this.baseDir, key);
  }
}
