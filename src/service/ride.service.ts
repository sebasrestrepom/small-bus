import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Driver } from '../model/driver';
import { Ride } from '../model/ride';
import { Rider } from '../model/rider';

@Injectable()
export class RideService {
  constructor(
    @InjectRepository(Ride)
    private rideRepository: Repository<Ride>,
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
    @InjectRepository(Rider)
    private riderRepository: Repository<Rider>,
  ) {}

  async requestRide(
    email: string,
    startLatitude: number,
    startLongitude: number,
  ): Promise<Ride> {
    const rider = await this.getOrCreateRider(email);
    const driver = await this.getDriver(startLatitude, startLongitude);

    const ride = new Ride();
    ride.driver = driver;
    ride.rider = rider;
    ride.startDate = new Date();
    ride.startLatitude = startLatitude;
    ride.startLongitude = startLongitude;

    return this.rideRepository.save(ride);
  }

  private async getDriver(latitude: number, longitude: number) {
    const drivers = await this.driverRepository.find();

    // Calculamos la distancia entre la ubicación actual y la ubicación de cada conductor
    const driversWithDistance = drivers.map((driver) => {
      const distance = this.haversine(
        latitude,
        longitude,
        driver.latitude,
        driver.longitude,
      );
      return { ...driver, distance };
    });

    // Ordenamos los conductores por distancia
    driversWithDistance.sort((a, b) => a.distance - b.distance);

    // Devolvemos el conductor más cercano
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

    console.log('rider', rider);
    if (rider) {
      return rider;
    }

    const newRider = new Rider();
    newRider.email = email;

    return this.riderRepository.save(newRider);
  }

  async finishRide(id: number): Promise<Ride> {
    const ride = await this.rideRepository.findOneById(id);

    ride.finishRide();

    //TODO llamar un servicio para conectarse con la api externa

    return this.riderRepository.save(ride);
  }
}
