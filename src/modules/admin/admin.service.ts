import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Role } from '../../shared/constants/common.constant';
import { Account } from '../auth/entities/account.entity';
import { AuthService } from './../auth/auth.service';
import { CreateAdminProfileDto } from './dto/admin.req.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
    private connection: Connection,
    private authService: AuthService,
  ) {}

  async getAdminInfo() {
    console.log('admin')
    const account = await this.authService.getAccountId();
    if (
      !account['accountId'] ||
      account['role'] != Role.ADMIN ||
      !account['isVerified']
    ) {
      return null;
    }

    return this.adminRepo.findOne({
      where: { account: account['accountId'] },
    });
  }

  async updateProfile(accId: number, body: CreateAdminProfileDto) {
    const account = await this.authService.fineOne(accId);
    const admin = await this.adminRepo.findOne({
      where: { account: account.id },
    });
    if (!account || !admin) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const updatingProfile = queryRunner.manager.update(
        Admin,
        { id: admin.id },
        body,
      );
      const updatingAccount = queryRunner.manager.update(
        Account,
        { id: account.id },
        {
          isVerified: true,
        },
      );
      await Promise.all([updatingProfile, updatingAccount]);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
  }
}
