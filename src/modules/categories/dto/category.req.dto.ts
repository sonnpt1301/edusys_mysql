import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ default: 'Information Technology' })
  @IsString()
  name: string;
}
