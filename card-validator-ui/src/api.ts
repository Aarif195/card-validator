const API_URL = 'https://card-validator-s6nz.onrender.com';

export const validateCard = async (cardNumber: string) => {
  const response = await fetch(`${API_URL}/cards/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cardNumber }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Validation failed');
  }

  return response.json();
};