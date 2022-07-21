import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Connection, Repository } from 'typeorm';
import { Role } from '../../shared/constants/common.constant';
import { getRandomString } from '../../utils/random-string';
import { Admin } from '../admin/entities/admin.entity';
import { Student } from '../students/entities/student.entity';
import { Tutors } from '../tutors/entities/tutor.entity';
import { CreateAccountDto } from './dto/accounts.req.dto';
import { Account } from './entities/account.entity';
import { IAccount } from './interface/accounts.interface';

@Injectable()
export class AccountsService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(Account) private accountRepo: Repository<Account>,
  ) {}

  async fineOne(id: string): Promise<Account> {
    return this.accountRepo.findOne(id);
  }

  async findByEmail(email: string): Promise<Account> {
    return this.accountRepo.findOne({ where: { email } });
  }

  async register(body: CreateAccountDto) {
    const { email, password, role } = body;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const accountExist = await this.findByEmail(email);
      if (accountExist) {
        throw new HttpException(
          'Account already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      const accountData: IAccount = {
        email,
        password: hashPassword,
        role,
        passwordResetToken: getRandomString(10),
      };
      const account = await queryRunner.manager.save(Account, accountData);
      let entityName;
      if (role === Role.STUDENT) entityName = Student;
      if (role === Role.TUTORS) entityName = Tutors;
      if (role === Role.ADMIN) entityName = Admin;
      await queryRunner.manager.save(entityName, { account });

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }
}
