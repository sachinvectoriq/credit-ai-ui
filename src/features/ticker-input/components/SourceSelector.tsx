// src/features/ticker-input/components/SourceSelector.tsx

import { useAppStore } from '@/store/useAppStore';
import { DATA_SOURCE_OPTIONS } from '@/shared/utils/constants';
import { cn } from '@/shared/utils/cn';
import { Globe, Upload } from 'lucide-react';

export function SourceSelector() {
  const { source, setSource } = useAppStore();
  
  const icons = {
    auto: Globe,
    upload: Upload,
  };
  
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-700">
        Data Source *
      </label>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {DATA_SOURCE_OPTIONS.map((option) => {
          const Icon = icons[option.value];
          const isSelected = source === option.value;
          
          return (
            <button
              key={option.value}
              onClick={() => setSource(option.value)}
              className={cn(
                'relative rounded-lg border-2 p-4 text-left transition-all',
                'hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500',
                isSelected
                  ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-500'
                  : 'border-slate-200 bg-white'
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  'rounded-lg p-2',
                  isSelected ? 'bg-primary-100' : 'bg-slate-100'
                )}>
                  <Icon className={cn(
                    'w-5 h-5',
                    isSelected ? 'text-primary-600' : 'text-slate-600'
                  )} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      'font-medium',
                      isSelected ? 'text-primary-900' : 'text-slate-900'
                    )}>
                      {option.label}
                    </span>
                    {isSelected && (
                      <span className="flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                      </span>
                    )}
                  </div>
                  <p className={cn(
                    'text-sm mt-1',
                    isSelected ? 'text-primary-700' : 'text-slate-600'
                  )}>
                    {option.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}