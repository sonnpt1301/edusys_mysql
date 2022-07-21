import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from '../../auth/entities/account.entity';

export const TableName = 'tutors';
@Entity(TableName)
export class Tutors {
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

  @OneToOne(() => Account, (account) => account.tutors)
  @JoinColumn()
  account: Account;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<Tutors>) {
    Object.assign(this, partial);
  }
}
