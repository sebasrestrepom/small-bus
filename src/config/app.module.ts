import { database } from './database';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RideController } from '../controller/ride.controller';
import { RideService } from '../service/ride.service';
import { Rider } from '../entity/rider';
import { Driver } from '../entity/driver';
import { Ride } from '../entity/ride';
import { PaymentService } from '../service/payment.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: database.host,
      port: +database.port,
      username: database.username,
      password: database.password,
      database: database.database,
      entities: database.entities,
      namingStrategy: database.namingStrategy,
    }),
    TypeOrmModule.forFeature([Rider, Driver, Ride]),
  ],
  controllers: [RideController],
  providers: [RideService, PaymentService],
})
export class AppModule {}
