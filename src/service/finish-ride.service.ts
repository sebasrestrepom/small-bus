import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from 'src/entity/position';
import { Repository } from 'typeorm';
import { Ride } from 'src/entity/ride';
import { Payment } from 'src/entity/payment';
import { PaymentProviderService } from 'src/provider/payment-provider.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FinishRideService {
  constructor(
    @InjectRepository(Ride)
    private rideRepository: Repository<Ride>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private paymentProviderService: PaymentProviderService,
  ) {}

  async execute(id: number, endPosition: Position): Promise<Ride> {
    const ride = await this.rideRepository.findOneById(id);
    const reference = uuidv4();

    ride.finishRide(endPosition);

    const transaction = await this.paymentProviderService.transaction(
      ride,
      reference,
    );

    let payment = new Payment(
      reference,
      transaction.data.id,
      transaction.data.status,
    );

    payment = await this.paymentRepository.save(payment);

    ride.payment = payment;

    return this.rideRepository.save(ride);
  }
}
