import { ResponseStatus } from '#common/models/enums/response-status.enum';

export class ResponseDto<T = any> {
  status: ResponseStatus;
  statusCode: number;
  messages: string[];
  timestamp: string;
  path: string;
  data?: T;
}
