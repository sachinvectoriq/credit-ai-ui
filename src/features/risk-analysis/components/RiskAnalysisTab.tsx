import React from 'react';
import { AlertTriangle, Shield, TrendingDown, AlertCircle, DollarSign, Calendar, Percent, FileText, TrendingUp } from 'lucide-react';

export default function RiskAnalysisTab() {
  // Sample data structure based on the HTML report
  const riskData = {
    debtMaturity: {
      totalLongTermDebt: 4959,
      unamortizedDiscounts: 65,
      grossMaturities: 5024,
      nearTermMaturities: {
        remainder2025: 14,
        year2026: 29,
        year2028: 1914,
        thereafter: 2993
      },
      weightedAvgRate: 8.06,
      previousRate: 7.95,
      lossOnExtinguishment: 9
    },
    interestExpense: {
      current: 222,
      previous: 201,
      increase: 21
    },
    projections: {
      h2InterestPayments: 185,
      h2DebtAmortization: 14,
      h1InvestingActivities: 206,
      operatingCashDecrease: 46
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6 bg-slate-50">
      {/* Header Section */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-7 h-7 text-slate-700" />
          <h1 className="text-2xl font-bold text-slate-900">Risk Analysis</h1>
        </div>
        <p className="text-slate-600 text-sm">Comprehensive assessment of financial and debt-related risks</p>
      </div>

      {/* Executive Summary */}
      <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-amber-900 mb-3">Executive Summary</h3>
            <p className="text-sm text-amber-900 leading-relaxed mb-4">
              Financial risk factors, including debt obligations and operational challenges, could significantly impact the company's operations and cash flow. The company anticipates <span className="font-semibold">${riskData.projections.h2InterestPayments} million in interest payments</span> and <span className="font-semibold">${riskData.projections.h2DebtAmortization} million in mandatory debt amortization</span> for the second half of 2025, which could strain liquidity.
            </p>
            <p className="text-sm text-amber-900 leading-relaxed">
              Additionally, the <span className="font-semibold">${riskData.projections.h1InvestingActivities} million used in investing activities</span> during the first half of 2025, primarily for property, plant, and equipment, reflects substantial capital outflows that may limit flexibility for other strategic initiatives. A <span className="font-semibold text-red-700">${riskData.projections.operatingCashDecrease} million decrease</span> in net cash provided by operating activities compared to the prior year further highlights potential pressures on cash flow.
            </p>
          </div>
        </div>
      </div>

      {/* Financial and Debt-Related Risks */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-slate-700" />
          <h3 className="text-lg font-semibold text-slate-900">Financial and Debt-Related Risks</h3>
        </div>
        <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed">
          <p className="mb-3">
            The provided information does not include specific details about the company's total debt, percentage of variable-rate debt, upcoming maturities, key debt facilities, hedging strategies, or covenants. However, the company has disclosed that there have been no material changes to its assessment of sensitivity to market risks, including interest rate risk, as previously presented in its Annual Report.
          </p>
          <p>
            While the company has effective disclosure controls and procedures, <span className="font-semibold text-slate-900">risks to liquidity, access to capital, or refinancing pressures</span> could arise from uncertainties such as tariffs, counter-tariffs, product recalls, or other unforeseen events impacting operational efficiency and financial stability.
          </p>
        </div>
      </div>

      {/* Risk Indicators */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-slate-700" />
          <h3 className="text-lg font-semibold text-slate-900">Key Risk Indicators</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-start gap-3 p-4 rounded-lg border-l-4 bg-red-50 border-red-500">
            <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-red-500" />
            <p className="text-sm font-medium text-red-900">
              Significant long-term debt maturities in 2028 ($1.9B representing 38.6% of total debt)
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg border-l-4 bg-red-50 border-red-500">
            <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-red-500" />
            <p className="text-sm font-medium text-red-900">
              Weighted average interest rate increased to 8.06% from 7.95% (11 basis points increase)
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg border-l-4 bg-orange-50 border-orange-500">
            <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-orange-500" />
            <p className="text-sm font-medium text-orange-900">
              $9M loss on debt extinguishment from June 2025 refinancing activities
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg border-l-4 bg-orange-50 border-orange-500">
            <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-orange-500" />
            <p className="text-sm font-medium text-orange-900">
              Interest expense increased 10.4% year-over-year ($21M increase)
            </p>
          </div>
        </div>
      </div>

      {/* Debt Maturity Analysis */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-slate-700" />
          <h3 className="text-lg font-semibold text-slate-900">Debt Maturity Analysis</h3>
        </div>
        
        <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-700 leading-relaxed">
            As of June 30, 2025, the Company reported <span className="font-semibold text-slate-900">total long-term debt and other obligations of ${riskData.debtMaturity.totalLongTermDebt.toLocaleString()} million</span>, net of unamortized discounts of ${riskData.debtMaturity.unamortizedDiscounts} million, with gross maturities amounting to <span className="font-semibold text-slate-900">${riskData.debtMaturity.grossMaturities.toLocaleString()} million</span>. The weighted average stated rate of interest on outstanding debt was <span className="font-semibold text-slate-900">{riskData.debtMaturity.weightedAvgRate}%</span> as of June 30, 2025, compared to {riskData.debtMaturity.previousRate}% as of December 31, 2024.
          </p>
        </div>

        {/* Three Key Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Total Debt Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-4 h-4 text-slate-600" />
              <h4 className="text-sm font-semibold text-slate-700">Total Long-Term Debt</h4>
            </div>
            <p className="text-3xl font-bold text-slate-900 mb-1">
              ${riskData.debtMaturity.totalLongTermDebt.toLocaleString()}M
            </p>
            <p className="text-xs text-slate-500 mb-3">Net of discounts: ${riskData.debtMaturity.unamortizedDiscounts}M</p>
            <div className="pt-3 border-t border-slate-200">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600">Gross Maturities:</span>
                <span className="font-semibold text-slate-900">${riskData.debtMaturity.grossMaturities.toLocaleString()}M</span>
              </div>
            </div>
          </div>

          {/* Interest Rate Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <Percent className="w-4 h-4 text-slate-600" />
              <h4 className="text-sm font-semibold text-slate-700">Weighted Avg Interest Rate</h4>
            </div>
            <p className="text-3xl font-bold text-slate-900 mb-1">
              {riskData.debtMaturity.weightedAvgRate}%
            </p>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-3 h-3 text-red-600" />
              <span className="text-xs text-red-600 font-medium">
                +{((riskData.debtMaturity.weightedAvgRate - riskData.debtMaturity.previousRate) * 100).toFixed(0)} bps
              </span>
            </div>
            <div className="pt-3 border-t border-slate-200">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600">Previous Rate (Dec 2024):</span>
                <span className="font-semibold text-slate-900">{riskData.debtMaturity.previousRate}%</span>
              </div>
            </div>
          </div>

          {/* Interest Expense Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-4 h-4 text-slate-600" />
              <h4 className="text-sm font-semibold text-slate-700">Interest Expense (H1 2025)</h4>
            </div>
            <p className="text-3xl font-bold text-slate-900 mb-1">
              ${riskData.interestExpense.current}M
            </p>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-red-600 font-medium">
                +${riskData.interestExpense.increase}M (+10.4%)
              </span>
            </div>
            <div className="pt-3 border-t border-slate-200">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600">H1 2024:</span>
                <span className="font-semibold text-slate-900">${riskData.interestExpense.previous}M</span>
              </div>
            </div>
          </div>
        </div>

        {/* Maturity Schedule Table */}
        <div className="overflow-x-auto">
          <p className="text-sm text-slate-700 mb-3 font-medium">Debt Maturity Schedule:</p>
          <table className="w-full border border-slate-200">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Period</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Amount ($ millions)</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">% of Total</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-700">Maturity Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-700">Remainder of 2025</td>
                <td className="py-3 px-4 text-sm text-right font-semibold text-slate-900">
                  ${riskData.debtMaturity.nearTermMaturities.remainder2025}
                </td>
                <td className="py-3 px-4 text-sm text-right text-slate-600">
                  {((riskData.debtMaturity.nearTermMaturities.remainder2025 / riskData.debtMaturity.totalLongTermDebt) * 100).toFixed(1)}%
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-700">Low</span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-700">2026</td>
                <td className="py-3 px-4 text-sm text-right font-semibold text-slate-900">
                  ${riskData.debtMaturity.nearTermMaturities.year2026}
                </td>
                <td className="py-3 px-4 text-sm text-right text-slate-600">
                  {((riskData.debtMaturity.nearTermMaturities.year2026 / riskData.debtMaturity.totalLongTermDebt) * 100).toFixed(1)}%
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-700">Low</span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-700">2028</td>
                <td className="py-3 px-4 text-sm text-right font-semibold text-slate-900">
                  ${riskData.debtMaturity.nearTermMaturities.year2028.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-sm text-right text-slate-600">
                  {((riskData.debtMaturity.nearTermMaturities.year2028 / riskData.debtMaturity.totalLongTermDebt) * 100).toFixed(1)}%
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2 py-1 text-xs font-medium rounded bg-red-100 text-red-700">High</span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-700">Thereafter (post-2028)</td>
                <td className="py-3 px-4 text-sm text-right font-semibold text-slate-900">
                  ${riskData.debtMaturity.nearTermMaturities.thereafter.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-sm text-right text-slate-600">
                  {((riskData.debtMaturity.nearTermMaturities.thereafter / riskData.debtMaturity.totalLongTermDebt) * 100).toFixed(1)}%
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2 py-1 text-xs font-medium rounded bg-orange-100 text-orange-700">Medium</span>
                </td>
              </tr>
            </tbody>
            <tfoot className="border-t-2 border-slate-300">
              <tr className="bg-slate-50">
                <td className="py-3 px-4 text-sm font-semibold text-slate-900">Total</td>
                <td className="py-3 px-4 text-sm text-right font-bold text-slate-900">
                  ${riskData.debtMaturity.totalLongTermDebt.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-sm text-right font-semibold text-slate-900">100.0%</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mt-4 p-3 bg-slate-50 rounded border border-slate-200">
          <p className="text-xs text-slate-600 leading-relaxed">
            <span className="font-semibold text-slate-700">Note:</span> Near-term maturities include ${riskData.debtMaturity.nearTermMaturities.remainder2025} million for the remainder of 2025 and ${riskData.debtMaturity.nearTermMaturities.year2026} million in 2026, while significant long-term maturities include ${riskData.debtMaturity.nearTermMaturities.year2028.toLocaleString()} million in 2028 and ${riskData.debtMaturity.nearTermMaturities.thereafter.toLocaleString()} million thereafter.
          </p>
        </div>
      </div>

      {/* Interest Expense Analysis */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-slate-700" />
          <h3 className="text-lg font-semibold text-slate-900">Interest Expense Analysis</h3>
        </div>
        <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed">
          <p className="mb-3">
            The company's interest expense for the six months ended June 30, 2025, was <span className="font-semibold text-slate-900">${riskData.interestExpense.current} million</span>, compared to <span className="font-semibold text-slate-900">${riskData.interestExpense.previous} million</span> for the same period in 2024, reflecting an increase of <span className="font-semibold text-red-700">${riskData.interestExpense.increase} million</span>.
          </p>
          <p>
            This increase was primarily due to the write-off of financing costs associated with the June 2025 refinancing. Additionally, the weighted average stated rate of interest for the company's outstanding debt obligations as of June 30, 2025, was <span className="font-semibold text-slate-900">{riskData.debtMaturity.weightedAvgRate}%</span>, up from <span className="font-semibold text-slate-900">{riskData.debtMaturity.previousRate}%</span> as of December 31, 2024.
          </p>
        </div>
      </div>

      {/* Additional Context */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Loss on Debt Extinguishment</h4>
            <p className="text-sm text-blue-800 leading-relaxed">
              The Company incurred a <span className="font-semibold">${riskData.debtMaturity.lossOnExtinguishment} million loss</span> on extinguishment of debt related to the repayment of certain facilities during the June 2025 refinancing. This loss reflects the difference between the settlement amount and the carrying value of the extinguished debt, representing costs associated with early debt retirement and refinancing activities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}