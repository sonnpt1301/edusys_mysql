import { OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  image: string;

  @IsNumber()
  @IsNotEmpty()
  courseId: number;
}

export class UpdateBlogDto extends OmitType(CreateBlogDto, [
  'courseId',
] as const) {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  @IsOptional()
  image: string;
}
