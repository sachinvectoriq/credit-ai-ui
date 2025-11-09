// src/features/ticker-input/components/TickerForm.tsx

import { useAppStore } from '@/store/useAppStore';
import { POPULAR_TICKERS } from '@/shared/utils/constants';
import { Search } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

export function TickerForm() {
  const { ticker, setTicker } = useAppStore();
  
  const handleTickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setTicker(value);
  };
  
  const handleQuickSelect = (selectedTicker: string) => {
    setTicker(selectedTicker);
  };
  
  return (
    <div className="space-y-4">
      {/* Input Field */}
      <div>
        <label htmlFor="ticker" className="block text-sm font-medium text-slate-700 mb-2">
          Stock Ticker Symbol *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            id="ticker"
            type="text"
            value={ticker}
            onChange={handleTickerChange}
            placeholder="e.g., AAPL, TSLA, MSFT"
            className="input pl-10 uppercase"
            maxLength={10}
            autoComplete="off"
          />
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Enter the ticker symbol of the company you want to analyze
        </p>
      </div>
      
      {/* Quick Select Buttons */}
      <div>
        <p className="text-xs font-medium text-slate-600 mb-2">
          Popular Tickers:
        </p>
        <div className="flex flex-wrap gap-2">
          {POPULAR_TICKERS.map((popularTicker) => (
            <button
              key={popularTicker}
              onClick={() => handleQuickSelect(popularTicker)}
              className={cn(
                'px-3 py-1.5 text-sm font-medium rounded-lg border transition-all',
                ticker === popularTicker
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-primary-500 hover:text-primary-600'
              )}
            >
              {popularTicker}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}