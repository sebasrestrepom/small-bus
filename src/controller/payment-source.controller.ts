import { Controller, Post, Body } from '@nestjs/common';
import { CreatePaymentSourceService } from 'src/service/create-payment-source.service';
import { RequestPaymentSource } from './dto/request-payment-source.dto';
import { Rider } from 'src/entity/rider';
import { ApiOperation, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('Ride Endpoints')
@Controller('/api/payment-source')
export class PaymentSourceController {
  constructor(
    private readonly createPaymentSourceService: CreatePaymentSourceService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new payment source' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    schema: {
      properties: {
        id: { type: 'number' },
        email: { type: 'string' },
        paymentSourceId: { type: 'number' },
      },
    },
  })
  async paymentSource(@Body() request: RequestPaymentSource): Promise<Rider> {
    return await this.createPaymentSourceService.execute(
      request.email,
      request.cardToken,
    );
  }
}
