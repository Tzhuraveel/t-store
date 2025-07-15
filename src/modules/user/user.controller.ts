import { Controller, Get, Inject } from '@nestjs/common';

import { Serialize } from '#common/decorators/serialize.decorator';
import { CurrentUser } from '#modules/auth/decorators/current-user.decorator';

import { USER_SERVICE } from './models/constants/user.constants';
import { UserProfileResponseDto } from './models/dtos/response/user-profile-response.dto';
import { UserServiceInterface } from './models/interfaces/user-service.interface';
import { UserData } from './models/types/user-data.type';

@Controller({ path: 'users' })
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserServiceInterface,
  ) {}

  @Get('me')
  @Serialize(UserProfileResponseDto)
  async profile(
    @CurrentUser() user: UserData,
  ): Promise<UserProfileResponseDto> {
    return await this.userService.profile(user.userId);
  }
}
