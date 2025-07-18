import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import mailerConfiguration from './mailer-configuration';

export class MailerConfigService {
  constructor(
    @Inject(mailerConfiguration.KEY)
    private configuration: ConfigType<typeof mailerConfiguration>,
  ) {}

  get user(): string {
    return this.configuration.user;
  }

  get pass(): string {
    return this.configuration.pass;
  }

  get from(): string {
    return this.configuration.from;
  }
}
