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
import { Course } from '../../courses/entities/course.entity';
import { Student } from '../../students/entities/student.entity';

export const TableName = 'blogs';
@Entity(TableName)
export class Blog {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  status: number;

  @ManyToOne(() => Student, (student) => student.blogs)
  @JoinColumn({ name: 'createdBy' })
  createdBy: Student;

  @ManyToOne(() => Course, (course) => course.blogs)
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<Blog>) {
    Object.assign(this, partial);
  }
}
