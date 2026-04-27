import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ValidateCardDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(13)
  cardNumber: string;
}