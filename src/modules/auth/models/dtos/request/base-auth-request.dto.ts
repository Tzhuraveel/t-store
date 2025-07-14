import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class BaseAuthRequestDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @IsOptional()
  firstName?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
