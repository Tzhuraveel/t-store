import { IsString } from 'class-validator';

export class MailerVariablesDto {
  @IsString()
  EMAIL_USER: string;

  @IsString()
  EMAIL_PASS: string;

  @IsString()
  EMAIL_FROM: string;
}
