import { IsNumber } from 'class-validator';

export class AppEnvironmentVariablesDto {
  @IsNumber()
  APP_PORT: number = 4000;
}
