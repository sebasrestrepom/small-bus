import { IsNumber, IsEmail, IsNotEmpty } from 'class-validator';

export class RequestRide {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNumber()
  @IsNotEmpty()
  latitude: number;
  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}
