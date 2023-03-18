import { Controller, Post, Body } from '@nestjs/common';
import { FinishRideService } from 'src/service/finish-ride.service';
import { FinishRide } from './dto/finish-ride.dto';
import { Ride } from 'src/entity/ride';
import { Position } from 'src/entity/position';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Ride Endpoints')
@Controller('/api/ride')
export class FinishRideController {
  constructor(private readonly finishRideService: FinishRideService) {}

  @Post('/finish-ride')
  @ApiOperation({ summary: 'Finish a ride' })
  async finishRide(@Body() request: FinishRide): Promise<Ride> {
    return await this.finishRideService.execute(
      request.id,
      new Position(request.latitude, request.longitude),
    );
  }
}
