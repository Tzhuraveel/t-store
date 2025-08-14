import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UploadedFile = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req: any = ctx.switchToHttp().getRequest();
    return req.uploadedFile;
  },
);
