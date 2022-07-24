import { Body, Controller, Post } from '@nestjs/common';
import { Role } from '../../shared/constants/common.constant';
import { Auth } from '../../shared/decorators/auth.decorator';
import { User } from '../../shared/decorators/get-user.decorator';
import { AdminService } from './admin.service';
import { CreateAdminProfileDto } from './dto/admin.req.dto';
@Auth(Role.ADMIN)
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
