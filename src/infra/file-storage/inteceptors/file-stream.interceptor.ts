import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  HttpException,
  mixin,
  NestInterceptor,
  PayloadTooLargeException,
  Type,
} from '@nestjs/common';
import Busboy from 'busboy';
import { Request } from 'express';
import * as FileType from 'file-type';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { PassThrough, Readable } from 'stream';

import {
  FileValidation,
  StorageOptions,
} from '../models/interfaces/file-stream.interface';

export function FileStreamInterceptor(
  fieldName: string,
  options: StorageOptions = {},
): Type<NestInterceptor> {
  const limits: Busboy.Limits = {
    files: 1,
    fileSize: 5 * 1024 * 1024,
    // fields: 10,
    // fieldSize: 64 * 1024,
    headerPairs: 100,
    ...options.limits,
  };

  const validation: FileValidation = {
    mimeTypes: [],
    ...options.validation,
  };

  class MixinInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const req = context.switchToHttp().getRequest<Request>();

      const busboy = Busboy({ headers: req.headers, limits });

      const cleanup = (_err?: Error | HttpException | unknown) => {
        req.unpipe(busboy);
      };

      busboy.on('error', (err) => {
        cleanup(err);
      });

      busboy.on('finish', () => {
        if (!req.uploadedFile) {
          const err = new BadRequestException('No file uploaded');
          busboy.destroy(err);
        }
      });

      busboy.on('filesLimit', () => {
        const err = new BadRequestException('Too many files');
        busboy.destroy(err);
      });

      req.on('aborted', () => {
        const err = new BadRequestException('Request aborted');
        busboy.destroy(err);
      });

      const promisedBusboy = new Promise<void>((resolve, reject) => {
        busboy.on(
          'file',
          async (name: string, stream: Readable, info: Busboy.FileInfo) => {
            if (name !== fieldName) {
              return void stream.resume();
            }

            stream.on('limit', () => {
              const err = new PayloadTooLargeException('File too large');
              stream.destroy(err);
              reject(err);
            });

            stream.on('error', (err) => {
              busboy.destroy(err);
              reject(err);
            });

            const buffer = await new Promise<Buffer>((resolve) => {
              stream.once('readable', () => resolve(stream.read(4100)));
            });

            const fileTypeResult = await FileType.fileTypeFromBuffer(buffer);

            if (
              !fileTypeResult ||
              !validation.mimeTypes.includes(fileTypeResult.mime)
            ) {
              const err = new BadRequestException('Invalid file type');
              stream.destroy(err);
              reject(err);
            }

            const passthrough = new PassThrough();
            passthrough.write(buffer);
            stream.pipe(passthrough);

            req.uploadedFile = {
              stream: passthrough,
              filename: info.filename,
              mimeType: info.mimeType,
              encoding: info.encoding,
            };

            resolve();
          },
        );
      });

      req.pipe(busboy);

      return from(promisedBusboy).pipe(
        switchMap(() => next.handle()),
        catchError((err) => {
          return throwError(() => err);
        }),
      );
    }
  }

  return mixin(MixinInterceptor);
}
