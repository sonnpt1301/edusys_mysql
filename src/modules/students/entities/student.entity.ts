import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from '../../auth/entities/account.entity';
import { Blog } from '../../blogs/entities/blog.entity';
import { UsersCourses } from '../../courses/entities/users-courses.entity';

export const TableName = 'students';
@Entity(TableName)
export class Student {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: number;

  @Column({ nullable: true })
  avatarUrl: string;

  @OneToOne(() => Account, (account) => account.student)
  @JoinColumn({ name: 'accountId' })
  account: Account;

  @OneToMany(() => Blog, (blog) => blog.createdBy)
  blogs: Blog;

  @OneToMany(() => UsersCourses, (userCourse) => userCourse.student)
  joinedCourses: UsersCourses;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<Student>) {
    Object.assign(this, partial);
  }
}
