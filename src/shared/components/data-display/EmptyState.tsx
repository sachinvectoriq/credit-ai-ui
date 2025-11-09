// src/shared/components/data-display/EmptyState.tsx

import { cn } from '@/shared/utils/cn';
import { FileSearch, TrendingUp, AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  icon?: 'search' | 'chart' | 'alert';
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon = 'search',
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  const Icon = {
    search: FileSearch,
    chart: TrendingUp,
    alert: AlertCircle,
  }[icon];
  
  return (
    <div className={cn(
      'card p-12 text-center flex flex-col items-center justify-center',
      className
    )}>
      <div className="rounded-full bg-slate-100 p-6 mb-4">
        <Icon className="w-12 h-12 text-slate-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-slate-900 mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-sm text-slate-600 max-w-md mb-6">
          {description}
        </p>
      )}
      
      {action && (
        <button
          onClick={action.onClick}
          className="btn btn-primary"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

// Specialized: No Analysis Data
export function NoAnalysisData() {
  return (
    <EmptyState
      icon="search"
      title="No Analysis Available"
      description="Enter a stock ticker and submit to see financial analysis data."
    />
  );
}

// Specialized: Error State
export function ErrorState({ 
  message,
  onRetry,
}: { 
  message: string;
  onRetry?: () => void;
}) {
  return (
    <EmptyState
      icon="alert"
      title="Something went wrong"
      description={message}
      action={onRetry ? {
        label: 'Try Again',
        onClick: onRetry,
      } : undefined}
    />
  );
}