import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Student } from '../students/entities/student.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../shared/constants/common.constant';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, Student]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
