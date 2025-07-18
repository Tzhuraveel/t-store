import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MAILER_CONFIG_SERVICE } from './mailer-config.constants';
import { MailerConfigService } from './mailer-config.service';
import authConfiguration from './mailer-configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [authConfiguration],
    }),
  ],
  providers: [
    {
      provide: MAILER_CONFIG_SERVICE,
      useClass: MailerConfigService,
    },
  ],
  exports: [MAILER_CONFIG_SERVICE],
})
export class MailerConfigModule {}
