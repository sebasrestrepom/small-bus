import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class FinishRide {
  @ApiProperty({
    type: 'number',
    description: 'The id of the ride',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: 'number',
    description: 'The end latitude',
    example: 90.7617,
  })
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({
    type: 'number',
    description: 'The end longitude',
    example: -30.1918,
  })
  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}
