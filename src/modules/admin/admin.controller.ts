import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Role } from '../../shared/constants/common.constant';
import { User } from '../../shared/decorators/get-user.decorator';
import { Roles } from '../../shared/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';
import { RolesGuard } from '../auth/guards/role-guard';
import { AdminService } from './admin.service';
import { CreateAdminProfileDto } from './dto/admin.req.dto';
@UseGuards(JwtAuthGuard)
@Roles(Role.ADMIN)
@UseGuards(RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('update-profile')
  async updateProfile(
    @User() accId: number,
    @Body() body: CreateAdminProfileDto,
  ) {
    return this.adminService.updateProfile(accId, body);
  }
}
