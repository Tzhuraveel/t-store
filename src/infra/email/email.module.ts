import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { MAILER_CONFIG_SERVICE } from '#config/mailer/mailer-config.constants';
import { MailerConfigModule } from '#config/mailer/mailer-config.module';
import { MailerConfigService } from '#config/mailer/mailer-config.service';

import { AuthListener } from './listeners/auth.listener';
import { EMAIL_SERVICE } from './models/constants/email.constants';
import { EmailService } from './services/email.service';

const eventListeners = [AuthListener];

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [MailerConfigModule],
      useFactory: (mailerConfigService: MailerConfigService) => ({
        transport: {
          service: 'gmail',
          auth: {
            user: mailerConfigService.user,
            pass: mailerConfigService.pass,
          },
        },
        defaults: {
          from: mailerConfigService.from,
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [MAILER_CONFIG_SERVICE],
    }),
  ],
  providers: [
    { provide: EMAIL_SERVICE, useClass: EmailService },
    ...eventListeners,
  ],
})
export class EmailModule {}
