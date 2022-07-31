import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { CommonPaginationDto } from '../../../shared/pagination/dto/pagination.dto';

export class CreateScheduleMeetingDto {
  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  addressLink: string;

  @IsNotEmpty()
  @IsDateString()
  @IsString()
  scheduleAt: string;
}

export class GetSchedulesQuery extends CommonPaginationDto {}
