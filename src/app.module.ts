import { Module } from '@nestjs/common';

import { AppConfigModule } from '#config/app/app-config.module';
import { DatabaseModule } from '#infra/database/database.module';
import { UserModule } from '#modules/user/user.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, UserModule],
})
export class AppModule {}
