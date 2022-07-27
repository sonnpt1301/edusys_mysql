import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { StringMaxWords } from '../../../shared/decorators/string-max-word.decorator';
import { CommonPaginationDto } from '../../../shared/pagination/dto/pagination.dto';
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

export class UpdateJoinCourseDto {
  @IsNumber({}, { each: true })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @ArrayUnique({ message: 'Each studentId must be unique.' })
  studentIds: number[];

  @IsEnum([
    JoinCourseStatus.ACCEPTED,
    JoinCourseStatus.REJECTED,
    JoinCourseStatus.SUSPENDED,
  ])
  @Type(() => Number)
  status: JoinCourseStatus;
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

export class GetListCourseQuery extends CommonPaginationDto {
  @IsOptional()
  @IsEnum(JoinCourseStatus)
  @Type(() => Number)
  status: JoinCourseStatus;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  createdBy: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  categoryId: number;

  @IsOptional()
  @StringMaxWords(4)
  @IsString()
  reason: string;
}
