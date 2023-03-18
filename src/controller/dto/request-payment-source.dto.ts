import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestPaymentSource {
  @ApiProperty({
    type: 'string',
    description: 'The rider email',
    example: 'sebasrestrepom@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'The card token',
    example: 'tok_test_38849_9B4363557a30Fbd65c199Df385f7C67f',
  })
  @IsNotEmpty()
  cardToken: string;
}
