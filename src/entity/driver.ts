import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Position } from './position';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column(() => Position)
  position: Position;
}
