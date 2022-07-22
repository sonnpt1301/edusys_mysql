import { Entity, PrimaryGeneratedColumn } from 'typeorm';

export const TableName = 'courses';
@Entity(TableName)
export class Course {
  @PrimaryGeneratedColumn('increment')
  id: number;
}
