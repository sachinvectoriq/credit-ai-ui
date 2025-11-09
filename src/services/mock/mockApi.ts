// src/services/mock/mockApi.ts

import type { AnalysisData, AnalysisRequest, ApiResponse } from '../../types/financial.types';

/**
 * Simulates API delay
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock Analysis Data Generator
 * This simulates what the real API would return
 */
const generateMockAnalysis = (ticker: string): AnalysisData => {
  const companyNames: Record<string, string> = {
    AAPL: 'Apple Inc.',
    TSLA: 'Tesla, Inc.',
    MSFT: 'Microsoft Corporation',
    GOOGL: 'Alphabet Inc.',
    AMZN: 'Amazon.com, Inc.',
  };

  return {
    company: {
      ticker: ticker.toUpperCase(),
      name: companyNames[ticker.toUpperCase()] || `${ticker.toUpperCase()} Corporation`,
      sector: 'Technology',
      industry: 'Consumer Electronics',
      marketCap: 2800000000000,
    },
    period: {
      quarter: 'Q3',
      year: 2024,
      endDate: '2024-09-30',
    },
    financialStatements: {
      balanceSheet: {
        assets: {
          current: {
            columns: [
              { key: 'item', header: 'Current Assets', type: 'text' },
              { key: 'amount', header: 'Amount ($M)', type: 'currency' },
            ],
            rows: [
              { item: 'Cash and Cash Equivalents', amount: 28000 },
              { item: 'Short-term Investments', amount: 32000 },
              { item: 'Accounts Receivable', amount: 18500 },
              { item: 'Inventory', amount: 6500 },
              { item: 'Other Current Assets', amount: 14200 },
            ],
            metadata: {
              period: { quarter: 'Q3', year: 2024, endDate: '2024-09-30' },
              currency: 'USD',
              unit: 'millions',
            },
          },
          nonCurrent: {
            columns: [
              { key: 'item', header: 'Non-Current Assets', type: 'text' },
              { key: 'amount', header: 'Amount ($M)', type: 'currency' },
            ],
            rows: [
              { item: 'Property, Plant & Equipment', amount: 42000 },
              { item: 'Intangible Assets', amount: 8500 },
              { item: 'Goodwill', amount: 12000 },
              { item: 'Long-term Investments', amount: 98000 },
              { item: 'Other Non-Current Assets', amount: 25000 },
            ],
            metadata: {
              period: { quarter: 'Q3', year: 2024, endDate: '2024-09-30' },
              currency: 'USD',
              unit: 'millions',
            },
          },
          total: 284700,
        },
        liabilities: {
          current: {
            columns: [
              { key: 'item', header: 'Current Liabilities', type: 'text' },
              { key: 'amount', header: 'Amount ($M)', type: 'currency' },
            ],
            rows: [
              { item: 'Accounts Payable', amount: 48000 },
              { item: 'Short-term Debt', amount: 12000 },
              { item: 'Accrued Expenses', amount: 28000 },
              { item: 'Deferred Revenue', amount: 8200 },
            ],
            metadata: {
              period: { quarter: 'Q3', year: 2024, endDate: '2024-09-30' },
              currency: 'USD',
              unit: 'millions',
            },
          },
          nonCurrent: {
            columns: [
              { key: 'item', header: 'Non-Current Liabilities', type: 'text' },
              { key: 'amount', header: 'Amount ($M)', type: 'currency' },
            ],
            rows: [
              { item: 'Long-term Debt', amount: 98000 },
              { item: 'Deferred Tax Liabilities', amount: 15000 },
              { item: 'Other Long-term Liabilities', amount: 32000 },
            ],
            metadata: {
              period: { quarter: 'Q3', year: 2024, endDate: '2024-09-30' },
              currency: 'USD',
              unit: 'millions',
            },
          },
          total: 241200,
        },
        equity: {
          columns: [
            { key: 'item', header: 'Shareholders Equity', type: 'text' },
            { key: 'amount', header: 'Amount ($M)', type: 'currency' },
          ],
          rows: [
            { item: 'Common Stock', amount: 65000 },
            { item: 'Retained Earnings', amount: -15000 },
            { item: 'Accumulated Other Comprehensive Income', amount: -6500 },
          ],
          metadata: {
            period: { quarter: 'Q3', year: 2024, endDate: '2024-09-30' },
            currency: 'USD',
            unit: 'millions',
          },
        },
      },
      incomeStatement: {
        columns: [
          { key: 'item', header: 'Income Statement', type: 'text' },
          { key: 'amount', header: 'Amount ($M)', type: 'currency' },
        ],
        rows: [
          { item: 'Revenue', amount: 94000 },
          { item: 'Cost of Revenue', amount: 52000 },
          { item: 'Gross Profit', amount: 42000 },
          { item: 'Operating Expenses', amount: 13500 },
          { item: 'Operating Income', amount: 28500 },
          { item: 'Interest Expense', amount: 1000 },
          { item: 'Other Income/(Expense)', amount: 250 },
          { item: 'Income Before Tax', amount: 27750 },
          { item: 'Income Tax', amount: 4800 },
          { item: 'Net Income', amount: 22950 },
        ],
        metadata: {
          period: { quarter: 'Q3', year: 2024, endDate: '2024-09-30' },
          currency: 'USD',
          unit: 'millions',
        },
        summary: {
          revenue: 94000,
          netIncome: 22950,
          eps: 1.47,
        },
      },
      cashFlowStatement: {
        operating: {
          columns: [
            { key: 'item', header: 'Operating Activities', type: 'text' },
            { key: 'amount', header: 'Amount ($M)', type: 'currency' },
          ],
          rows: [
            { item: 'Net Income', amount: 22950 },
            { item: 'Depreciation & Amortization', amount: 3200 },
            { item: 'Changes in Working Capital', amount: -1500 },
            { item: 'Other Operating Activities', amount: 850 },
            { item: 'Net Cash from Operating Activities', amount: 25500 },
          ],
          metadata: {
            period: { quarter: 'Q3', year: 2024, endDate: '2024-09-30' },
            currency: 'USD',
            unit: 'millions',
          },
        },
        investing: {
          columns: [
            { key: 'item', header: 'Investing Activities', type: 'text' },
            { key: 'amount', header: 'Amount ($M)', type: 'currency' },
          ],
          rows: [
            { item: 'Capital Expenditures', amount: -2800 },
            { item: 'Acquisitions', amount: -500 },
            { item: 'Investments', amount: -3200 },
            { item: 'Net Cash from Investing Activities', amount: -6500 },
          ],
          metadata: {
            period: { quarter: 'Q3', year: 2024, endDate: '2024-09-30' },
            currency: 'USD',
            unit: 'millions',
          },
        },
        financing: {
          columns: [
            { key: 'item', header: 'Financing Activities', type: 'text' },
            { key: 'amount', header: 'Amount ($M)', type: 'currency' },
          ],
          rows: [
            { item: 'Dividends Paid', amount: -3700 },
            { item: 'Share Repurchases', amount: -18000 },
            { item: 'Debt Issuance/(Repayment)', amount: 2000 },
            { item: 'Net Cash from Financing Activities', amount: -19700 },
          ],
          metadata: {
            period: { quarter: 'Q3', year: 2024, endDate: '2024-09-30' },
            currency: 'USD',
            unit: 'millions',
          },
        },
        summary: {
          netCashFlow: -700,
          freeCashFlow: 22700,
        },
      },
    },
    riskAnalysis: {
      overallScore: 78,
      rating: 'A',
      categories: {
        creditRisk: {
          title: 'Credit Risk',
          metrics: [
            { name: 'Debt-to-Equity Ratio', value: 2.26, unit: 'ratio', status: 'warning', benchmark: 2.0 },
            { name: 'Interest Coverage Ratio', value: 28.5, unit: 'ratio', status: 'good', benchmark: 3.0 },
            { name: 'Default Probability', value: 2.1, unit: 'percentage', status: 'good', benchmark: 5.0 },
          ],
        },
        marketRisk: {
          title: 'Market Risk',
          metrics: [
            { name: 'Beta', value: 1.18, unit: 'ratio', status: 'neutral', benchmark: 1.0 },
            { name: 'Market Volatility', value: 28.5, unit: 'percentage', status: 'warning' },
          ],
        },
        operationalRisk: {
          title: 'Operational Risk',
          metrics: [
            { name: 'Operating Margin', value: 30.3, unit: 'percentage', status: 'good', benchmark: 20.0 },
            { name: 'Asset Turnover', value: 0.91, unit: 'ratio', status: 'neutral', benchmark: 1.0 },
          ],
        },
        financialRisk: {
          title: 'Financial Risk',
          metrics: [
            { name: 'Current Ratio', value: 1.03, unit: 'ratio', status: 'warning', benchmark: 1.5 },
            { name: 'Quick Ratio', value: 0.96, unit: 'ratio', status: 'warning', benchmark: 1.0 },
          ],
        },
      },
      summary: 'The company demonstrates strong profitability and interest coverage, indicating solid operational performance. However, elevated debt levels and liquidity concerns warrant careful monitoring.',
      recommendations: [
        'Monitor short-term liquidity position closely',
        'Consider debt reduction strategies',
        'Maintain strong operational efficiency',
      ],
    },
    liquidityAnalysis: {
      ratios: {
        title: 'Liquidity Ratios',
        metrics: [
          { name: 'Current Ratio', value: 1.03, unit: 'ratio', status: 'warning', description: 'Current Assets / Current Liabilities' },
          { name: 'Quick Ratio', value: 0.96, unit: 'ratio', status: 'warning', description: '(Current Assets - Inventory) / Current Liabilities' },
          { name: 'Cash Ratio', value: 0.62, unit: 'ratio', status: 'neutral', description: 'Cash / Current Liabilities' },
          { name: 'Working Capital', value: 3000, unit: 'currency', status: 'good', description: 'Current Assets - Current Liabilities' },
        ],
      },
      workingCapital: {
        current: 3000,
        trend: 'stable',
        data: {
          columns: [
            { key: 'period', header: 'Period', type: 'text' },
            { key: 'amount', header: 'Working Capital ($M)', type: 'currency' },
          ],
          rows: [
            { period: 'Q1 2024', amount: 2800 },
            { period: 'Q2 2024', amount: 2950 },
            { period: 'Q3 2024', amount: 3000 },
          ],
        },
      },
      cashPosition: {
        available: 60000,
        burnRate: 500,
        runway: 120,
      },
      summary: 'Liquidity ratios are slightly below optimal levels but remain manageable. Strong cash position provides adequate buffer for operations.',
    },
    profitabilityAnalysis: {
      margins: {
        title: 'Profitability Margins',
        metrics: [
          { name: 'Gross Margin', value: 44.7, unit: 'percentage', status: 'good', benchmark: 40.0 },
          { name: 'Operating Margin', value: 30.3, unit: 'percentage', status: 'good', benchmark: 25.0 },
          { name: 'Net Profit Margin', value: 24.4, unit: 'percentage', status: 'good', benchmark: 20.0 },
          { name: 'EBITDA Margin', value: 33.7, unit: 'percentage', status: 'good', benchmark: 30.0 },
        ],
      },
      returns: {
        title: 'Return Metrics',
        metrics: [
          { name: 'Return on Assets (ROA)', value: 8.1, unit: 'percentage', status: 'good', benchmark: 5.0 },
          { name: 'Return on Equity (ROE)', value: 52.7, unit: 'percentage', status: 'good', benchmark: 15.0 },
          { name: 'Return on Invested Capital (ROIC)', value: 18.5, unit: 'percentage', status: 'good', benchmark: 10.0 },
        ],
      },
      trends: {
        revenue: {
          current: 94000,
          previous: 89500,
          change: 4500,
          changePercent: 5.03,
          direction: 'up',
        },
        netIncome: {
          current: 22950,
          previous: 20800,
          change: 2150,
          changePercent: 10.3,
          direction: 'up',
        },
      },
      comparison: {
        columns: [
          { key: 'metric', header: 'Metric', type: 'text' },
          { key: 'company', header: 'Company', type: 'percentage' },
          { key: 'industry', header: 'Industry Avg', type: 'percentage' },
        ],
        rows: [
          { metric: 'Gross Margin', company: 44.7, industry: 38.5 },
          { metric: 'Operating Margin', company: 30.3, industry: 22.1 },
          { metric: 'Net Margin', company: 24.4, industry: 18.2 },
        ],
      },
      summary: 'Exceptional profitability metrics across all categories, significantly outperforming industry averages. Strong margin expansion trend continues.',
    },
    cashFlowAnalysis: {
      metrics: {
        title: 'Cash Flow Metrics',
        metrics: [
          { name: 'Operating Cash Flow', value: 25500, unit: 'currency', status: 'good' },
          { name: 'Free Cash Flow', value: 22700, unit: 'currency', status: 'good' },
          { name: 'Cash Flow Margin', value: 27.1, unit: 'percentage', status: 'good' },
          { name: 'FCF Conversion Rate', value: 98.9, unit: 'percentage', status: 'good' },
        ],
      },
      breakdown: {
        columns: [
          { key: 'category', header: 'Cash Flow Category', type: 'text' },
          { key: 'amount', header: 'Amount ($M)', type: 'currency' },
          { key: 'percentage', header: '% of Revenue', type: 'percentage' },
        ],
        rows: [
          { category: 'Operating Activities', amount: 25500, percentage: 27.1 },
          { category: 'Investing Activities', amount: -6500, percentage: -6.9 },
          { category: 'Financing Activities', amount: -19700, percentage: -21.0 },
          { category: 'Net Change in Cash', amount: -700, percentage: -0.7 },
        ],
      },
      visualization: {
        operating: [23000, 24200, 25500],
        investing: [-5800, -6100, -6500],
        financing: [-17500, -18900, -19700],
        periods: ['Q1 2024', 'Q2 2024', 'Q3 2024'],
      },
      summary: 'Strong operating cash flow generation demonstrates healthy business operations. Significant capital allocation to shareholder returns through dividends and buybacks.',
    },
    accountOverview: {
      accountsReceivable: {
        current: 18500,
        aging: {
          columns: [
            { key: 'period', header: 'Aging Period', type: 'text' },
            { key: 'amount', header: 'Amount ($M)', type: 'currency' },
            { key: 'percentage', header: '% of Total', type: 'percentage' },
          ],
          rows: [
            { period: '0-30 days', amount: 12500, percentage: 67.6 },
            { period: '31-60 days', amount: 3800, percentage: 20.5 },
            { period: '61-90 days', amount: 1500, percentage: 8.1 },
            { period: '90+ days', amount: 700, percentage: 3.8 },
          ],
        },
        dso: 71.8,
      },
      accountsPayable: {
        current: 48000,
        aging: {
          columns: [
            { key: 'period', header: 'Aging Period', type: 'text' },
            { key: 'amount', header: 'Amount ($M)', type: 'currency' },
            { key: 'percentage', header: '% of Total', type: 'percentage' },
          ],
          rows: [
            { period: '0-30 days', amount: 32000, percentage: 66.7 },
            { period: '31-60 days', amount: 12000, percentage: 25.0 },
            { period: '61-90 days', amount: 3000, percentage: 6.3 },
            { period: '90+ days', amount: 1000, percentage: 2.0 },
          ],
        },
        dpo: 92.3,
      },
      inventory: {
        current: 6500,
        turnover: 8.0,
        daysOnHand: 45.6,
      },
      summary: 'Healthy accounts receivable collection patterns with majority collected within 30 days. Efficient inventory management with strong turnover rates.',
    },
    aiRecommendation: {
      overallAssessment: 'This company demonstrates strong financial health with exceptional profitability and robust cash flow generation. While liquidity ratios are slightly below optimal levels and debt levels are elevated, the companys strong operational performance and market position mitigate these concerns.',
      strengths: [
        'Industry-leading profitability margins significantly above sector averages',
        'Strong and consistent operating cash flow generation',
        'Excellent return on equity and invested capital',
        'Solid revenue and earnings growth trajectory',
        'Efficient working capital management',
      ],
      weaknesses: [
        'Current and quick ratios below industry benchmarks',
        'Elevated debt-to-equity ratio indicating leverage risk',
        'Negative equity position due to extensive share buybacks',
        'Limited liquidity buffer for unexpected downturns',
      ],
      opportunities: [
        'Potential for margin expansion through operational efficiency',
        'Strong cash flow enables continued investment in growth',
        'Market position allows for pricing power',
        'Technology leadership creates competitive moat',
      ],
      threats: [
        'Market volatility could impact valuation',
        'Regulatory scrutiny in key markets',
        'Supply chain disruptions affecting operations',
        'Increasing competition in core markets',
      ],
      actionItems: [
        {
          priority: 'high',
          category: 'Liquidity Management',
          recommendation: 'Improve short-term liquidity ratios by reducing current liabilities or increasing liquid assets',
          impact: 'Reduces financial risk and improves creditworthiness',
        },
        {
          priority: 'medium',
          category: 'Capital Structure',
          recommendation: 'Consider gradual debt reduction to lower leverage ratios',
          impact: 'Decreases financial risk and interest expenses',
        },
        {
          priority: 'medium',
          category: 'Working Capital',
          recommendation: 'Optimize accounts receivable collection to reduce DSO',
          impact: 'Improves cash conversion cycle and liquidity',
        },
        {
          priority: 'low',
          category: 'Shareholder Returns',
          recommendation: 'Balance share buybacks with maintaining healthy equity position',
          impact: 'Ensures long-term financial stability',
        },
      ],
      creditDecision: {
        approved: true,
        rating: 'A',
        terms: 'Recommended credit line up to $5B with standard terms',
        conditions: [
          'Maintain minimum current ratio of 1.0x',
          'Quarterly financial reporting required',
          'Covenant: Debt-to-EBITDA not to exceed 3.5x',
        ],
      },
    },
    metadata: {
      analyzedAt: new Date().toISOString(),
      dataSource: 'sec',
      filingType: '10-Q',
    },
  };
};

/**
 * Mock API Service
 * Simulates actual API endpoints
 */
export const mockApiService = {
  /**
   * Fetch company analysis
   */
  async fetchAnalysis(request: AnalysisRequest): Promise<ApiResponse<AnalysisData>> {
    // Simulate API delay (500-1500ms)
    await delay(Math.random() * 1000 + 500);

    // Simulate occasional errors (5% chance)
    if (Math.random() < 0.05) {
      return {
        success: false,
        error: {
          code: 'ANALYSIS_FAILED',
          message: 'Failed to analyze company data. Please try again.',
        },
      };
    }

    // Validate ticker
    if (!request.ticker || request.ticker.length < 1) {
      return {
        success: false,
        error: {
          code: 'INVALID_TICKER',
          message: 'Please provide a valid ticker symbol.',
        },
      };
    }

    // Generate and return mock data
    const analysisData = generateMockAnalysis(request.ticker);

    return {
      success: true,
      data: analysisData,
    };
  },

  /**
   * Validate ticker symbol (simulate checking if ticker exists)
   */
  async validateTicker(ticker: string): Promise<ApiResponse<boolean>> {
    await delay(300);

    const validTickers = ['AAPL', 'TSLA', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NVDA', 'NFLX'];
    const isValid = validTickers.includes(ticker.toUpperCase());

    return {
      success: true,
      data: isValid,
    };
  },
};