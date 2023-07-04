import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a valid email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password?: string;
}
