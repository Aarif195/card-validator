import { useState } from 'react';
import { validateCard } from './api';

function App() {
  const [cardNumber, setCardNumber] = useState('');
  const [result, setResult] = useState<{ isValid: boolean; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await validateCard(cardNumber);
      setResult(data);
    } catch (error: any) {
      setResult({ isValid: false, message: error.message || 'Server error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Card Validator</h1>
        
        <form onSubmit={handleValidate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="Enter card number..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300 cursor-pointer"
          >
            {loading ? 'Validating...' : 'Validate Card'}
          </button>
        </form>

        {result && (
          <div className={`mt-6 p-4 rounded-md text-center ${result.isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <p className="font-semibold">{result.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;