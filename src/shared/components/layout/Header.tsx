// src/shared/components/layout/Header.tsx

import { TrendingUp } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export function Header() {
  const { hasSubmitted, resetAnalysis } = useAppStore();
  
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600 to-blue-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Credit AI
              </h1>
              <p className="text-xs text-slate-600">
                Company Credit Rating & Analysis
              </p>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-4">
            {hasSubmitted && (
              <button
                onClick={resetAnalysis}
                className="btn btn-secondary text-sm"
              >
                New Analysis
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}