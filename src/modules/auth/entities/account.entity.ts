import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Admin } from '../../admin/entities/admin.entity';
import { Student } from '../../students/entities/student.entity';
import { Tutors } from '../../tutors/entities/tutor.entity';
import { ScheduleMeeting } from './../../schedule-meetings/entities/schedule-meeting.entity';

export const TableName = 'accounts';
@Entity(TableName)
export class Account {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  @Exclude()
  passwordResetToken: string;

  @Column()
  role: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @OneToOne(() => Student, (student) => student.account)
  student: Student;

  @OneToOne(() => Admin, (admin) => admin.account)
  admin: Admin;

  @OneToOne(() => Tutors, (tutors) => tutors.account)
  tutors: Tutors;

  @ManyToMany(
    () => ScheduleMeeting,
    (scheduleMeeting) => scheduleMeeting.accounts,
  )
  scheduleMeetings: ScheduleMeeting[];

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<Account>) {
    Object.assign(this, partial);
  }
}
