import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from '../../auth/entities/account.entity';

export const TableName = 'schedule_meetings';
@Entity(TableName)
export class ScheduleMeeting {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  location: string;

  @Column()
  addressLink: string;

  @Column()
  scheduleAt: Date;

  @ManyToMany(() => Account, (account) => account.scheduleMeetings, {
    cascade: true,
  })
  @JoinTable({ name: 'rel_schedule_account' })
  accounts: Account[];

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<ScheduleMeeting>) {
    Object.assign(this, partial);
  }
}
