import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from 'src/entity/position';
import { Repository } from 'typeorm';
import { Rider } from '../entity/rider';
import { PaymentProviderService } from '../provider/payment-provider.service';

@Injectable()
export class CreatePaymentSourceService {
  constructor(
    @InjectRepository(Rider)
    private riderRepository: Repository<Rider>,
    private paymentProviderService: PaymentProviderService,
  ) {}

  async execute(email: string, cardToken: string): Promise<Rider> {
    const rider = await this.getOrCreateRider(email);

    const acceptanceToken = await this.paymentProviderService.acceptanceToken();
    const paymentSource = await this.paymentProviderService.paymentSource(
      rider,
      cardToken,
      acceptanceToken.data.presigned_acceptance.acceptance_token,
    );

    rider.paymentSourceId = paymentSource.data.id;

    return this.riderRepository.save(rider);
  }

  private async getOrCreateRider(email: string): Promise<Rider> {
    const rider = await this.riderRepository.findOne({
      where: {
        email,
      },
    });

    if (rider) {
      return rider;
    }

    const newRider = new Rider();
    newRider.email = email;

    return this.riderRepository.save(newRider);
  }
}
