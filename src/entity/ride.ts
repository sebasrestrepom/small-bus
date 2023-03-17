import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Driver } from './driver';
import { Rider } from './rider';
import { Position } from './position';

@Entity()
export class Ride {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Driver, { eager: true })
  @JoinColumn()
  driver: Driver;

  @ManyToOne(() => Rider, { eager: true })
  @JoinColumn()
  rider: Rider;

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column(() => Position)
  startPosition: Position;

  @Column(() => Position)
  endPosition: Position;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  value: number;


 //TODO Columnas reference, paymentId

  finishRide(endPosition: Position) {
    this.endPosition = endPosition;
    this.endDate = new Date();

    const km = this.getFinalKm();
    const minutes = this.getFinalMinutes();

    this.value = 3500;
    this.value += km * 1000;
    this.value += minutes * 200;
    this.value = Math.round(this.value * 100) / 100;
  }

  private getFinalKm() {
    const distance = Math.sqrt(
      Math.pow(this.endPosition.latitude - this.startPosition.latitude, 2) +
        Math.pow(this.endPosition.longitude - this.startPosition.longitude, 2),
    );

    return distance;
  }

  private getFinalMinutes() {
    const diffInMs: number = this.endDate.getTime() - this.startDate.getTime();
    const diffInMinutes = Math.floor(diffInMs / 1000 / 60);
    return diffInMinutes;
  }
}
