// src/shared/components/data-display/StatusBadge.tsx

import { cn } from '@/shared/utils/cn';
import { getStatusBadgeClasses, getRatingColor } from '@/shared/utils/formatters';
import { CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

type BadgeVariant = 'good' | 'warning' | 'danger' | 'neutral';
type BadgeSize = 'sm' | 'md' | 'lg';

interface StatusBadgeProps {
  status: BadgeVariant;
  label: string;
  icon?: boolean;
  size?: BadgeSize;
  className?: string;
}

export function StatusBadge({
  status,
  label,
  icon = true,
  size = 'md',
  className,
}: StatusBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  };
  
  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };
  
  const StatusIcon = {
    good: CheckCircle,
    warning: AlertTriangle,
    danger: AlertCircle,
    neutral: Info,
  }[status];
  
  return (
    <span 
      className={cn(
        'badge inline-flex items-center gap-1.5 font-medium',
        getStatusBadgeClasses(status),
        sizeClasses[size],
        className
      )}
    >
      {icon && <StatusIcon className={iconSizes[size]} />}
      {label}
    </span>
  );
}

// Credit Rating Badge (special variant)
interface RatingBadgeProps {
  rating: string;
  size?: BadgeSize;
  className?: string;
}

export function RatingBadge({ 
  rating, 
  size = 'md',
  className 
}: RatingBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-lg px-4 py-1.5',
  };
  
  return (
    <span 
      className={cn(
        'badge inline-flex items-center font-bold font-mono',
        'bg-slate-100 border-slate-300',
        getRatingColor(rating),
        sizeClasses[size],
        className
      )}
    >
      {rating}
    </span>
  );
}

// Trend Badge (for showing up/down trends)
interface TrendBadgeProps {
  direction: 'up' | 'down' | 'stable';
  value: number;
  label?: string;
  inverse?: boolean; // If true, up is bad and down is good
  size?: BadgeSize;
  className?: string;
}

export function TrendBadge({
  direction,
  value,
  label,
  inverse = false,
  size = 'md',
  className,
}: TrendBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  };
  
  // Determine color based on direction and inverse flag
  let colorClass = 'bg-slate-100 text-slate-700 border-slate-300';
  
  if (direction === 'up') {
    colorClass = inverse 
      ? 'bg-red-100 text-red-700 border-red-300'
      : 'bg-green-100 text-green-700 border-green-300';
  } else if (direction === 'down') {
    colorClass = inverse
      ? 'bg-green-100 text-green-700 border-green-300'
      : 'bg-red-100 text-red-700 border-red-300';
  }
  
  const arrow = {
    up: '↑',
    down: '↓',
    stable: '→',
  }[direction];
  
  return (
    <span 
      className={cn(
        'badge inline-flex items-center gap-1 font-medium',
        colorClass,
        sizeClasses[size],
        className
      )}
    >
      <span className="font-bold">{arrow}</span>
      <span className="font-mono">{Math.abs(value).toFixed(1)}%</span>
      {label && <span>{label}</span>}
    </span>
  );
}