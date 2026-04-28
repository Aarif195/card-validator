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
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div 
        className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-10 transition-all"
        style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px' }}
      >
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Card Validator</h1>
          <p className="text-sm text-gray-500 mt-2">Enter your card details for instant verification</p>
        </header>

        <form onSubmit={handleValidate} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Card Number
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="0000 0000 0000 0000"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg tracking-widest text-gray-800"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold hover:bg-black transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none curs"
          >
            {loading ? 'Processing...' : 'Verify Card'}
          </button>
        </form>

        {result && (
          <div className={`mt-8 p-4 rounded-xl border-l-4 animate-in fade-in slide-in-from-top-2 duration-300 ${
            result.isValid 
              ? 'bg-green-50 border-green-500 text-green-800' 
              : 'bg-red-50 border-red-500 text-red-800'
          }`}>
            <div className="flex items-center gap-3">
              <span className="text-lg">{result.isValid ? '✓' : '✕'}</span>
              <p className="font-medium">{result.message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;