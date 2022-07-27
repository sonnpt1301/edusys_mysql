import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { Course } from './course.entity';

export const TableName = 'users_courses';
@Entity(TableName)
export class UsersCourses {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Course, (course) => course.studentList)
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @ManyToOne(() => Student, (course) => course.joinedCourses)
  @JoinColumn({ name: 'studentId' })
  student: Student;

  @Column()
  status: number;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<UsersCourses>) {
    Object.assign(this, partial);
  }
}
