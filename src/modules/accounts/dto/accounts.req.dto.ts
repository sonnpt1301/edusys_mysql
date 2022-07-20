import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../../../shared/constants/common.constant';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  passwordResetToken: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
