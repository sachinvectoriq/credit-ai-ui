// src/shared/components/data-display/MetricCard.tsx

import type { Metric } from '@/types/financial.types';
import { formatValue, getStatusColor, getStatusBgColor } from '@/shared/utils/formatters';
import { cn } from '@/shared/utils/cn';
import { TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react';

interface MetricCardProps {
  metric: Metric;
  showBenchmark?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function MetricCard({ 
  metric, 
  showBenchmark = false,
  size = 'md',
  className 
}: MetricCardProps) {
  const { name, value, unit, status, description, benchmark } = metric;
  
  // Determine if value is above or below benchmark
  const isAboveBenchmark = benchmark !== undefined && value > benchmark;
  const isBelowBenchmark = benchmark !== undefined && value < benchmark;
  
  // Size classes
  const sizeClasses = {
    sm: {
      container: 'p-3',
      label: 'text-xs',
      value: 'text-lg',
      icon: 'w-4 h-4',
    },
    md: {
      container: 'p-4',
      label: 'text-sm',
      value: 'text-2xl',
      icon: 'w-5 h-5',
    },
    lg: {
      container: 'p-6',
      label: 'text-base',
      value: 'text-3xl',
      icon: 'w-6 h-6',
    },
  };
  
  const sizes = sizeClasses[size];
  
  return (
    <div className={cn('card', sizes.container, className)}>
      {/* Header with status indicator */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <p className={cn('metric-label', sizes.label, 'text-slate-600')}>
            {name}
          </p>
          {description && size !== 'sm' && (
            <p className="text-xs text-slate-500 mt-1">{description}</p>
          )}
        </div>
        
        {status && (
          <div className={cn(
            'rounded-full p-1.5',
            getStatusBgColor(status)
          )}>
            {status === 'good' && <TrendingUp className={cn(sizes.icon, 'text-green-600')} />}
            {status === 'danger' && <TrendingDown className={cn(sizes.icon, 'text-red-600')} />}
            {status === 'warning' && <AlertCircle className={cn(sizes.icon, 'text-amber-600')} />}
            {status === 'neutral' && <Minus className={cn(sizes.icon, 'text-slate-600')} />}
          </div>
        )}
      </div>
      
      {/* Value */}
      <div className={cn(
        'metric-value font-bold font-mono',
        sizes.value,
        status && getStatusColor(status)
      )}>
        {formatValue(value, unit)}
      </div>
      
      {/* Benchmark comparison */}
      {showBenchmark && benchmark !== undefined && (
        <div className="mt-2 pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">Benchmark:</span>
            <span className="font-mono font-medium text-slate-700">
              {formatValue(benchmark, unit)}
            </span>
          </div>
          
          <div className={cn(
            'mt-1 text-xs font-medium',
            isAboveBenchmark && 'text-green-600',
            isBelowBenchmark && 'text-red-600'
          )}>
            {isAboveBenchmark && '↑ Above benchmark'}
            {isBelowBenchmark && '↓ Below benchmark'}
            {!isAboveBenchmark && !isBelowBenchmark && '= At benchmark'}
          </div>
        </div>
      )}
    </div>
  );
}

// Group of metrics
interface MetricGroupProps {
  title: string;
  description?: string;
  metrics: Metric[];
  columns?: 2 | 3 | 4;
  showBenchmarks?: boolean;
  className?: string;
}

export function MetricGroup({
  title,
  description,
  metrics,
  columns = 3,
  showBenchmarks = false,
  className,
}: MetricGroupProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };
  
  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      <div>
        <h3 className="section-subheader">{title}</h3>
        {description && (
          <p className="text-sm text-slate-600 mt-1">{description}</p>
        )}
      </div>
      
      {/* Metrics grid */}
      <div className={cn('grid gap-4', gridCols[columns])}>
        {metrics.map((metric, idx) => (
          <MetricCard 
            key={idx} 
            metric={metric}
            showBenchmark={showBenchmarks}
          />
        ))}
      </div>
    </div>
  );
}