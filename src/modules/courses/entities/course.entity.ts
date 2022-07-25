import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Tutors } from '../../tutors/entities/tutor.entity';
import { UsersCourses } from './users-courses.entity';

export const TableName = 'courses';
@Entity(TableName)
export class Course {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: number;

  @Column()
  bgImage: string;

  @Column()
  fromDate: Date;

  @Column()
  toDate: Date;

  @Column()
  secretKey: string;

  @Column()
  reason: string;

  @ManyToOne(() => Tutors, (tutors) => tutors.courses)
  @JoinColumn({ name: 'createdBy' })
  createdBy: Tutors;

  @ManyToOne(() => Category, (category) => category.courses)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @OneToMany(() => UsersCourses, (userCourse) => userCourse.course)
  studentList: UsersCourses;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<Course>) {
    Object.assign(this, partial);
  }
}
