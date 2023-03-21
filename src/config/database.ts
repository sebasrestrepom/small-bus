import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Rider } from '../entity/rider';
import { Driver } from '../entity/driver';
import { Ride } from '../entity/ride';
import { Payment } from '../entity/payment';
import { initial1679411740399 } from '../migrations/1679411740399-initial';
import { data1679412942234 } from '../migrations/1679412942234-data';

dotenv.config();

export const database = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Rider, Driver, Ride, Payment],
  migrations: [initial1679411740399, data1679412942234],
  namingStrategy: new SnakeNamingStrategy(),
};
