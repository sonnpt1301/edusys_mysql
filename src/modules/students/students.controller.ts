import { Body, Controller, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '../../shared/constants/common.constant';
import { Auth } from '../../shared/decorators/auth.decorator';
import { User } from '../../shared/decorators/get-user.decorator';
import { UpdateStudentInfoDto } from './dto/students.req.dto';
import { StudentsService } from './students.service';

@Auth(Role.STUDENT)
@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Put('update-profile')
  async updateProfile(
    @User() accId: number,
    @Body() body: UpdateStudentInfoDto,
  ) {
    return this.studentsService.updateProfile(accId, body);
  }
}
