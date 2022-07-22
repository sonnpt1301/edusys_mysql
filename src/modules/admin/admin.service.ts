import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../shared/constants/common.constant';
import { AuthService } from './../auth/auth.service';
import { CreateAdminProfileDto } from './dto/admin.req.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
    private authService: AuthService,
  ) {}

  async getAdminInfo() {
    const { accountId, role } = await this.authService.getAccountId();
    if (!accountId || role != Role.ADMIN) {
      return null;
    }

    return this.adminRepo.findOne({
      where: { account: accountId },
    });
  }

  async updateProfile(accId: number, body: CreateAdminProfileDto) {
    const account = await this.authService.fineOne(accId);
    if (!account) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }

    await this.adminRepo
      .createQueryBuilder('admin')
      .update(Admin)
      .set(body)
      .where('accountId = :accId', { accId })
      .execute();
  }
}
