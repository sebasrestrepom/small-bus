import { Logger, Injectable } from '@nestjs/common';
import { Ride } from 'src/entity/ride';
import { Rider } from 'src/entity/rider';
import { TransactionResponseDto } from './dto/transaction-response.dto';
import { PaymentSourceResponseDto } from './dto/payment-source-response.dto';
import { AcceptanceTokenResponseDto } from './dto/acceptance-token-response.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PaymentProviderService {
  private readonly logger = new Logger(PaymentProviderService.name);

  constructor(private readonly httpService: HttpService) {}

  async transaction(
    ride: Ride,
    reference: string,
  ): Promise<TransactionResponseDto> {
    const url = `${process.env.PAYMENT_BASE_URL}/transactions`;
    const data = {
      amount_in_cents: ride.value * 100,
      currency: 'COP',
      customer_email: ride.rider.email,
      reference: reference,
      payment_source_id: ride.rider.paymentSourceId,
      payment_method: {
        installments: 1,
      },
    };

    const response = await this.httpService
      .post<TransactionResponseDto>(url, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.PAYMENT_PRIVATE_TOKEN}`,
        },
      })
      .toPromise();

    return response.data;
  }

  async acceptanceToken(): Promise<AcceptanceTokenResponseDto> {
    const url = `${process.env.PAYMENT_BASE_URL}/merchants/${process.env.PAYMENT_PUBLIC_TOKEN}`;

    const response = await this.httpService
      .get<AcceptanceTokenResponseDto>(url)
      .toPromise();

    return response.data;
  }

  async paymentSource(
    rider: Rider,
    cardToken: string,
    acceptanceToken,
  ): Promise<PaymentSourceResponseDto> {
    const url = `${process.env.PAYMENT_BASE_URL}/payment_sources`;
    const data = {
      type: 'CARD',
      token: cardToken,
      customer_email: rider.email,
      acceptance_token: acceptanceToken,
    };

    const response = await this.httpService
      .post<PaymentSourceResponseDto>(url, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.PAYMENT_PRIVATE_TOKEN}`,
        },
      })
      .toPromise();

    return response.data;
  }
}
