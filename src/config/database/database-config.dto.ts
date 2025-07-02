import { IsNumber, IsString } from 'class-validator';

export class DatabaseEnvironmentVariablesDto {
  @IsNumber()
  DATABASE_PORT: number = 5432;

  @IsString()
  DATABASE_USER: string = 'postgres';

  @IsString()
  DATABASE_PASSWORD: string = 'postgres';

  @IsString()
  DATABASE_NAME: string = 't-store';

  @IsString()
  DATABASE_HOST: string = 'localhost';
}
