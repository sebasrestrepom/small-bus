import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Ride } from '../entity/ride';
import { Rider } from '../entity/rider';
import { Driver } from '../entity/driver';
import { Payment } from '../entity/payment';
import { PaymentProviderService } from '../provider/payment-provider.service';
import { FinishRideService } from './finish-ride.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('FinishRideService', () => {
  let service: FinishRideService;
  let rideRepository: Repository<Ride>;
  let paymentRepository: Repository<Payment>;
  let paymentProviderService: PaymentProviderService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FinishRideService,
        {
          provide: getRepositoryToken(Ride),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Payment),
          useClass: Repository,
        },
        {
          provide: PaymentProviderService,
          useValue: {
            transaction: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<FinishRideService>(FinishRideService);
    rideRepository = moduleRef.get<Repository<Ride>>(getRepositoryToken(Ride));
    paymentRepository = moduleRef.get<Repository<Payment>>(
      getRepositoryToken(Payment),
    );
    paymentProviderService = moduleRef.get<PaymentProviderService>(
      PaymentProviderService,
    );
  });

  describe('execute', () => {
    it('should finish the ride, create a payment and return the updated ride', async () => {
      const ride = new Ride();
      ride.id = 1;
      ride.startDate = new Date('2023-03-22T00:00:00.000Z');
      ride.startPosition = { latitude: 0, longitude: 0 };
      ride.driver = new Driver();
      ride.rider = new Rider();
      const spyFindOneById = jest
        .spyOn(rideRepository, 'findOneById')
        .mockResolvedValueOnce(ride);
      const spySaveRide = jest
        .spyOn(rideRepository, 'save')
        .mockResolvedValueOnce(ride);

      const endPosition = { latitude: 1, longitude: 1 };
      const reference = '1234-5678';
      const transaction = { data: { id: 'transaction-id', status: 'paid' } };
      const spyTransaction = jest
        .spyOn(paymentProviderService, 'transaction')
        .mockResolvedValueOnce(transaction);

      const payment = new Payment(
        reference,
        transaction.data.id,
        transaction.data.status,
      );
      payment.id = 1;
      const spySavePayment = jest
        .spyOn(paymentRepository, 'save')
        .mockResolvedValueOnce(payment);

      const result = await service.execute(ride.id, endPosition);

      expect(spyFindOneById).toHaveBeenCalledWith(ride.id);
      expect(spySaveRide).toHaveBeenCalledWith(ride);
      expect(spyTransaction).toHaveBeenCalledWith(ride, reference);
      expect(spySavePayment).toHaveBeenCalledWith(payment);
      expect(result).toEqual(ride);
      expect(result.endDate).toEqual(expect.any(Date));
      expect(result.endPosition).toEqual(endPosition);
      expect(result.payment).toEqual(payment);
    });
  });
});
