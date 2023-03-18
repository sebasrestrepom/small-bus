import { Controller, Post, Body } from '@nestjs/common';
import { RequestRideService } from 'src/service/request-ride.service';
import { RequestRide } from './dto/request-ride.dto';
import { Ride } from 'src/entity/ride';
import { Position } from 'src/entity/position';
import { ApiOperation, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('Ride Endpoints')
@Controller('/api/ride')
export class RequestRideController {
  constructor(private readonly requestRideService: RequestRideService) {}

  @Post('/request-ride')
  @ApiOperation({ summary: 'Request a new ride' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    schema: {
      properties: {
        driver: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            position: {
              type: 'object',
              properties: {
                latitude: { type: 'string' },
                longitude: { type: 'string' },
              },
            },
            distance: { type: 'number' },
          },
        },
        rider: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            email: { type: 'string' },
            paymentSourceId: { type: 'string', nullable: true },
          },
        },
        startDate: { type: 'string' },
        startPosition: {
          type: 'object',
          properties: {
            latitude: { type: 'number' },
            longitude: { type: 'number' },
          },
        },
        endDate: { type: 'string', nullable: true },
        value: { type: 'number', nullable: true },
        endPosition: {
          type: 'object',
          properties: {
            latitude: { type: 'number', nullable: true },
            longitude: { type: 'number', nullable: true },
          },
        },
        id: { type: 'number' },
      },
    },
  })
  async requestRide(@Body() request: RequestRide): Promise<Ride> {
    return await this.requestRideService.execute(
      request.email,
      new Position(request.latitude, request.longitude),
    );
  }
}
