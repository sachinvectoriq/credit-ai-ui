//import React from 'react';
import { Droplets, TrendingUp, Shield, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

export default function LiquidityAnalysisTab() {
  // Data from the HTML report
  const liquidityData = {
    cashPosition: {
      total: 272,
      asOfDate: 'June 30, 2025'
    },
    revolvingCredit: {
      totalAvailability: 800,
      lettersOfCredit: 37,
      availableAmount: 763,
      maturityDate: 'June 2030'
    },
    balanceSheet: {
      currentAssets: 2846,
      currentLiabilities: 1840,
      workingCapital: 1006,
      currentRatio: 1.55,
      quickRatio: 0.98
    },
    previousPeriods: {
      q1_2025: { workingCapital: 968, currentRatio: 1.56, quickRatio: 0.96 },
      q4_2024: { workingCapital: 1050, currentRatio: 1.60, quickRatio: 1.01 },
      fy_2024: { workingCapital: 1050, currentRatio: 1.60, quickRatio: 1.01 },
      fy_2023: { workingCapital: 1163, currentRatio: 1.74, quickRatio: 1.09 }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6 bg-slate-50">
      {/* Header Section */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <Droplets className="w-7 h-7 text-slate-700" />
          <h1 className="text-2xl font-bold text-slate-900">Liquidity Analysis</h1>
        </div>
        <p className="text-slate-600 text-sm">Assessment of cash position, working capital, and short-term financial flexibility</p>
      </div>

      {/* Liquidity Overview */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-6 h-6 text-blue-700 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Liquidity Summary</h3>
            <div className="space-y-3 text-sm text-blue-900 leading-relaxed">
              <p>
                As of {liquidityData.cashPosition.asOfDate}, the company had <span className="font-semibold">${liquidityData.cashPosition.total} million in cash and cash equivalents</span>. The filing does not explicitly state whether the company's cash and liquidity resources will last for the next 12 months; however, <span className="font-semibold">management expects to remain in compliance with financial covenants and meet debt service obligations</span> over the same period.
              </p>
              <p>
                Additionally, the company maintains a <span className="font-semibold">June 2030 Revolving Credit Facility</span> with a total availability of <span className="font-semibold">${liquidityData.revolvingCredit.totalAvailability} million</span>, of which ${liquidityData.revolvingCredit.lettersOfCredit} million is allocated to issued and outstanding letters of credit, leaving <span className="font-semibold text-blue-700">${liquidityData.revolvingCredit.availableAmount} million available</span> as of {liquidityData.cashPosition.asOfDate}.
              </p>
              <p>
                <span className="font-semibold">There is no mention of going concern issues or substantial doubt</span> about the company's ability to continue operations for the next 12 months in this filing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Liquidity Metrics */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <Shield className="w-5 h-5 text-slate-700" />
          <h3 className="text-lg font-semibold text-slate-900">Key Liquidity Metrics</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Cash Position Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <Droplets className="w-4 h-4 text-slate-600" />
              <h4 className="text-sm font-semibold text-slate-700">Cash & Equivalents</h4>
            </div>
            <p className="text-3xl font-bold text-slate-900 mb-1">
              ${liquidityData.cashPosition.total}M
            </p>
            <p className="text-xs text-slate-500 mb-3">As of {liquidityData.cashPosition.asOfDate}</p>
            <div className="pt-3 border-t border-slate-200">
              <p className="text-xs text-slate-600 leading-relaxed">
                Immediately available liquid resources for operations and obligations
              </p>
            </div>
          </div>

          {/* Current Ratio Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-slate-600" />
              <h4 className="text-sm font-semibold text-slate-700">Current Ratio</h4>
            </div>
            <p className="text-3xl font-bold text-slate-900 mb-1">
              {liquidityData.balanceSheet.currentRatio}x
            </p>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-slate-600">
                vs Q1: {liquidityData.previousPeriods.q1_2025.currentRatio}x
              </span>
            </div>
            <div className="pt-3 border-t border-slate-200">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600">Current Assets:</span>
                <span className="font-semibold text-slate-900">${liquidityData.balanceSheet.currentAssets}M</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-600">Current Liabilities:</span>
                <span className="font-semibold text-slate-900">${liquidityData.balanceSheet.currentLiabilities}M</span>
              </div>
            </div>
          </div>

          {/* Quick Ratio Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-slate-600" />
              <h4 className="text-sm font-semibold text-slate-700">Quick Ratio</h4>
            </div>
            <p className="text-3xl font-bold text-slate-900 mb-1">
              {liquidityData.balanceSheet.quickRatio}x
            </p>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-slate-600">
                vs Q1: {liquidityData.previousPeriods.q1_2025.quickRatio}x
              </span>
            </div>
            <div className="pt-3 border-t border-slate-200">
              <p className="text-xs text-slate-600 leading-relaxed">
                Ability to meet short-term obligations without selling inventory
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Revolving Credit Facility */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-5 h-5 text-slate-700" />
          <h3 className="text-lg font-semibold text-slate-900">Revolving Credit Facility</h3>
        </div>
        
        <div className="mb-5 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-700 leading-relaxed mb-3">
            The company has a <span className="font-semibold text-slate-900">June 2030 Revolving Credit Facility</span> with a total availability of <span className="font-semibold text-slate-900">${liquidityData.revolvingCredit.totalAvailability} million</span>. The facility matures in {liquidityData.revolvingCredit.maturityDate} and allows borrowings in multiple currencies, with interest rates based on specific benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <p className="text-xs text-slate-600 font-medium mb-2">Total Facility</p>
            <p className="text-2xl font-bold text-slate-900">${liquidityData.revolvingCredit.totalAvailability}M</p>
          </div>
          
          <div className="text-center p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <p className="text-xs text-slate-600 font-medium mb-2">Letters of Credit</p>
            <p className="text-2xl font-bold text-slate-900">${liquidityData.revolvingCredit.lettersOfCredit}M</p>
          </div>
          
          <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-xs text-green-700 font-medium mb-2">Available to Draw</p>
            <p className="text-2xl font-bold text-green-900">${liquidityData.revolvingCredit.availableAmount}M</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-slate-50 rounded border border-slate-200">
          <p className="text-xs text-slate-600 leading-relaxed">
            <span className="font-semibold text-slate-700">Total Liquidity Position:</span> Combining cash on hand (${liquidityData.cashPosition.total}M) and available credit facility (${liquidityData.revolvingCredit.availableAmount}M), the company has approximately <span className="font-semibold text-slate-900">${liquidityData.cashPosition.total + liquidityData.revolvingCredit.availableAmount}M in total liquidity</span> available for operations and strategic initiatives.
          </p>
        </div>
      </div>

      {/* Working Capital Analysis */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-slate-700" />
          <h3 className="text-lg font-semibold text-slate-900">Working Capital Analysis</h3>
        </div>

        <div className="mb-5 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-700 leading-relaxed">
            Working capital represents the difference between current assets and current liabilities, indicating the company's short-term financial health and operational efficiency. As of {liquidityData.cashPosition.asOfDate}, the company reported <span className="font-semibold text-slate-900">${liquidityData.balanceSheet.workingCapital}M in working capital</span>.
          </p>
        </div>

        {/* Working Capital Trend */}
        <div className="overflow-x-auto">
          <table className="w-full border border-slate-200">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Period</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Working Capital</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Current Ratio</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Quick Ratio</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-700">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 text-sm font-semibold text-slate-900">Q2 2025 (Current)</td>
                <td className="py-3 px-4 text-sm text-right font-semibold text-slate-900">
                  ${liquidityData.balanceSheet.workingCapital}M
                </td>
                <td className="py-3 px-4 text-sm text-right text-slate-900">
                  {liquidityData.balanceSheet.currentRatio}x
                </td>
                <td className="py-3 px-4 text-sm text-right text-slate-900">
                  {liquidityData.balanceSheet.quickRatio}x
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="text-xs text-slate-600">—</span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-700">Q1 2025</td>
                <td className="py-3 px-4 text-sm text-right text-slate-700">
                  ${liquidityData.previousPeriods.q1_2025.workingCapital}M
                </td>
                <td className="py-3 px-4 text-sm text-right text-slate-700">
                  {liquidityData.previousPeriods.q1_2025.currentRatio}x
                </td>
                <td className="py-3 px-4 text-sm text-right text-slate-700">
                  {liquidityData.previousPeriods.q1_2025.quickRatio}x
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="text-xs text-green-700 font-medium">↑ +3.9%</span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-700">Q4 2024</td>
                <td className="py-3 px-4 text-sm text-right text-slate-700">
                  ${liquidityData.previousPeriods.q4_2024.workingCapital}M
                </td>
                <td className="py-3 px-4 text-sm text-right text-slate-700">
                  {liquidityData.previousPeriods.q4_2024.currentRatio}x
                </td>
                <td className="py-3 px-4 text-sm text-right text-slate-700">
                  {liquidityData.previousPeriods.q4_2024.quickRatio}x
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="text-xs text-red-700 font-medium">↓ -4.2%</span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-700">FY 2023</td>
                <td className="py-3 px-4 text-sm text-right text-slate-700">
                  ${liquidityData.previousPeriods.fy_2023.workingCapital}M
                </td>
                <td className="py-3 px-4 text-sm text-right text-slate-700">
                  {liquidityData.previousPeriods.fy_2023.currentRatio}x
                </td>
                <td className="py-3 px-4 text-sm text-right text-slate-700">
                  {liquidityData.previousPeriods.fy_2023.quickRatio}x
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="text-xs text-red-700 font-medium">↓ -13.5%</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-3 bg-amber-50 rounded border border-amber-200">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-900 leading-relaxed">
              <span className="font-semibold">Trend Analysis:</span> Working capital has declined from $1,163M in FY 2023 to $1,006M in Q2 2025, representing a 13.5% decrease over the period. However, recent quarter-over-quarter improvement (+3.9% from Q1 to Q2 2025) suggests stabilization. Current and quick ratios remain above 1.0x, indicating adequate short-term liquidity coverage.
            </p>
          </div>
        </div>
      </div>

      {/* Financial Covenant Compliance */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-green-900 mb-2">Financial Covenant Compliance</h4>
            <p className="text-sm text-green-800 leading-relaxed">
              Management expects to <span className="font-semibold">remain in compliance with all financial covenants</span> and meet debt service obligations over the next 12 months. The company's current liquidity position, combined with available credit facilities, provides adequate financial flexibility to support ongoing operations and meet near-term obligations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}