import { Test, TestingModule } from '@nestjs/testing';
import { RideService } from './ride.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ride } from '../model/ride';
import { Driver } from '../model/driver';
import { Rider } from '../model/rider';
import { Repository } from 'typeorm';

describe('RideService', () => {
  let rideService: RideService;
  let rideRepository: MockType<Repository<Ride>>;
  let driverRepository: MockType<Repository<Driver>>;
  let riderRepository: MockType<Repository<Rider>>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        RideService,
        {
          provide: getRepositoryToken(Ride),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Driver),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Rider),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    rideService = app.get<RideService>(RideService);
    rideRepository = app.get(getRepositoryToken(Ride));
    driverRepository = app.get(getRepositoryToken(Driver));
    riderRepository = app.get(getRepositoryToken(Rider));
  });

  describe('requestRide', () => {
    it('should request a new ride', async () => {
      const rider = new Rider();
      rider.id = 23;
      rider.email = 'jhon@gmail.com';
      riderRepository.findOne.mockReturnValue(Promise.resolve(rider));

      const drivers = [];

      let driver = new Driver();
      driver.id = 89;
      driver.firstName = 'Jose';
      driver.lastName = 'Doe';
      driver.latitude = 8;
      driver.longitude = 10;

      drivers.push(driver);

      driver = new Driver();
      driver.id = 90;
      driver.firstName = 'Camilo';
      driver.lastName = 'Perez';
      driver.latitude = 1;
      driver.longitude = 3;
      drivers.push(driver);

      driverRepository.find.mockReturnValue(Promise.resolve(drivers));

      await rideService.requestRide('jhon@gmail.com', 1, 2, 3, 4);

      expect(rideRepository.save).toHaveBeenCalledWith({});
    });
  });
});

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    save: jest.fn((entity) => entity),
    find: jest.fn(() => []),
  }),
);
