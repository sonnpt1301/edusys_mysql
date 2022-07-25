import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Role } from '../../shared/constants/common.constant';
import { Account } from '../auth/entities/account.entity';
import { AuthService } from './../auth/auth.service';
import { CreateTutorsProfileDto } from './dto/tutors.req.dto';
import { Tutors } from './entities/tutor.entity';
@Injectable()
export class TutorsService {
  constructor(
    @InjectRepository(Tutors) private tutorsRepo: Repository<Tutors>,
    private connection: Connection,
    private authService: AuthService,
  ) {}

  async getTutorsInfo() {
    const account = await this.authService.getAccountId();
    if (!account['accountId'] || account['role'] != Role.TUTORS) {
      return null;
    }

    return this.tutorsRepo.findOne({
      where: { account: account['accountId'] },
    });
  }

  async updateProfile(accId: number, body: CreateTutorsProfileDto) {
    const account = await this.authService.fineOne(accId);
    const tutors = await this.tutorsRepo.findOne({
      where: { account: account.id },
    });
    if (!account || !tutors) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const updatingProfile = queryRunner.manager.update(
        Tutors,
        { id: tutors.id },
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
