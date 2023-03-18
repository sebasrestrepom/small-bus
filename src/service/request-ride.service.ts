import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from 'src/entity/position';
import { Repository } from 'typeorm';
import { Driver } from '../entity/driver';
import { Ride } from '../entity/ride';
import { Rider } from '../entity/rider';

@Injectable()
export class RequestRideService {
  constructor(
    @InjectRepository(Ride)
    private rideRepository: Repository<Ride>,
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
    @InjectRepository(Rider)
    private riderRepository: Repository<Rider>,
  ) {}

  async execute(email: string, startPosition: Position): Promise<Ride> {
    const rider = await this.getOrCreateRider(email);
    const driver = await this.getDriver(startPosition);

    const ride = new Ride();
    ride.driver = driver;
    ride.rider = rider;
    ride.startDate = new Date();
    ride.startPosition = startPosition;

    return this.rideRepository.save(ride);
  }

  private async getDriver(position: Position) {
    const drivers = await this.driverRepository.find();

    const driversWithDistance = drivers.map((driver) => {
      const distance = this.haversine(
        position.latitude,
        position.longitude,
        driver.position.latitude,
        driver.position.longitude,
      );
      return { ...driver, distance };
    });

    driversWithDistance.sort((a, b) => a.distance - b.distance);

    return driversWithDistance[0];
  }

  private haversine(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371000;
    const lat1ToRadians = (lat1 * Math.PI) / 180;
    const lat2ToRadians = (lat2 * Math.PI) / 180;
    const differenceLatitude = ((lat2 - lat1) * Math.PI) / 180;
    const differenceLongitude = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(differenceLatitude / 2) * Math.sin(differenceLatitude / 2) +
      Math.cos(lat1ToRadians) *
        Math.cos(lat2ToRadians) *
        Math.sin(differenceLongitude / 2) *
        Math.sin(differenceLongitude / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  private async getOrCreateRider(email: string): Promise<Rider> {
    const rider = await this.riderRepository.findOne({
      where: {
        email,
      },
    });

    if (rider) {
      return rider;
    }

    const newRider = new Rider();
    newRider.email = email;

    return this.riderRepository.save(newRider);
  }
}
