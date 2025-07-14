import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RESPONSE_MESSAGE_KEY } from '#common/decorators/response-message.decorator';
import { ResponseDto } from '#common/models/dtos/responses/response.dto';
import { ResponseStatus } from '#common/models/enums/response-status.enum';

@Injectable()
export class ResponseMapInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseDto> {
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;

    const messages = this.reflector.getAllAndOverride(RESPONSE_MESSAGE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? ['Data retrieved successfully'];

    return next.handle().pipe(
      map((data) => {
        return {
          status: this.getStatusFromCode(statusCode),
          statusCode,
          messages,
          data,
        };
      }),
    );
  }

  private getStatusFromCode(statusCode: number): ResponseStatus {
    switch (true) {
      case statusCode >= 200 && statusCode < 400:
        return ResponseStatus.SUCCESS;
      case statusCode >= 400 && statusCode < 500:
        return ResponseStatus.FAIL;
      default:
        return ResponseStatus.ERROR;
    }
  }
}
