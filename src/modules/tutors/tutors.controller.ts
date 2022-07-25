import { Body, Controller, Post, Put } from '@nestjs/common';
import { User } from '../../shared/decorators/get-user.decorator';
import { CreateTutorsProfileDto } from './dto/tutors.req.dto';
import { TutorsService } from './tutors.service';

@Controller('tutors')
export class TutorsController {
  constructor(private readonly tutorsService: TutorsService) {}

  @Put('update-profile')
  async updateProfile(
    @User() accId: number,
    @Body() body: CreateTutorsProfileDto,
  ) {
    return this.tutorsService.updateProfile(accId, body);
  }
}
