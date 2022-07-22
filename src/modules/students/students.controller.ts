import { JwtAuthGuard } from './../auth/guards/jwt-auth-guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/constants/common.constant';
import { RolesGuard } from '../auth/guards/role-guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Roles(Role.ADMIN, Role.STUDENT)
@UseGuards(RolesGuard)
@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  async saveProfile() {}
}
