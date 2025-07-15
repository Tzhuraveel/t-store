import { PickType } from '@nestjs/mapped-types';

import { BaseUserResponseDto } from './base-user-response.dto';

export class UserProfileResponseDto extends PickType(BaseUserResponseDto, [
  'id',
  'email',
  'firstName',
  'lastName',
]) {}
