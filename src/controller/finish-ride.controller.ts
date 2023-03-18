import { Controller, Post, Body } from '@nestjs/common';
import { FinishRideService } from 'src/service/finish-ride.service';
import { FinishRide } from './dto/finish-ride.dto';
import { Ride } from 'src/entity/ride';
import { Position } from 'src/entity/position';
import { ApiOperation, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('Ride Endpoints')
@Controller('/api/ride')
export class FinishRideController {
  constructor(private readonly finishRideService: FinishRideService) {}

  @Post('/finish-ride')
  @ApiOperation({ summary: 'Finish a ride' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    schema: {
      properties: {
        id: { type: 'number' },
        startDate: { type: 'string' },
        endDate: { type: 'string' },
        value: { type: 'number' },
        startPosition: {
          type: 'object',
          properties: {
            latitude: { type: 'string' },
            longitude: { type: 'string' },
          },
        },
        endPosition: {
          type: 'object',
          properties: {
            latitude: { type: 'number' },
            longitude: { type: 'number' },
          },
        },
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
          },
        },
        rider: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            email: { type: 'string' },
            paymentSourceId: { type: 'string' },
          },
        },
        payment: {
          type: 'object',
          properties: {
            reference: { type: 'string' },
            paymentId: { type: 'string' },
            status: { type: 'string' },
            id: { type: 'number' },
          },
        },
      },
    },
  })
  async finishRide(@Body() request: FinishRide): Promise<Ride> {
    return await this.finishRideService.execute(
      request.id,
      new Position(request.latitude, request.longitude),
    );
  }
}
