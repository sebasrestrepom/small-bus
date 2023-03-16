import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RideController } from './controller/ride.controller';
import { RideService } from './service/ride.service';
import { Rider } from './model/rider';
import { Driver } from './model/driver';
import { Ride } from './model/ride';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5342,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Rider, Driver, Ride]),
  ],
  controllers: [RideController],
  providers: [RideService],
})
export class AppModule {}
