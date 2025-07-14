import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResponseDto } from '#common/models/dtos/responses/response.dto';

@Injectable()
export class ResponseMapInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseDto> {
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data) => {
        return {
          statusCode,
          message: 'Data retrieved successfully',
          data,
        };
      }),
    );
  }
}
