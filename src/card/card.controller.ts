import { Controller, Post, Body } from '@nestjs/common';
import { CardService } from './card.service';
import { ValidateCardDto } from './dto/validate-card.dto';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post('validate')
  validateCard(@Body() validateCardDto: ValidateCardDto) {
    return this.cardService.validateCardNumber(validateCardDto.cardNumber);
  }
}