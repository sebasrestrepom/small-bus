import { IsNumber, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestRide {
  @ApiProperty({
    type: 'string',
    description: 'The rider email',
    example: 'sebasrestrepom@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: 'number',
    description: 'The initial lalitude',
    example: 25.7617,
  })
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({
    type: 'number',
    description: 'The initial longitude',
    example: -80.1918,
  })
  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}
