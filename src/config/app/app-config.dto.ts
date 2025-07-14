import { IsEnum, IsNumber } from 'class-validator';

import { Environment } from '#common/models/enums/app.enum';

export class AppEnvironmentVariablesDto {
  @IsNumber()
  APP_PORT: number = 4000;

  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.LOCAL;
}
