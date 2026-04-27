import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class CardService {
  validateCardNumber(cardNumber: string) {
    // Check if input exists and is a string
    if (!cardNumber || typeof cardNumber !== 'string') {
      throw new BadRequestException('Card number must be a string');
    }

    // Remove spaces or dashes and check if it's numeric
    const sanitized = cardNumber.replace(/\D/g, '');
    
    // Check if it contains ONLY digits after removing separators
    if (!/^\d+$/.test(sanitized)) {
      return { isValid: false, message: 'Card number must contain only digits' };
    }

    // Check length (Standard cards are 13-19 digits)
    if (sanitized.length < 13 || sanitized.length > 19) {
      return { isValid: false, message: 'Invalid card length' };
    }

    // Luhn Algorithm Logic
    let sum = 0;
    let shouldDouble = false;

    // Loop through the string from right to left
    for (let i = sanitized.length - 1; i >= 0; i--) {
      let digit = parseInt(sanitized.charAt(i));

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    const isValid = sum % 10 === 0;

    return {
      isValid,
      message: isValid ? 'Card number is valid' : 'Card number is invalid',
    };
  }
}