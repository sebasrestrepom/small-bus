import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Ride } from 'src/entity/ride';
import { TransactionResponseDto } from './dto/transactionResponse.dto';

@Injectable()
export class PaymentService {
  async transaction(ride: Ride): Promise<TransactionResponseDto> {
    const url = `${process.env.PAYMENT_BASE_URL}/transactions`;
    const data = {
      amount_in_cents: ride.value * 100000,
      currency: 'COP',
      customer_email: ride.rider.email,
      reference: uuidv4(),
      payment_source_id: 50732, // ID de la fuente de pago
    };

    console.log('Call', url);

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PAYMENT_PRIVATE_TOKEN}`,
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  }
}
