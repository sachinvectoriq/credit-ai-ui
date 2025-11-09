import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

// TypeScript interfaces
interface CashFlowCardProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  current: number;
  previous: number;
  change: number;
  description: string;
}

interface CashFlowSummary {
  current: number;
  previous: number;
  change: number;
  description: string;
}

interface CashFlowData {
  summary: {
    operating: CashFlowSummary;
    investing: CashFlowSummary;
    financing: CashFlowSummary;
  };
  overallSummary: string;
}

// Data structure based ONLY on the Cash Flow Analysis section
const cashFlowData: CashFlowData = {
  overallSummary: "For the six months ended June 30, 2025, cash flow from operating activities decreased to $10 million from $56 million in the same period in 2024, a decline of $46 million. This was primarily due to financing fees related to the June 2025 refinancing, partially offset by favorable changes in operating assets and liabilities, particularly the timing of trade receivables collections. Cash flow from investing activities saw an increase in cash usage, with $206 million used in 2025 compared to $131 million in 2024, a $75 million increase, driven mainly by higher purchases of property, plant, and equipment. Cash flow from financing activities increased significantly to $121 million in 2025 from $52 million in 2024, a $69 million rise, primarily due to net borrowings under the Revolving Credit Facility before the June 2025 refinancing.",
  summary: {
    operating: {
      current: 10,
      previous: 56,
      change: -46,
      description: "Primarily due to financing fees related to the June 2025 refinancing, partially offset by favorable changes in operating assets and liabilities, particularly the timing of trade receivables collections."
    },
    investing: {
      current: -206,
      previous: -131,
      change: -75,
      description: "Increase in cash usage driven mainly by higher purchases of property, plant, and equipment."
    },
    financing: {
      current: 121,
      previous: 52,
      change: 69,
      description: "Increase primarily due to net borrowings under the Revolving Credit Facility before the June 2025 refinancing."
    }
  }
};

const CashFlowCard: React.FC<CashFlowCardProps> = ({ title, icon: Icon, current, previous, change, description }) => {
  const isPositive = change > 0;
  
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-100 rounded-lg">
            <Icon className="w-5 h-5 text-slate-700" />
          </div>
          <h3 className="font-semibold text-slate-900">{title}</h3>
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {change > 0 ? '+' : ''}{change}M
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-baseline gap-4">
          <div>
            <div className="text-2xl font-bold text-slate-900">
              ${Math.abs(current)}M
            </div>
            <div className="text-xs text-slate-500 mt-1">H1 2025</div>
          </div>
          <div className="text-slate-400">→</div>
          <div>
            <div className="text-lg font-semibold text-slate-600">
              ${Math.abs(previous)}M
            </div>
            <div className="text-xs text-slate-500 mt-1">H1 2024</div>
          </div>
        </div>
        
        <p className="text-sm text-slate-600 leading-relaxed pt-3 border-t border-slate-100">
          {description}
        </p>
      </div>
    </div>
  );
};

const CashFlowAnalysis: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 bg-slate-50">
      {/* Header with Overall Summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Activity className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Cash Flow Analysis</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {cashFlowData.overallSummary}
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CashFlowCard
          title="Operating Activities"
          icon={Activity}
          current={cashFlowData.summary.operating.current}
          previous={cashFlowData.summary.operating.previous}
          change={cashFlowData.summary.operating.change}
          description={cashFlowData.summary.operating.description}
        />
        
        <CashFlowCard
          title="Investing Activities"
          icon={TrendingDown}
          current={cashFlowData.summary.investing.current}
          previous={cashFlowData.summary.investing.previous}
          change={cashFlowData.summary.investing.change}
          description={cashFlowData.summary.investing.description}
        />
        
        <CashFlowCard
          title="Financing Activities"
          icon={TrendingUp}
          current={cashFlowData.summary.financing.current}
          previous={cashFlowData.summary.financing.previous}
          change={cashFlowData.summary.financing.change}
          description={cashFlowData.summary.financing.description}
        />
      </div>
    </div>
  );
};

export default CashFlowAnalysis;