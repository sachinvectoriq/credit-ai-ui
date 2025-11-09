// src/shared/components/data-display/LoadingSpinner.tsx

import { cn } from '@/shared/utils/cn';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

export function LoadingSpinner({
  size = 'md',
  text,
  fullScreen = false,
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };
  
  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };
  
  const spinner = (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <Loader2 className={cn('animate-spin text-primary-600', sizeClasses[size])} />
      {text && (
        <p className={cn('text-slate-600 font-medium', textSizeClasses[size])}>
          {text}
        </p>
      )}
    </div>
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }
  
  return spinner;
}

// Card loading skeleton
export function LoadingSkeleton({ 
  rows = 5,
  className 
}: { 
  rows?: number;
  className?: string;
}) {
  return (
    <div className={cn('card space-y-3 animate-pulse', className)}>
      {Array.from({ length: rows }).map((_, idx) => (
        <div 
          key={idx}
          className="h-4 bg-slate-200 rounded"
          style={{ width: `${Math.random() * 40 + 60}%` }}
        />
      ))}
    </div>
  );
}

// Table loading skeleton
export function TableLoadingSkeleton({
  rows = 8,
  columns = 4,
  className,
}: {
  rows?: number;
  columns?: number;
  className?: string;
}) {
  return (
    <div className={cn('table-container', className)}>
      <table className="table">
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, idx) => (
              <th key={idx}>
                <div className="h-4 bg-slate-200 rounded animate-pulse" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIdx) => (
            <tr key={rowIdx}>
              {Array.from({ length: columns }).map((_, colIdx) => (
                <td key={colIdx}>
                  <div className="h-4 bg-slate-100 rounded animate-pulse" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}