import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TutorsService } from './tutors.service';
import { TutorsController } from './tutors.controller';
import { Tutors } from './entities/tutor.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tutors]), AuthModule],
  controllers: [TutorsController],
  providers: [TutorsService],
  exports: [TutorsService],
})
export class TutorsModule {}
