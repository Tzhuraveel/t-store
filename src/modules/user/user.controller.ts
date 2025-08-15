import {
  Controller,
  Get,
  Inject,
  Patch,
  UseInterceptors,
} from '@nestjs/common';

import { Serialize } from '#common/decorators/serialize.decorator';
import { UploadedFile } from '#infra/file-storage/decorators/uploaded-file.decorator';
import { FileStreamInterceptor } from '#infra/file-storage/inteceptors/file-stream.interceptor';
import { ALLOWED_FILE_TYPES } from '#infra/file-storage/models/constants/file-types.constants';
import { FileType } from '#infra/file-storage/models/enums/file-type.enum';
import { UploadedFileData } from '#infra/file-storage/models/interfaces/file-stream.interface';
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

  @Patch('avatar/upload')
  @UseInterceptors(
    FileStreamInterceptor('avatar', {
      validation: { mimeTypes: ALLOWED_FILE_TYPES[FileType.AVATAR] },
      limits: { fileSize: undefined },
    }),
  )
  async uploadFile(
    @UploadedFile() file: UploadedFileData,
    @CurrentUser() user: UserData,
  ): Promise<void> {
    await this.userService.uploadAvatar(user, file);
  }
}
