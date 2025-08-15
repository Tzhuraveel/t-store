import { fileTypeFromBuffer, FileTypeResult } from 'file-type';
import { Readable } from 'stream';

export async function peekFileTypeResult(
  stream: Readable,
  bytes: number,
): Promise<FileTypeResult> {
  const chunk =
    stream.read(bytes) ||
    (await new Promise<Buffer>((resolve) => {
      stream.once('readable', () => resolve(stream.read(bytes)));
    }));

  if (!chunk) {
    throw new Error('Stream ended before reading data');
  }

  const fileTypeResult = await fileTypeFromBuffer(chunk);

  stream.unshift(chunk);

  return fileTypeResult;
}
