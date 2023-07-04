import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
export class SignupDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  @MinLength(4)
  password?: string;
}
