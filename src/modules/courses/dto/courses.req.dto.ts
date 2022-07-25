import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsString, IsUrl } from 'class-validator';
import { JoinCourseStatus, Status } from '../enum/courses.enum';

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

export class JoinCourseDto {
  @IsString()
  secretKey: string;
}

export class UpdateCourseStatusQuery {
  @IsEnum(Status)
  @Type(() => Number)
  status: Status;
}

export class UpdateJoinCourseStatusQuery {
  @IsEnum(JoinCourseStatus)
  @Type(() => Number)
  status: JoinCourseStatus;
}
