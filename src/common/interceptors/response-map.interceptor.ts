import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RESPONSE_MESSAGE_KEY } from '#common/decorators/response-message.decorator';
import { ResponseHelper } from '#common/helpers/response.helper';
import { ResponseDto } from '#common/models/dtos/responses/response.dto';

@Injectable()
export class ResponseMapInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseDto> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const messages = this.reflector.getAllAndOverride(RESPONSE_MESSAGE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? ['Data retrieved successfully'];

    return next
      .handle()
      .pipe(
        map((data) =>
          ResponseHelper.toResponse(request, response, messages, data),
        ),
      );
  }
}
