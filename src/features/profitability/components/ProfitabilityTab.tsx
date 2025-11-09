import React from 'react';
import { TrendingUp, DollarSign, PieChart, AlertCircle, Info } from 'lucide-react';

const ProfitabilityAnalysisTab = () => {
  // Data extracted from API text
  const data = {
    revenue: {
      h1_2025: 2415, // million
      h1_2024: 2315, // million
      growth: 4.3 // percentage
    },
    productConcentration: {
      current: 54, // percentage
      previous: 53 // percentage
    }
  };

  const formatCurrency = (value:number) => {
    return `$${value.toLocaleString()}M`;
  };

  const revenueChange = data.revenue.h1_2025 - data.revenue.h1_2024;

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6 bg-gray-50">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="bg-blue-600 p-3 rounded-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Profitability Analysis</h2>
            <p className="text-gray-700 leading-relaxed">
              The company reported total revenues of <span className="font-semibold">{formatCurrency(data.revenue.h1_2025)}</span> for 
              the six months ended June 30, 2025, reflecting an increase from {formatCurrency(data.revenue.h1_2024)} during the same period in 2024. 
              This represents a year-over-year growth of approximately <span className="font-semibold">{data.revenue.growth}%</span>, indicating a steady upward trend in revenue generation.
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Revenue H1 2025 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600 p-2 rounded">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">H1 2025 Revenue</h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-4">
            {formatCurrency(data.revenue.h1_2025)}
          </div>
          <div className="space-y-2 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">H1 2024:</span>
              <span className="font-medium text-gray-900">{formatCurrency(data.revenue.h1_2024)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Change:</span>
              <span className="font-medium text-gray-900">+{formatCurrency(revenueChange)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Growth Rate:</span>
              <span className="font-semibold text-blue-600">+{data.revenue.growth}%</span>
            </div>
          </div>
        </div>

        {/* Year-over-Year Growth */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600 p-2 rounded">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">YoY Growth</h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-4">
            {data.revenue.growth}%
          </div>
          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600 leading-relaxed">
              Indicates steady upward trend in revenue generation, highlighting the company's ability to maintain strong performance in core product lines.
            </p>
          </div>
        </div>

        {/* Product Concentration */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600 p-2 rounded">
              <PieChart className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Top 10 Products</h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-4">
            {data.productConcentration.current}%
          </div>
          <div className="space-y-2 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">2024 Contribution:</span>
              <span className="font-medium text-gray-900">{data.productConcentration.previous}%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Change:</span>
              <span className="font-medium text-gray-900">+{(data.productConcentration.current - data.productConcentration.previous).toFixed(1)}pp</span>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Comparison Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="bg-gray-900 px-6 py-4">
          <h3 className="text-lg font-semibold text-white">Revenue Performance Summary</h3>
          <p className="text-gray-300 text-sm mt-1">Six months ended June 30</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Change
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Growth %
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  H1 2025
                </td>
                <td className="px-6 py-4 text-sm text-right font-semibold text-gray-900">
                  {formatCurrency(data.revenue.h1_2025)}
                </td>
                <td className="px-6 py-4 text-sm text-right font-medium text-gray-900">
                  +{formatCurrency(revenueChange)}
                </td>
                <td className="px-6 py-4 text-sm text-right">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                    +{data.revenue.growth}%
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-700">
                  H1 2024
                </td>
                <td className="px-6 py-4 text-sm text-right font-medium text-gray-700">
                  {formatCurrency(data.revenue.h1_2024)}
                </td>
                <td className="px-6 py-4 text-sm text-right text-gray-500">
                  —
                </td>
                <td className="px-6 py-4 text-sm text-right text-gray-500">
                  —
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Concentration Details */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="bg-gray-900 px-6 py-4">
          <h3 className="text-lg font-semibold text-white">Revenue Concentration Analysis</h3>
          <p className="text-gray-300 text-sm mt-1">Top 10 products and franchises contribution</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Top 10 Products
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Other Products
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Change
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  2025
                </td>
                <td className="px-6 py-4 text-sm text-right font-semibold text-gray-900">
                  {data.productConcentration.current}%
                </td>
                <td className="px-6 py-4 text-sm text-right text-gray-700">
                  {100 - data.productConcentration.current}%
                </td>
                <td className="px-6 py-4 text-sm text-right font-medium text-gray-900">
                  +{(data.productConcentration.current - data.productConcentration.previous).toFixed(1)}pp
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-700">
                  2024
                </td>
                <td className="px-6 py-4 text-sm text-right font-medium text-gray-700">
                  {data.productConcentration.previous}%
                </td>
                <td className="px-6 py-4 text-sm text-right text-gray-600">
                  {100 - data.productConcentration.previous}%
                </td>
                <td className="px-6 py-4 text-sm text-right text-gray-500">
                  —
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700 leading-relaxed">
              Consistent reliance on key revenue drivers with a slight increase in concentration. Further diversification may be necessary to mitigate risks associated with concentrated revenue streams.
            </p>
          </div>
        </div>
      </div>

      {/* Management Commentary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="bg-blue-600 p-2 rounded">
            <Info className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Key Insights & Management Commentary</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex gap-4 pb-4 border-b border-gray-100">
            <div className="flex-shrink-0 w-1 bg-blue-600 rounded-full"></div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Revenue Growth Trajectory</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                The company demonstrates consistent revenue expansion with a {data.revenue.growth}% year-over-year increase, highlighting strong performance in core product lines and effective management controls.
              </p>
            </div>
          </div>

          <div className="flex gap-4 pb-4 border-b border-gray-100">
            <div className="flex-shrink-0 w-1 bg-blue-600 rounded-full"></div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Product Concentration</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Top 10 products and franchises contributed {data.productConcentration.current}% of total revenues in 2025, up from {data.productConcentration.previous}% in 2024, suggesting a consistent reliance on key revenue drivers. This growth highlights the company's ability to maintain strong performance, though further diversification may be warranted.
              </p>
            </div>
          </div>

          <div className="flex gap-4 pb-4 border-b border-gray-100">
            <div className="flex-shrink-0 w-1 bg-blue-600 rounded-full"></div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Operational Stability</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Operating income figures were not explicitly disclosed in the filing, but the evaluation of disclosure controls and procedures by the CEO and CFO indicates effective management practices, which likely contributed to operational stability. The steady revenue growth and effective controls suggest that the company may have maintained or improved its operational efficiency.
              </p>
            </div>
          </div>

          <div className="flex gap-4 pb-4 border-b border-gray-100">
            <div className="flex-shrink-0 w-1 bg-blue-600 rounded-full"></div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Financial Stability</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                The filing does not provide specific details on gross, operating, or net profit margins. However, liquidity and cash reserves were not directly discussed, and the absence of material changes in market risk sensitivity implies financial stability and prudent risk management.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-1 bg-blue-600 rounded-full"></div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Forward-Looking Considerations</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Management's forward-looking statements emphasize the inherent uncertainties and risks that could impact future profitability. While no specific projections were provided, the company's caution regarding external factors and market conditions underscores the importance of monitoring these variables closely. Investors should consider the potential impact of interest rate fluctuations and other macroeconomic factors on the company's performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitabilityAnalysisTab;