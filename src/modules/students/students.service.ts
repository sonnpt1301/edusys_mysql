import { UpdateStudentInfoDto } from './dto/students.req.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Role } from '../../shared/constants/common.constant';
import { AuthService } from '../auth/auth.service';
import { Student } from './entities/student.entity';
import { Account } from '../auth/entities/account.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    private connection: Connection,
    private authService: AuthService,
  ) {}

  async getStudentInfo() {
    const account = await this.authService.getAccountId();
    if (
      !account['accountId'] ||
      account['role'] != Role.STUDENT ||
      !account['isVerified']
    ) {
      return null;
    }

    return this.studentRepo.findOne({
      where: { account: account['accountId'] },
    });
  }

  async updateProfile(accId: number, body: UpdateStudentInfoDto) {
    const account = await this.authService.fineOne(accId);
    const student = await this.studentRepo.findOne({
      where: { account: account.id },
    });
    if (!account || !student) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const updatingProfile = queryRunner.manager.update(
        Student,
        { id: student.id },
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
