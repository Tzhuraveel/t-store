export class ResponseDto<T = any> {
  statusCode: string;
  message: string;
  data: T;
}
