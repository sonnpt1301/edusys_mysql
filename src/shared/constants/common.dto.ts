import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({ default: 'Joker' })
  @IsString()
  firstName: string;

  @ApiProperty({ default: 'boy' })
  @IsString()
  lastName: string;

  @ApiProperty({ default: 'Ha Noi' })
  @IsString()
  city: string;

  @ApiProperty({ default: '322 My Dinh Street' })
  @IsString()
  address: string;

  @ApiProperty({ default: 355832199 })
  @IsNumber()
  phone: number;

  @ApiProperty({
    default:
      'https://www.indiewire.com/wp-content/uploads/2021/01/joker-movie.jpg',
  })
  @IsString()
  avatarUrl: string;
}
