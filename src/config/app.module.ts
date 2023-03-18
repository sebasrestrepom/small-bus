import { database } from './database';
import { Module, Logger, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestRideController } from '../controller/request-ride.controller';
import { FinishRideController } from '../controller/finish-ride.controller';
import { PaymentSourceController } from '../controller/payment-source.controller';
import { FinishRideService } from '../service/finish-ride.service';
import { RequestRideService } from '../service/request-ride.service';
import { CreatePaymentSourceService } from '../service/create-payment-source.service';
import { PaymentProviderService } from '../provider/payment-provider.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';

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
    TypeOrmModule.forFeature(database.entities),
    HttpModule,
  ],
  controllers: [
    PaymentSourceController,
    RequestRideController,
    FinishRideController,
  ],
  providers: [
    FinishRideService,
    RequestRideService,
    CreatePaymentSourceService,
    PaymentProviderService,
  ],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger('HttpService');

  constructor(private httpService: HttpService) {}

  onModuleInit() {
    this.httpService.axiosRef.interceptors.request.use((config) => {
      this.logger.log(
        `HTTP request: ${config.method.toUpperCase()} ${config.url}`,
      );
      return config;
    });

    this.httpService.axiosRef.interceptors.response.use(
      (response) => {
        this.logger.log(
          `HTTP response: ${response.status} ${response.statusText}`,
        );
        return response;
      },
      (error) => {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          this.logger.error(axiosError.response.data);
        } else {
          this.logger.error('Error:', axiosError.message);
        }
        throw error;
      },
    );
  }
}
