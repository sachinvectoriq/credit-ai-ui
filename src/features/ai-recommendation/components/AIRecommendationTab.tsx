import React from 'react';
import { Sparkles, AlertCircle, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';

// TypeScript interfaces
interface RiskFlag {
  level: 'critical' | 'moderate' | 'favorable';
  label: string;
  description: string;
}

interface AIRecommendationData {
  commentarySummary: string[];
  riskFlags: RiskFlag[];
  ratingGuidance: {
    riskLevel: string;
    equivalentRating: string;
    suggestedAction: string;
    disclaimer: string;
  };
}

// Data from HTML report section "AI Recommendation"
const aiRecommendationData: AIRecommendationData = {
  commentarySummary: [
    "The company has a healthy current ratio of 1.55x, indicating sufficient short-term liquidity to cover current liabilities.",
    "Operating cash flow is low at $10M, and negative free cash flow (-$189M) highlights potential cash flow challenges.",
    "The debt-to-equity ratio of 0.78x suggests manageable leverage relative to equity, but significant long-term debt maturities in 2028 and beyond pose refinancing risks.",
    "Despite substantial revenue of $2,415M, the company reported a net loss of $269M, indicating profitability challenges."
  ],
  riskFlags: [
    {
      level: 'critical',
      label: 'Critical',
      description: 'Negative free cash flow (-$189M) and net loss (-$269M).'
    },
    {
      level: 'moderate',
      label: 'Moderate',
      description: 'Significant long-term debt maturities in 2028 and beyond.'
    },
    {
      level: 'favorable',
      label: 'Favorable',
      description: 'Healthy current ratio (1.55x) and moderate debt-to-equity ratio (0.78x).'
    }
  ],
  ratingGuidance: {
    riskLevel: 'Medium',
    equivalentRating: 'BB-B (Speculative)',
    suggestedAction: 'Maintain exposure with caution, monitor cash flow and debt maturities closely.',
    disclaimer: 'This is system preliminary guidance only. Final decision rests with the Credit Compliance Team.'
  }
};

const RiskFlagCard: React.FC<{
  flag: RiskFlag;
}> = ({ flag }) => {
  const config = {
    critical: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: AlertCircle,
      iconColor: 'text-red-600',
      textColor: 'text-red-900',
      descColor: 'text-red-700',
      emoji: '🔴'
    },
    moderate: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      icon: AlertTriangle,
      iconColor: 'text-amber-600',
      textColor: 'text-amber-900',
      descColor: 'text-amber-700',
      emoji: '🟡'
    },
    favorable: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: CheckCircle2,
      iconColor: 'text-green-600',
      textColor: 'text-green-900',
      descColor: 'text-green-700',
      emoji: '🟢'
    }
  };

  const style = config[flag.level];
  const Icon = style.icon;

  return (
    <div className={`${style.bg} ${style.border} border rounded-lg p-4`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${style.iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{style.emoji}</span>
            <span className={`text-sm font-semibold ${style.textColor}`}>{flag.label}</span>
          </div>
          <p className={`text-sm ${style.descColor}`}>{flag.description}</p>
        </div>
      </div>
    </div>
  );
};

const AIRecommendation: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Sparkles className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-900 mb-2">AI Recommendation</h2>
            <p className="text-sm text-slate-600">
              System-generated assessment based on comprehensive financial analysis
            </p>
          </div>
        </div>
      </div>

      {/* Commentary Summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Commentary Summary</h3>
        <div className="space-y-3">
          {aiRecommendationData.commentarySummary.map((comment, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
              <p className="text-sm text-slate-700 leading-relaxed">{comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Flags */}
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-slate-900 mb-1">Risk Flags</h3>
          <p className="text-sm text-slate-600">Key risk indicators identified in the analysis</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiRecommendationData.riskFlags.map((flag, idx) => (
            <RiskFlagCard key={idx} flag={flag} />
          ))}
        </div>
      </div>

      {/* System Preliminary Rating Guidance */}
      <div className="bg-white border-2 border-slate-300 rounded-lg overflow-hidden">
        <div className="bg-slate-100 px-6 py-4 border-b border-slate-300">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-slate-700" />
            <h3 className="font-semibold text-slate-900">System Preliminary Rating Guidance</h3>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                Risk Level
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 border border-amber-300 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-sm font-semibold text-amber-900">
                  {aiRecommendationData.ratingGuidance.riskLevel}
                </span>
              </div>
            </div>
            
            <div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                Equivalent Rating Band
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 border border-blue-300 rounded-lg">
                <span className="text-sm font-semibold text-blue-900">
                  {aiRecommendationData.ratingGuidance.equivalentRating}
                </span>
              </div>
            </div>
            
            <div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                Suggested Action
              </div>
              <div className="text-sm font-medium text-slate-900">
                {aiRecommendationData.ratingGuidance.suggestedAction}
              </div>
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Disclaimer
                </div>
                <p className="text-sm text-slate-600">
                  {aiRecommendationData.ratingGuidance.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendation;