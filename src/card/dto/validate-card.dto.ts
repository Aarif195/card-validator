import { IsNotEmpty, IsString, MinLength , MaxLength} from 'class-validator';

export class ValidateCardDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(13)
  @MaxLength(19)
  cardNumber!: string;
}