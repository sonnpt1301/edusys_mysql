import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../../../shared/constants/common.constant';

export class CreateAccountDto {
  @ApiProperty({ default: 'jokerboy1412@gmail.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ default: '123456' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ enum: Role, default: Role.STUDENT })
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}

export class LoginDto {
  @ApiProperty({ default: 'jokerboy1412@gmail.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ default: '123456' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
