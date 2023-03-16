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
    endLatitude: number,
    endLongitude: number,
  ): Promise<Ride> {
    const rider = await this.getOrCreateRider(email);
    const driver = await this.getDriver(startLatitude, startLongitude);

    const ride = new Ride();
    ride.driver = driver;
    ride.rider = rider;
    ride.startDate = new Date();
    ride.startLatitude = startLatitude;
    ride.startLongitude = startLongitude;
    ride.endLatitude = endLatitude;
    ride.endLongitude = endLongitude;

    return this.rideRepository.save(ride);
  }

  private async getDriver(latitude: number, longitude: number) {
    const drivers = await this.driverRepository.find();
    // hay que hacer la logica para obtener el diriver mas cercano con la longitud
    const driver = drivers[0];

    console.log(drivers);
    return driver;
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
