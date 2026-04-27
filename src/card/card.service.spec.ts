import { Test, TestingModule } from '@nestjs/testing';
import { CardService } from './card.service';

describe('CardService', () => {
  let service: CardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardService],
    }).compile();

    service = module.get<CardService>(CardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return isValid true for a valid Luhn number', () => {
    // Standard test card (Visa)
    const result = service.validateCardNumber('4242424242424242');
    expect(result.isValid).toBe(true);
  });

  it('should return isValid false for an invalid Luhn number', () => {
    const result = service.validateCardNumber('4242424242424241');
    expect(result.isValid).toBe(false);
  });

  it('should return isValid false for short card numbers', () => {
    const result = service.validateCardNumber('12345');
    expect(result.isValid).toBe(false);
    expect(result.message).toBe('Invalid card length');
  });
});