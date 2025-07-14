import { PickType } from '@nestjs/mapped-types';

import { BaseUserRequestDto } from './base-user-request.dto';

export class CreateUserRequestDto extends PickType(BaseUserRequestDto, [
  'firstName',
  'lastName',
  'email',
] as const) {}
