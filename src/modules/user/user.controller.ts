import { Body, Controller, Inject, Post } from '@nestjs/common';

import { USER_SERVICE } from './model/constants/user.constants';
import { CreateUserRequestDto } from './model/dtos/request/create-user-request.dto';
import { UserServiceInterface } from './model/interfaces/user-service.interface';

@Controller({ path: 'users' })
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserServiceInterface,
  ) {}

  @Post()
  async create(@Body() data: CreateUserRequestDto): Promise<any> {
    return await this.userService.create(data);
  }
}
