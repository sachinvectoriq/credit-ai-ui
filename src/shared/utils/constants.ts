// src/shared/utils/constants.ts

import type { AnalysisTab } from '../../types/financial.types';

/**
 * Analysis tabs configuration
 */
export const ANALYSIS_TABS: { id: AnalysisTab; label: string; icon?: string }[] = [
  {
    id: 'financial-statements',
    label: 'Financial Statements',
    icon: 'FileText',
  },
  {
    id: 'risk-analysis',
    label: 'Risk Analysis',
    icon: 'AlertTriangle',
  },
  {
    id: 'liquidity',
    label: 'Liquidity',
    icon: 'Droplets',
  },
  {
    id: 'profitability',
    label: 'Profitability',
    icon: 'TrendingUp',
  },
  {
    id: 'cash-flow',
    label: 'Cash Flow',
    icon: 'DollarSign',
  },
  {
    id: 'account-overview',
    label: 'Account Overview',
    icon: 'FileBarChart',
  },
  {
    id: 'ai-recommendation',
    label: 'AI Recommendation',
    icon: 'Sparkles',
  },
];

/**
 * Financial statement tabs
 */
export const FINANCIAL_STATEMENT_TABS = [
  { id: 'balance-sheet', label: 'Balance Sheet' },
  { id: 'income-statement', label: 'Income Statement' },
  { id: 'cash-flow-statement', label: 'Cash Flow Statement' },
] as const;

/**
 * Data source options
 */
export const DATA_SOURCE_OPTIONS = [
  {
    value: 'auto',
    label: 'Auto-fetch from SEC',
    description: 'Automatically fetch the latest 10-Q filing',
  },
  {
    value: 'upload',
    label: 'Upload Custom File',
    description: 'Upload your own financial data file',
  },
] as const;

/**
 * Accepted file types for upload
 */
export const ACCEPTED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  'text/csv': ['.csv'],
};

/**
 * Maximum file size (in bytes)
 */
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * Popular ticker symbols for suggestions
 */
export const POPULAR_TICKERS = [
  'AAPL',
  'MSFT',
  'GOOGL',
  'AMZN',
  'TSLA',
  'META',
  'NVDA',
  'NFLX',
];

/**
 * Credit rating grades
 */
export const CREDIT_RATINGS = [
  'AAA',
  'AA+',
  'AA',
  'AA-',
  'A+',
  'A',
  'A-',
  'BBB+',
  'BBB',
  'BBB-',
  'BB+',
  'BB',
  'BB-',
  'B+',
  'B',
  'B-',
  'CCC+',
  'CCC',
  'CCC-',
  'CC',
  'C',
  'D',
] as const;

/**
 * Color palette
 */
export const COLORS = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#1e40af',
    700: '#1e3a8a',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    600: '#059669',
    700: '#047857',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    600: '#d97706',
    700: '#b45309',
  },
  danger: {
    50: '#fef2f2',
    100: '#fee2e2',
    600: '#dc2626',
    700: '#b91c1c',
  },
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    600: '#475569',
    700: '#334155',
  },
} as const;

/**
 * Animation durations (in milliseconds)
 */
export const ANIMATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

/**
 * Breakpoints for responsive design
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/**
 * API endpoints (for future use)
 */
export const API_ENDPOINTS = {
  ANALYSIS: '/api/analysis',
  VALIDATE_TICKER: '/api/validate-ticker',
  UPLOAD_FILE: '/api/upload',
} as const;

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  RECENT_TICKERS: 'recent_tickers',
  USER_PREFERENCES: 'user_preferences',
} as const;