import { Controller, Inject } from '@nestjs/common';

import { USER_SERVICE } from './models/constants/user.constants';
import { UserServiceInterface } from './models/interfaces/user-service.interface';

@Controller({ path: 'users' })
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserServiceInterface,
  ) {}
}
