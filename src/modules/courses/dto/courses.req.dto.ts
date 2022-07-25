import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsString, IsUrl } from 'class-validator';
import { Status } from '../../categories/enum/courses.enum';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsUrl()
  bgImage: string;

  @IsDateString()
  fromDate: string;

  @IsDateString()
  toDate: string;

  @IsString()
  reason: string;
}

export class UpdateCourseStatusQuery {
  @IsEnum(Status)
  @Type(() => Number)
  status: Status;
}
