import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

import { ResponseHelper } from '#common/helpers/response.helper';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let messages: string | string[];
    if (exception instanceof BadRequestException) {
      const response = exception.getResponse();
      if (typeof response === 'object' && response.hasOwnProperty('message')) {
        messages = (response as any).message;
      } else {
        messages = exception.message;
      }
      status = exception.getStatus();
    } else if (exception instanceof HttpException) {
      messages = exception.message;
      status = exception.getStatus();
    } else if (exception instanceof QueryFailedError) {
      messages = exception.message;
      status = 500;
    } else {
      status = 500;
      messages = 'Internal server error';
    }

    this.logger.error(
      exception instanceof Error ? exception.stack : '',
      `${request.method} ${request.url}`,
    );

    messages = Array.isArray(messages) ? messages : [messages];

    response.status(status);

    const responseBody = ResponseHelper.toResponse(request, response, messages);

    httpAdapter.reply(response, responseBody, status);
  }
}
