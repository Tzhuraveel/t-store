import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppConfigService } from './app-config.service';
import appConfiguration from './app-configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfiguration],
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
