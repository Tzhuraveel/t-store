import { Module } from '@nestjs/common';

import {
  USER_REPOSITORY,
  USER_SERVICE,
} from './models/constants/user.constants';
import { UserRepository } from './services/user.repository';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [USER_SERVICE, USER_REPOSITORY],
})
export class UserModule {}
