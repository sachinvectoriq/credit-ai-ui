// src/store/useAppStore.ts

import { create } from 'zustand';
import type { 
  AnalysisData, 
  AnalysisTab, 
  FinancialStatementTab 
} from '../types/financial.types';
import { mockApiService } from '../services/mock/mockApi';

interface AppState {
  // Input State
  ticker: string;
  source: 'auto' | 'upload';
  uploadedFiles: File[];
  
  // Analysis State
  analysisData: AnalysisData | null;
  isLoading: boolean;
  error: string | null;
  hasSubmitted: boolean;
  
  // UI State
  activeTab: AnalysisTab;
  activeFinancialTab: FinancialStatementTab;
  
  // Actions
  setTicker: (ticker: string) => void;
  setSource: (source: 'auto' | 'upload') => void;
  setUploadedFiles: (files: File[]) => void;
  submitAnalysis: () => Promise<void>;
  setActiveTab: (tab: AnalysisTab) => void;
  setActiveFinancialTab: (tab: FinancialStatementTab) => void;
  clearError: () => void;
  resetAnalysis: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial State
  ticker: '',
  source: 'auto',
  uploadedFiles: [],
  analysisData: null,
  isLoading: false,
  error: null,
  hasSubmitted: false,
  activeTab: 'financial-statements',
  activeFinancialTab: 'balance-sheet',

  // Actions
  setTicker: (ticker) => {
    set({ ticker: ticker.toUpperCase(), error: null });
  },

  setSource: (source) => {
    set({ source, uploadedFiles: source === 'auto' ? [] : get().uploadedFiles });
  },

  setUploadedFiles: (files) => {
    set({ uploadedFiles: files });
  },

  submitAnalysis: async () => {
    const { ticker, source, uploadedFiles } = get();

    // Validation
    if (!ticker.trim()) {
      set({ error: 'Please enter a ticker symbol' });
      return;
    }

    if (source === 'upload' && uploadedFiles.length === 0) {
      set({ error: 'Please upload at least one file' });
      return;
    }

    // Start loading
    set({ isLoading: true, error: null, hasSubmitted: false });

    try {
      // Call mock API
      const response = await mockApiService.fetchAnalysis({
        ticker,
        source,
        files: uploadedFiles,
      });

      if (response.success && response.data) {
        set({
          analysisData: response.data,
          isLoading: false,
          hasSubmitted: true,
          activeTab: 'financial-statements',
          activeFinancialTab: 'balance-sheet',
        });
      } else {
        set({
          error: response.error?.message || 'Failed to fetch analysis',
          isLoading: false,
          hasSubmitted: false,
        });
      }
    } catch (err) {
      set({
        error: 'An unexpected error occurred. Please try again.',
        isLoading: false,
        hasSubmitted: false,
      });
    }
  },

  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },

  setActiveFinancialTab: (tab) => {
    set({ activeFinancialTab: tab });
  },

  clearError: () => {
    set({ error: null });
  },

  resetAnalysis: () => {
    set({
      ticker: '',
      source: 'auto',
      uploadedFiles: [],
      analysisData: null,
      isLoading: false,
      error: null,
      hasSubmitted: false,
      activeTab: 'financial-statements',
      activeFinancialTab: 'balance-sheet',
    });
  },
}));