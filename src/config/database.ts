import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Rider } from '../entity/rider';
import { Driver } from '../entity/driver';
import { Ride } from '../entity/ride';
import { initial1679018605960 } from '../../migrations/1679018605960-initial';
import { data1679018630281 } from '../../migrations/1679018630281-data';
import { changeConstraints1679020119942 } from '../../migrations/1679020119942-changeConstraints';
import { changeConstraint21679020672024 } from '../../migrations/1679020672024-changeConstraint2';
import { changeIdConstraints1679021850593 } from '../../migrations/1679021850593-changeIdConstraints';
import { changeValueType1679023812388 } from '../../migrations/1679023812388-changeValueType';
dotenv.config();

export const database = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Rider, Driver, Ride],
  migrations: [
    initial1679018605960,
    data1679018630281,
    changeConstraints1679020119942,
    changeConstraint21679020672024,
    changeIdConstraints1679021850593,
    changeValueType1679023812388,
  ],
  namingStrategy: new SnakeNamingStrategy(),
};
