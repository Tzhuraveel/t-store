import { ResponseStatus } from '#common/models/enums/response-status.enum';

export class ResponseDto<T = any> {
  status: ResponseStatus;
  statusCode: string;
  messages: string[];
  data: T;
}
