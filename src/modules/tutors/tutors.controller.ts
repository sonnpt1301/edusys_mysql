import { Body, Controller, Put } from '@nestjs/common';
import { User } from '../../shared/decorators/get-user.decorator';
import { UpdateTutorsProfileDto } from './dto/tutors.req.dto';
import { TutorsService } from './tutors.service';

@Controller('tutors')
export class TutorsController {
  constructor(private readonly tutorsService: TutorsService) {}

  @Put('update-profile')
  async updateProfile(
    @User() accId: number,
    @Body() body: UpdateTutorsProfileDto,
  ) {
    return this.tutorsService.updateProfile(accId, body);
  }
}
