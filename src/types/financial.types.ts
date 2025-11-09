// src/types/financial.types.ts

/**
 * Core Financial Data Types
 */

export interface Company {
  ticker: string;
  name: string;
  sector: string;
  industry: string;
  marketCap?: number;
}

export interface Period {
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  year: number;
  endDate: string; // ISO date string
}

/**
 * Table Data Structure (Reusable for all financial tables)
 */
export interface TableColumn {
  key: string;
  header: string;
  type?: 'currency' | 'percentage' | 'number' | 'text'  | 'ratio';
  formatter?: (value: any) => string;
}

export interface TableRow {
  [key: string]: string | number | null;
}

export interface TableData {
  columns: TableColumn[];
  rows: TableRow[];
  metadata?: {
    period: Period;
    currency?: string;
    unit?: string; // 'thousands', 'millions', 'billions'
  };
}

/**
 * Financial Statements
 */
export interface BalanceSheet {
  assets: {
    current: TableData;
    nonCurrent: TableData;
    total: number;
  };
  liabilities: {
    current: TableData;
    nonCurrent: TableData;
    total: number;
  };
  equity: TableData;
}

export interface IncomeStatement extends TableData {
  summary: {
    revenue: number;
    netIncome: number;
    eps: number;
  };
}

export interface CashFlowStatement {
  operating: TableData;
  investing: TableData;
  financing: TableData;
  summary: {
    netCashFlow: number;
    freeCashFlow: number;
  };
}

export interface FinancialStatements {
  balanceSheet: BalanceSheet;
  incomeStatement: IncomeStatement;
  cashFlowStatement: CashFlowStatement;
}

/**
 * Analysis Metrics
 */
export interface Metric {
  name: string;
  value: number;
  unit?: 'currency' | 'percentage' | 'ratio' | 'number';
  status?: 'good' | 'warning' | 'danger' | 'neutral';
  description?: string;
  benchmark?: number; // Industry average or threshold
}

export interface MetricGroup {
  title: string;
  description?: string;
  metrics: Metric[];
}

/**
 * Risk Analysis
 */
export interface RiskAnalysis {
  overallScore: number; // 0-100
  rating: 'AAA' | 'AA' | 'A' | 'BBB' | 'BB' | 'B' | 'CCC' | 'CC' | 'C' | 'D';
  categories: {
    creditRisk: MetricGroup;
    marketRisk: MetricGroup;
    operationalRisk: MetricGroup;
    financialRisk: MetricGroup;
  };
  summary: string;
  recommendations: string[];
}

/**
 * Liquidity Analysis
 */
export interface LiquidityAnalysis {
  ratios: MetricGroup;
  workingCapital: {
    current: number;
    trend: 'improving' | 'stable' | 'declining';
    data: TableData;
  };
  cashPosition: {
    available: number;
    burnRate?: number;
    runway?: number; // months
  };
  summary: string;
}

/**
 * Profitability Analysis
 */
export interface ProfitabilityAnalysis {
  margins: MetricGroup;
  returns: MetricGroup;
  trends: {
    revenue: TrendData;
    netIncome: TrendData;
  };
  comparison: TableData; // Compare with industry/competitors
  summary: string;
}

export interface TrendData {
  current: number;
  previous: number;
  change: number;
  changePercent: number;
  direction: 'up' | 'down' | 'stable';
}

/**
 * Cash Flow Analysis
 */
export interface CashFlowAnalysis {
  metrics: MetricGroup;
  breakdown: TableData;
  visualization: {
    operating: number[];
    investing: number[];
    financing: number[];
    periods: string[];
  };
  summary: string;
}

/**
 * Account Overview
 */
export interface AccountOverview {
  accountsReceivable: {
    current: number;
    aging: TableData;
    dso: number; // Days Sales Outstanding
  };
  accountsPayable: {
    current: number;
    aging: TableData;
    dpo: number; // Days Payable Outstanding
  };
  inventory: {
    current: number;
    turnover: number;
    daysOnHand: number;
  };
  summary: string;
}

/**
 * AI Recommendation
 */
export interface AIRecommendation {
  overallAssessment: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  actionItems: {
    priority: 'high' | 'medium' | 'low';
    category: string;
    recommendation: string;
    impact: string;
  }[];
  creditDecision: {
    approved: boolean;
    rating: string;
    terms?: string;
    conditions?: string[];
  };
}

/**
 * Main Analysis Response
 */
export interface AnalysisData {
  company: Company;
  period: Period;
  financialStatements: FinancialStatements;
  riskAnalysis: RiskAnalysis;
  liquidityAnalysis: LiquidityAnalysis;
  profitabilityAnalysis: ProfitabilityAnalysis;
  cashFlowAnalysis: CashFlowAnalysis;
  accountOverview: AccountOverview;
  aiRecommendation: AIRecommendation;
  metadata: {
    analyzedAt: string; // ISO timestamp
    dataSource: 'sec' | 'upload';
    filingType: string;
  };
}

/**
 * API Request/Response Types
 */
export interface AnalysisRequest {
  ticker: string;
  source: 'auto' | 'upload';
  files?: File[];
  period?: {
    quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
    year: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

/**
 * UI State Types
 */
export type AnalysisTab = 
  | 'financial-statements'
  | 'risk-analysis'
  | 'liquidity'
  | 'profitability'
  | 'cash-flow'
  | 'account-overview'
  | 'ai-recommendation';

export type FinancialStatementTab = 
  | 'balance-sheet'
  | 'income-statement'
  | 'cash-flow-statement';

export interface UIState {
  activeTab: AnalysisTab;
  activeFinancialTab: FinancialStatementTab;
  isLoading: boolean;
  error: string | null;
}