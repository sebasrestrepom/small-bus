import { Test } from '@nestjs/testing';
import { RequestRideService } from './request-ride.service';
import { Driver } from '../entity/driver';
import { Ride } from '../entity/ride';
import { Rider } from '../entity/rider';
import { Repository } from 'typeorm';

describe('RequestRideService', () => {
  let requestRideService: RequestRideService;
  let rideRepository: Repository<Ride>;

  const mockRideRepository = {
    save: jest.fn(),
  };

  const mockDriverRepository = {
    find: jest.fn(),
  };

  const mockRiderRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        RequestRideService,
        { provide: 'RideRepository', useValue: mockRideRepository },
        { provide: 'DriverRepository', useValue: mockDriverRepository },
        { provide: 'RiderRepository', useValue: mockRiderRepository },
      ],
    }).compile();

    requestRideService = moduleRef.get<RequestRideService>(RequestRideService);
    rideRepository = moduleRef.get('RideRepository');
  });

  describe('create a ride method', () => {
    it('should create a new ride', async () => {
      const email = 'test@example.com';
      const startPosition = { latitude: 37.7749, longitude: -122.4194 };

      const rider = new Rider();
      rider.id = 1;
      rider.email = email;

      const driver = new Driver();
      driver.id = 1;
      driver.position = { latitude: 37.7897, longitude: -122.4216 };

      jest
        .spyOn(requestRideService as any, 'getOrCreateRider')
        .mockResolvedValue(rider);
      jest
        .spyOn(requestRideService as any, 'getDriver')
        .mockResolvedValue(driver);

      const ride = new Ride();
      ride.driver = driver;
      ride.rider = rider;
      ride.startDate = expect.any(Date);
      ride.startPosition = startPosition;

      jest.spyOn(rideRepository, 'save').mockResolvedValue(ride);

      const result = await requestRideService.execute(email, startPosition);

      expect(result).toEqual(ride);
      expect(rideRepository.save).toHaveBeenCalledWith(ride);
    });
  });
});
