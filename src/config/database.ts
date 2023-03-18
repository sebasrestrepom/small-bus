import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Rider } from '../entity/rider';
import { Driver } from '../entity/driver';
import { Ride } from '../entity/ride';
import { Payment } from '../entity/payment';
import { initial1679110693428 } from '../migrations/1679110693428-initial';
import { data1679110759406 } from '../migrations/1679110759406-data';
import { changeTypeField1679111306307 } from '../migrations/1679111306307-changeTypeField';
import { changeTypeValue1679117237636 } from '../migrations/1679117237636-changeTypeValue';

dotenv.config();

export const database = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Rider, Driver, Ride, Payment],
  migrations: [
    initial1679110693428,
    data1679110759406,
    changeTypeField1679111306307,
    changeTypeValue1679117237636,
  ],
  namingStrategy: new SnakeNamingStrategy(),
};
