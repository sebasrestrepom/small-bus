import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestPaymentSource {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  cardToken: string;
}
