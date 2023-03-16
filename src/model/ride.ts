import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Driver } from './driver';
import { Rider } from './rider';

@Entity()
export class Ride {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Driver)
  @JoinColumn()
  driver: Driver;

  @OneToOne(() => Rider)
  @JoinColumn()
  rider: Rider;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  startLatitude: number;

  @Column()
  startLongitude: number;

  @Column()
  endLatitude: number;

  @Column()
  endLongitude: number;

  @Column()
  value: number;

  finishRide() {
    this.endDate = new Date();

    const km = this.getFinalKm();
    const minutes = this.getFinalMinutes();

    this.value = 3500;
    this.value += km * 1000;
    this.value += minutes * 200;
  }

  private getFinalKm() {
    // TODO Cambiar por la formula para calular los km
    return 1000;
    //return this.endLatitude - this.startLatitude;
  }

  private getFinalMinutes() {
    // TODO Cambiar por la formula para calular los minutos entre fechas
    return 5;
    //return this.endDate - this.startDate;
  }
}
