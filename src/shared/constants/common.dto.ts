import { IsNumber, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  city: string;

  @IsString()
  address: string;

  @IsNumber()
  phone: number;

  @IsString()
  avatarUrl: string;
}
