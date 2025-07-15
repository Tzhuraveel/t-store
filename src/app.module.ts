import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { ResponseMapInterceptor } from '#common/interceptors/response-map.interceptor';
import { AppConfigModule } from '#config/app/app-config.module';
import { DatabaseModule } from '#infra/database/database.module';
import { AuthModule } from '#modules/auth/auth.module';
import { AccessTokenGuard } from '#modules/auth/guards/access-token.guard';
import { UserModule } from '#modules/user/user.module';

import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

@Module({
  imports: [AppConfigModule, DatabaseModule, UserModule, AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseMapInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
