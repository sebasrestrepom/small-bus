import { Controller, Post, Body } from '@nestjs/common';
import { RideService } from 'src/service/ride.service';
import { RequestRide } from './dto/requestRide.dto';
import { FinishRide } from './dto/finishRide.dto';
import { Ride } from 'src/entity/ride';
import { Position } from 'src/entity/position';

@Controller('/api/ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post('/request-ride')
  async requestRide(@Body() request: RequestRide): Promise<Ride> {
    console.log('estos son los datos', request);
    return await this.rideService.requestRide(
      request.email,
      new Position(request.latitude, request.longitude),
    );
  }

  @Post('/finish-ride')
  async finishRide(@Body() request: FinishRide): Promise<Ride> {
    console.log('estos son los datos', request);
    return await this.rideService.finishRide(
      request.id,
      new Position(request.latitude, request.longitude),
    );
  }
}
