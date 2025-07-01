import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import appConfiguration from './app-configuration';

@Injectable()
export class AppConfigService {
  constructor(
    @Inject(appConfiguration.KEY)
    private configuration: ConfigType<typeof appConfiguration>,
  ) {}

  get port(): number {
    return this.configuration.port;
  }
}
