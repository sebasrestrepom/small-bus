import { Controller, Post, Body } from '@nestjs/common';
import { RequestRideService } from 'src/service/request-ride.service';
import { RequestRide } from './dto/request-ride.dto';
import { Ride } from 'src/entity/ride';
import { Position } from 'src/entity/position';
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Ride Endpoints')
@Controller('/api/ride')
export class RequestRideController {
  constructor(private readonly requestRideService: RequestRideService) {}

  @Post('/request-ride')
  @ApiOperation({ summary: 'Request a new ride' })
  async requestRide(@Body() request: RequestRide): Promise<Ride> {
    return await this.requestRideService.execute(
      request.email,
      new Position(request.latitude, request.longitude),
    );
  }
}
