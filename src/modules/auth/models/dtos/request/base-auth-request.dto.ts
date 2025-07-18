import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class BaseAuthRequestDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
