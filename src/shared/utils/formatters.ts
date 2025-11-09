// src/shared/utils/formatters.ts

/**
 * Format number as currency
 */
export const formatCurrency = (
  value: number | null | undefined,
  options: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    compact?: boolean;
  } = {}
): string => {
  if (value === null || value === undefined) return 'N/A';

  const { minimumFractionDigits = 0, maximumFractionDigits = 2, compact = false } = options;

  if (compact) {
    const absValue = Math.abs(value);
    if (absValue >= 1e12) {
      return `$${(value / 1e12).toFixed(2)}T`;
    }
    if (absValue >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`;
    }
    if (absValue >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`;
    }
    if (absValue >= 1e3) {
      return `$${(value / 1e3).toFixed(2)}K`;
    }
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
};

/**
 * Format number as percentage
 */
export const formatPercentage = (
  value: number | null | undefined,
  options: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    showSign?: boolean;
  } = {}
): string => {
  if (value === null || value === undefined) return 'N/A';

  const { minimumFractionDigits = 1, maximumFractionDigits = 2, showSign = false } = options;

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value / 100);

  if (showSign && value > 0) {
    return `+${formatted}`;
  }

  return formatted;
};

/**
 * Format number with commas
 */
export const formatNumber = (
  value: number | null | undefined,
  options: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    showSign?: boolean;
  } = {}
): string => {
  if (value === null || value === undefined) return 'N/A';

  const { minimumFractionDigits = 0, maximumFractionDigits = 2, showSign = false } = options;

  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);

  if (showSign && value > 0) {
    return `+${formatted}`;
  }

  return formatted;
};

/**
 * Format date
 */
export const formatDate = (
  date: string | Date,
  options: {
    format?: 'short' | 'medium' | 'long';
  } = {}
): string => {
  const { format = 'medium' } = options;
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (format === 'short') {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      year: 'numeric',
    }).format(dateObj);
  }

  if (format === 'long') {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(dateObj);
  }

  // medium (default)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(dateObj);
};

/**
 * Format ratio
 */
export const formatRatio = (
  value: number | null | undefined,
  options: {
    decimals?: number;
    suffix?: string;
  } = {}
): string => {
  if (value === null || value === undefined) return 'N/A';

  const { decimals = 2, suffix = 'x' } = options;

  return `${value.toFixed(decimals)}${suffix}`;
};

/**
 * Get color class based on status
 */
export const getStatusColor = (
  status: 'good' | 'warning' | 'danger' | 'neutral' | undefined
): string => {
  switch (status) {
    case 'good':
      return 'text-green-600';
    case 'warning':
      return 'text-amber-600';
    case 'danger':
      return 'text-red-600';
    case 'neutral':
    default:
      return 'text-slate-600';
  }
};

/**
 * Get background color class based on status
 */
export const getStatusBgColor = (
  status: 'good' | 'warning' | 'danger' | 'neutral' | undefined
): string => {
  switch (status) {
    case 'good':
      return 'bg-green-50';
    case 'warning':
      return 'bg-amber-50';
    case 'danger':
      return 'bg-red-50';
    case 'neutral':
    default:
      return 'bg-slate-50';
  }
};

/**
 * Get badge color classes based on status
 */
export const getStatusBadgeClasses = (
  status: 'good' | 'warning' | 'danger' | 'neutral' | undefined
): string => {
  switch (status) {
    case 'good':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'warning':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'danger':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'neutral':
    default:
      return 'bg-slate-100 text-slate-800 border-slate-200';
  }
};

/**
 * Format value based on type
 */
export const formatValue = (
  value: any,
  type?: 'currency' | 'percentage' | 'number' | 'text' | 'ratio'
): string => {
  if (value === null || value === undefined) return 'N/A';

  switch (type) {
    case 'currency':
      return formatCurrency(value);
    case 'percentage':
      return formatPercentage(value);
    case 'number':
      return formatNumber(value);
    case 'ratio':
      return formatRatio(value);
    case 'text':
    default:
      return String(value);
  }
};

/**
 * Get credit rating color
 */
export const getRatingColor = (rating: string): string => {
  const upperRating = rating.toUpperCase();
  
  if (upperRating.startsWith('AAA') || upperRating.startsWith('AA')) {
    return 'text-green-600';
  }
  if (upperRating.startsWith('A')) {
    return 'text-blue-600';
  }
  if (upperRating.startsWith('BBB')) {
    return 'text-yellow-600';
  }
  if (upperRating.startsWith('BB') || upperRating.startsWith('B')) {
    return 'text-orange-600';
  }
  return 'text-red-600';
};

/**
 * Get trend arrow icon
 */
export const getTrendIcon = (direction: 'up' | 'down' | 'stable'): string => {
  switch (direction) {
    case 'up':
      return '↑';
    case 'down':
      return '↓';
    case 'stable':
      return '→';
  }
};

/**
 * Get trend color
 */
export const getTrendColor = (
  direction: 'up' | 'down' | 'stable',
  inverse: boolean = false
): string => {
  if (direction === 'stable') return 'text-slate-600';
  
  if (inverse) {
    return direction === 'up' ? 'text-red-600' : 'text-green-600';
  }
  
  return direction === 'up' ? 'text-green-600' : 'text-red-600';
};