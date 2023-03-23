import { Test } from '@nestjs/testing';
import { CreatePaymentSourceService } from './create-payment-source.service';
import { Rider } from '../entity/rider';
import { PaymentProviderService } from '../provider/payment-provider.service';

describe('CreatePaymentSourceService', () => {
  let createPaymentSourceService: CreatePaymentSourceService;

  const mockRiderRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockPaymentProviderService = {
    acceptanceToken: jest.fn(),
    paymentSource: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreatePaymentSourceService,
        { provide: 'RiderRepository', useValue: mockRiderRepository },
        {
          provide: PaymentProviderService,
          useValue: mockPaymentProviderService,
        },
      ],
    }).compile();

    createPaymentSourceService = moduleRef.get<CreatePaymentSourceService>(
      CreatePaymentSourceService,
    );
  });

  describe('execute', () => {
    const email = 'test@example.com';
    const cardToken = 'card_token';

    it('should create a new rider if the email does not exist', async () => {
      const dbRider = new Rider();
      dbRider.id = 1;
      dbRider.email = email;

      mockRiderRepository.findOne.mockResolvedValueOnce(undefined);
      mockRiderRepository.save.mockResolvedValueOnce(dbRider);

      mockPaymentProviderService.acceptanceToken.mockResolvedValueOnce({
        data: {
          presigned_acceptance: { acceptance_token: 'acceptance_token' },
        },
      });
      mockPaymentProviderService.paymentSource.mockResolvedValueOnce({
        data: { id: 'payment_source_id' },
      });

      await createPaymentSourceService.execute(email, cardToken);

      expect(mockRiderRepository.save.mock.calls[0][0]).toEqual(
        expect.objectContaining({
          email,
        }),
      );

      expect(mockRiderRepository.save.mock.calls[1][0]).toEqual(
        expect.objectContaining({
          id: 1,
          email,
          paymentSourceId: 'payment_source_id',
        }),
      );
      expect(mockRiderRepository.save).toHaveBeenCalledTimes(2);
    });
  });
});
