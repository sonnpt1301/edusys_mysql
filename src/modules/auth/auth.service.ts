import { Request } from 'express';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { Role } from '../../shared/constants/common.constant';
import { getRandomString } from '../../utils/random-string';
import { Admin } from '../admin/entities/admin.entity';
import { Student } from '../students/entities/student.entity';
import { Tutors } from '../tutors/entities/tutor.entity';
import { CreateAccountDto, LoginDto } from './dto/auth.req.dto';
import { Account } from './entities/account.entity';
import { IAccount } from './interface/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(Account) private accountRepo: Repository<Account>,
    @Inject(REQUEST) private readonly request: Request,
    private jwtService: JwtService,
  ) {}

  async fineOne(id: number, options = {}): Promise<Account> {
    return this.accountRepo.findOne(id, options);
  }

  async getAccountId() {
    const req = this.request['user'];
    if (!req) {
      return null;
    }

    return req;
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
      let entityName: EntityTarget<Student | Tutors | Admin>;
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

  async login(body: LoginDto) {
    const { email, password } = body;

    const account = await this.accountRepo.findOne({ where: { email } });
    if (!account) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }

    const { password: hashPassword, role, id: accountId, isVerified } = account;
    const comparedPassword = await bcrypt.compare(password, hashPassword);
    if (!comparedPassword) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }

    const payload = { email, role, accountId, isVerified };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
