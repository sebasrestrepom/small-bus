import { Controller, Post, Body } from '@nestjs/common';
import { RideService } from 'src/service/ride.service';
import { RideDTO } from './ride.dto';
import { Ride } from 'src/model/ride';

@Controller('/api/ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post()
  async requestRide(@Body() request: RideDTO): Promise<Ride> {
    return await this.rideService.requestRide(
      request.email,
      request.latitude,
      request.longitude,
    );
  }
}
