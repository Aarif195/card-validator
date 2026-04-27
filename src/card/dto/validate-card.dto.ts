// import { IsString, IsNotEmpty } from 'class-validator';

import { IsString, IsNotEmpty } from '@nestjs/class-validator';

export class ValidateCardDto {
  @IsString()
  @IsNotEmpty()
  cardNumber!: string;
}