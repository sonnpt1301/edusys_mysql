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
import { Category } from '../../categories/entities/category.entity';
import { Course } from '../../courses/entities/course.entity';

export const TableName = 'admin';
@Entity(TableName)
export class Admin {
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

  @OneToOne(() => Account, (account) => account.admin)
  @JoinColumn({ name: 'accountId' })
  account: Account;

  @OneToOne(() => Category, (categories) => categories.createdBy)
  categories: Category;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<Admin>) {
    Object.assign(this, partial);
  }
}
