// src/app/App.tsx

import { Header } from '@/shared/components/layout/Header';
import { MainContainer, Section } from '@/shared/components/layout/MainContainer';
import { TickerForm } from '@/features/ticker-input/components/TickerForm';
import { SourceSelector } from '@/features/ticker-input/components/SourceSelector';
import { FileUploadZone } from '@/features/ticker-input/components/FileUploadZone';
import { LoadingSpinner } from '@/shared/components/data-display/LoadingSpinner';
import { NoAnalysisData, ErrorState } from '@/shared/components/data-display/EmptyState';
import FinancialReportPDFGenerator from '@/shared/components/reports/FinancialReportPDFGenerator';
import { useAppStore } from '@/store/useAppStore';
import { ANALYSIS_TABS } from '@/shared/utils/constants';
import { cn } from '@/shared/utils/cn';
import { Send, FileDown } from 'lucide-react';
import { useState } from 'react';

// Placeholder components for tabs
import FinancialStatementsTab from '@/features/financial-statements/components/FinancialStatementsTab';
import RiskAnalysisTab from '@/features/risk-analysis/components/RiskAnalysisTab';
import LiquidityTab from '@/features/liquidity/components/LiquidityTab';
import ProfitabilityTab from '@/features/profitability/components/ProfitabilityTab';
import CashFlowTab from '@/features/cash-flow-analysis/components/CashFlowTab';
import AccountOverviewTab from '@/features/account-overview/components/AccountOverviewTab';
import AIRecommendationTab from '@/features/ai-recommendation/components/AIRecommendationTab';

function App() {
  const {
    ticker,
    source,
    uploadedFiles,
    analysisData,
    isLoading,
    error,
    hasSubmitted,
    activeTab,
    setActiveTab,
    submitAnalysis,
    clearError,
  } = useAppStore();
  
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!ticker.trim()) {
      return;
    }
    
    if (source === 'upload' && uploadedFiles.length === 0) {
      return;
    }
    
    await submitAnalysis();
  };
  
  const isSubmitDisabled = 
    !ticker.trim() || 
    (source === 'upload' && uploadedFiles.length === 0) ||
    isLoading;
  
  // PDF Generation handler
  const handleGeneratePDF = async () => {
    if (!analysisData) return;
    
    setIsGeneratingPDF(true);
    try {
      // Create a temporary instance of the PDF generator component
      // and trigger its generation logic
      const { generatePDF } = await import('@/shared/components/reports/FinancialReportPDFGenerator');
      if (generatePDF) {
        await generatePDF(analysisData);
      }
    } catch (err) {
      console.error('PDF generation error:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };
  
  // Render active tab content
  const renderTabContent = () => {
    if (!analysisData) return null;
    
    switch (activeTab) {
      case 'financial-statements':
        return <FinancialStatementsTab />;
      case 'risk-analysis':
        return <RiskAnalysisTab />;
      case 'liquidity':
        return <LiquidityTab />;
      case 'profitability':
        return <ProfitabilityTab />;
      case 'cash-flow':
        return <CashFlowTab />;
      case 'account-overview':
        return <AccountOverviewTab />;
      case 'ai-recommendation':
        return <AIRecommendationTab />;
      default:
        return <NoAnalysisData />;
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <MainContainer>
        {/* Input Section */}
        <Section
          title="Company Analysis"
          description="Enter a stock ticker or upload financial documents to analyze company performance and assign credit ratings."
          className="mb-8"
        >
          <div className="card p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Ticker Input */}
              <TickerForm />
              
              {/* Source Selector */}
              <SourceSelector />
              
              {/* File Upload (conditional) */}
              <FileUploadZone />
              
              {/* Error Message */}
              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-800">
                        {error}
                      </p>
                    </div>
                    <button
                      onClick={clearError}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitDisabled}
                className="btn btn-primary w-full sm:w-auto gap-2"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Analyze Company
                  </>
                )}
              </button>
            </form>
          </div>
        </Section>
        
        {/* Loading State */}
        {isLoading && (
          <div className="py-12">
            <LoadingSpinner 
              size="lg" 
              text="Analyzing financial data... This may take a few moments." 
            />
          </div>
        )}
        
        {/* Results Section */}
        {!isLoading && hasSubmitted && analysisData && (
          <Section className="animate-in">
            {/* Company Info Header with PDF Button */}
            <div className="card p-6 mb-6">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {analysisData.company.name}
                  </h2>
                  <div className="flex items-center gap-3 mt-2 text-sm text-slate-600 flex-wrap">
                    <span className="font-mono font-semibold">{analysisData.company.ticker}</span>
                    <span>•</span>
                    <span>{analysisData.company.sector}</span>
                    <span>•</span>
                    <span>{analysisData.period.quarter} {analysisData.period.year}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Credit Rating */}
                  <div className="text-right">
                    <p className="text-sm text-slate-600 mb-1">Credit Rating</p>
                    <span className="inline-flex items-center px-4 py-2 rounded-lg bg-primary-100 border border-primary-300 text-primary-700 font-bold font-mono text-xl">
                      {analysisData.riskAnalysis.rating}
                    </span>
                  </div>
                  
                  {/* PDF Generator Button */}
                  <button
                    onClick={handleGeneratePDF}
                    disabled={isGeneratingPDF}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all"
                    title="Generate PDF Report"
                  >
                    {isGeneratingPDF ? (
                      <>
                        <LoadingSpinner size="sm" />
                        <span className="hidden sm:inline">Generating...</span>
                      </>
                    ) : (
                      <>
                        <FileDown className="w-4 h-4" />
                        <span className="hidden sm:inline">Generate PDF</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Tab Navigation */}
            <div className="card p-0 mb-6 overflow-hidden">
              <div className="flex overflow-x-auto">
                {ANALYSIS_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                      activeTab === tab.id
                        ? 'border-primary-600 text-primary-600 bg-primary-50'
                        : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="animate-in">
              {renderTabContent()}
            </div>
          </Section>
        )}
        
        {/* Empty State (when no submission yet) */}
        {!isLoading && !hasSubmitted && !error && (
          <div className="py-12">
            <NoAnalysisData />
          </div>
        )}
        
        {/* Error State */}
        {!isLoading && error && !analysisData && (
          <div className="py-12">
            <ErrorState 
              message={error}
              onRetry={() => {
                clearError();
                submitAnalysis();
              }}
            />
          </div>
        )}
      </MainContainer>
    </div>
  );
}

export default App;