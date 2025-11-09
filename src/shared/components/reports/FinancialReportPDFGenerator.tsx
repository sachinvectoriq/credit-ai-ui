import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// TypeScript interfaces matching your actual data structure
interface Company {
  name: string;
  ticker: string;
  sector: string;
}

interface Period {
  quarter: string;
  year: string | number;
}

interface RiskAnalysis {
  rating: string;
  debtMaturity?: {
    totalLongTermDebt: number;
    weightedAvgRate: number;
    previousRate: number;
    nearTermMaturities: {
      remainder2025: number;
      year2026: number;
      year2028: number;
      thereafter: number;
    };
  };
  interestExpense?: {
    current: number;
    previous: number;
    increase: number;
  };
}

interface Liquidity {
  cashPosition?: {
    total: number;
    asOfDate: string;
  };
  balanceSheet?: {
    currentRatio: number;
    quickRatio: number;
    workingCapital: number;
    currentAssets: number;
    currentLiabilities: number;
  };
  revolvingCredit?: {
    totalAvailability: number;
    availableAmount: number;
    maturityDate: string;
  };
}

interface Profitability {
  revenue?: {
    h1_2025: number;
    h1_2024: number;
    growth: number;
  };
  productConcentration?: {
    current: number;
    previous: number;
  };
}

interface CashFlow {
  summary?: {
    operating: { current: number; previous: number; change: number };
    investing: { current: number; previous: number; change: number };
    financing: { current: number; previous: number; change: number };
  };
}

interface AIRecommendation {
  overallAssessment?: string;
  commentarySummary?: string[];
  strengths?: string[];
  weaknesses?: string[];
  opportunities?: string[];
  threats?: string[];
  actionItems?: Array<{
    priority: string;
    category: string;
    recommendation: string;
    impact: string;
  }>;
  creditDecision?: {
    approved: boolean;
    rating: string;
    conditions?: string[];
  };
  ratingGuidance?: {
    riskLevel: string;
    equivalentRating: string;
    suggestedAction: string;
  };
}

interface AnalysisData {
  company: Company;
  period: Period;
  riskAnalysis: RiskAnalysis;
  liquidity?: Liquidity;
  profitability?: Profitability;
  cashFlow?: CashFlow;
  aiRecommendation?: AIRecommendation | string;
  overview?: string;
}

// Export the PDF generation logic as a standalone function
export const generatePDF = async (analysisData: AnalysisData) => {
  if (!analysisData) {
    throw new Error("No data available for report.");
  }

  const doc = new jsPDF({ 
    orientation: "portrait", 
    unit: "pt", 
    format: "a4" 
  });
  
  const margin = 50;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const colorPrimary = "#007BFF";

  // ---------- HEADER ----------
  const addHeader = () => {
    doc.setFontSize(22);
    doc.setTextColor(colorPrimary);
    doc.text("Financial Analysis Report", pageWidth / 2, margin, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.setTextColor("#555555");
    doc.text(
      `Company: ${analysisData?.company?.name || "N/A"}`,
      margin,
      margin + 30
    );
    doc.text(
      `Ticker: ${analysisData?.company?.ticker || "N/A"} | Sector: ${analysisData?.company?.sector || "N/A"}`,
      margin,
      margin + 45
    );
    doc.text(
      `Period: ${analysisData?.period?.quarter || ""} ${analysisData?.period?.year || ""}`,
      margin,
      margin + 60
    );
    doc.text(
      `Generated on: ${new Date().toLocaleDateString()}`,
      margin,
      margin + 75
    );
    
    // Credit Rating Box
    if (analysisData?.riskAnalysis?.rating) {
      doc.setFillColor(220, 252, 231);
      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(2);
      doc.roundedRect(pageWidth - margin - 100, margin + 20, 100, 50, 5, 5, "FD");
      
      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105);
      doc.text("Credit Rating", pageWidth - margin - 50, margin + 35, { align: "center" });
      
      doc.setFontSize(24);
      doc.setTextColor(16, 185, 129);
      doc.text(analysisData.riskAnalysis.rating, pageWidth - margin - 50, margin + 58, { align: "center" });
    }
  };

  // ---------- FOOTER ----------
  const addFooter = () => {
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, pageHeight - 40, pageWidth - margin, pageHeight - 40);
      
      doc.setFontSize(10);
      doc.setTextColor("#666666");
      doc.text(
        `Page ${i} of ${pageCount}`,
        pageWidth / 2,
        pageHeight - 25,
        { align: "center" }
      );
      
      if (i > 1) {
        doc.setFontSize(8);
        doc.text("Confidential Financial Analysis", margin, pageHeight - 25);
      }
    }
  };

  // ---------- SECTION UTILITIES ----------
  const addSectionHeader = (title: string, y: number): number => {
    doc.setFillColor(0, 123, 255);
    doc.rect(margin, y, pageWidth - margin * 2, 30, "F");
    
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text(title, margin + 10, y + 20);
    
    doc.setTextColor(0, 0, 0);
    return y + 40;
  };

  const addParagraph = (text: string, y: number): number => {
    doc.setFontSize(11);
    doc.setTextColor("#222222");
    const splitText = doc.splitTextToSize(text, pageWidth - margin * 2);
    doc.text(splitText, margin, y);
    return y + splitText.length * 14 + 10;
  };

  const addKeyValuePair = (label: string, value: string, y: number): number => {
    doc.setFontSize(11);
    doc.setTextColor("#555555");
    doc.text(label + ":", margin, y);
    
    doc.setTextColor("#222222");
    doc.setFont("helvetica", "bold");
    doc.text(value, margin + 200, y);
    doc.setFont("helvetica", "normal");
    
    return y + 18;
  };

  const addTable = (title: string, tableData: any[], y: number): number => {
    if (!tableData || tableData.length === 0) return y;

    doc.setFontSize(13);
    doc.setTextColor("#111111");
    doc.text(title, margin, y);
    
    autoTable(doc, {
      startY: y + 10,
      head: [Object.keys(tableData[0])],
      body: tableData.map((row) => Object.values(row)),
      theme: "striped",
      headStyles: { 
        fillColor: [0, 123, 255], 
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 10
      },
      styles: { 
        fontSize: 9, 
        cellPadding: 5,
        textColor: [34, 34, 34]
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250]
      },
      margin: { left: margin, right: margin },
    });
    
    return (doc as any).lastAutoTable.finalY + 20;
  };

  const checkPageBreak = (y: number, spaceNeeded: number = 100): number => {
    if (y > pageHeight - spaceNeeded) {
      doc.addPage();
      return margin + 20;
    }
    return y;
  };

  // ---------- BUILD REPORT ----------
  addHeader();
  let y = margin + 110;

  // Executive Summary
  doc.addPage();
  y = margin;
  y = addSectionHeader("Executive Summary", y);
  
  const summaryText = analysisData?.overview ||
    `${analysisData.company.name} (${analysisData.company.ticker}) operates in the ${analysisData.company.sector} sector. ` +
    `This comprehensive financial analysis covers the period ${analysisData.period.quarter} ${analysisData.period.year}. ` +
    `The company has been assigned a credit rating of ${analysisData.riskAnalysis.rating}.`;
  
  y = addParagraph(summaryText, y);
  y = checkPageBreak(y);

  // Key Metrics Box
  y += 10;
  doc.setFillColor(239, 246, 255);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 150, 5, 5, "F");
  y += 20;
  
  y = addKeyValuePair("Credit Rating", analysisData.riskAnalysis.rating, y);
  
  if (analysisData.profitability?.revenue?.h1_2025) {
    y = addKeyValuePair("H1 2025 Revenue", `$${analysisData.profitability.revenue.h1_2025}M`, y);
    y = addKeyValuePair("Revenue Growth (YoY)", `${analysisData.profitability.revenue.growth}%`, y);
  }
  
  if (analysisData.liquidity?.balanceSheet?.currentRatio) {
    y = addKeyValuePair("Current Ratio", `${analysisData.liquidity.balanceSheet.currentRatio}x`, y);
    y = addKeyValuePair("Quick Ratio", `${analysisData.liquidity.balanceSheet.quickRatio}x`, y);
  }
  
  if (analysisData.liquidity?.cashPosition?.total) {
    y = addKeyValuePair("Cash Position", `$${analysisData.liquidity.cashPosition.total}M`, y);
  }
  
  y += 20;
  y = checkPageBreak(y);

  // Risk Analysis
  doc.addPage();
  y = margin;
  y = addSectionHeader("Risk Analysis", y);
  
  if (analysisData.riskAnalysis.debtMaturity) {
    const debt = analysisData.riskAnalysis.debtMaturity;
    y = addParagraph(
      `The company has total long-term debt of $${debt.totalLongTermDebt.toLocaleString()}M with a weighted average ` +
      `interest rate of ${debt.weightedAvgRate}%, up from ${debt.previousRate}% in the previous period.`,
      y
    );
    
    y += 15;
    const debtMaturityData = [
      { Period: "Remainder 2025", Amount: `$${debt.nearTermMaturities.remainder2025}M`, Percentage: `${((debt.nearTermMaturities.remainder2025 / debt.totalLongTermDebt) * 100).toFixed(1)}%` },
      { Period: "2026", Amount: `$${debt.nearTermMaturities.year2026}M`, Percentage: `${((debt.nearTermMaturities.year2026 / debt.totalLongTermDebt) * 100).toFixed(1)}%` },
      { Period: "2028", Amount: `$${debt.nearTermMaturities.year2028.toLocaleString()}M`, Percentage: `${((debt.nearTermMaturities.year2028 / debt.totalLongTermDebt) * 100).toFixed(1)}%` },
      { Period: "Thereafter", Amount: `$${debt.nearTermMaturities.thereafter.toLocaleString()}M`, Percentage: `${((debt.nearTermMaturities.thereafter / debt.totalLongTermDebt) * 100).toFixed(1)}%` }
    ];
    
    y = addTable("Debt Maturity Schedule", debtMaturityData, y);
    y = checkPageBreak(y);
    
    if (analysisData.riskAnalysis.interestExpense) {
      y += 10;
      y = addParagraph(
        `Interest expense for the period was $${analysisData.riskAnalysis.interestExpense.current}M, ` +
        `representing an increase of $${analysisData.riskAnalysis.interestExpense.increase}M compared to the prior period.`,
        y
      );
    }
  } else {
    y = addParagraph(
      "Financial risk factors, including debt obligations and operational challenges, " +
      "could significantly impact the company's operations and cash flow.",
      y
    );
  }
  y = checkPageBreak(y);

  // Liquidity Analysis
  if (analysisData.liquidity) {
    doc.addPage();
    y = margin;
    y = addSectionHeader("Liquidity Analysis", y);
    
    if (analysisData.liquidity.cashPosition) {
      y = addParagraph(
        `As of ${analysisData.liquidity.cashPosition.asOfDate}, the company had $${analysisData.liquidity.cashPosition.total}M ` +
        `in cash and cash equivalents.`,
        y
      );
      y += 10;
    }
    
    if (analysisData.liquidity.balanceSheet) {
      const liq = analysisData.liquidity.balanceSheet;
      const liquidityData = [
        { Metric: "Current Ratio", Value: `${liq.currentRatio}x` },
        { Metric: "Quick Ratio", Value: `${liq.quickRatio}x` },
        { Metric: "Working Capital", Value: `$${liq.workingCapital}M` },
        { Metric: "Current Assets", Value: `$${liq.currentAssets}M` },
        { Metric: "Current Liabilities", Value: `$${liq.currentLiabilities}M` }
      ];
      
      y = addTable("Liquidity Ratios", liquidityData, y);
    }
    
    if (analysisData.liquidity.revolvingCredit) {
      y += 10;
      y = addParagraph(
        `The company maintains a revolving credit facility with total availability of ` +
        `$${analysisData.liquidity.revolvingCredit.totalAvailability}M, with ` +
        `$${analysisData.liquidity.revolvingCredit.availableAmount}M currently available. ` +
        `The facility matures in ${analysisData.liquidity.revolvingCredit.maturityDate}.`,
        y
      );
    }
    
    y = checkPageBreak(y);
  }

  // Profitability Analysis
  if (analysisData.profitability?.revenue) {
    doc.addPage();
    y = margin;
    y = addSectionHeader("Profitability Analysis", y);
    
    const prof = analysisData.profitability.revenue;
    y = addParagraph(
      `The company reported total revenues of $${prof.h1_2025}M for H1 2025, compared to $${prof.h1_2024}M ` +
      `in the prior year period, representing year-over-year growth of ${prof.growth}%.`,
      y
    );
    
    y += 15;
    const revenueData = [
      { Period: "H1 2025", Revenue: `$${prof.h1_2025}M`, "Growth %": `${prof.growth}%` },
      { Period: "H1 2024", Revenue: `$${prof.h1_2024}M`, "Growth %": "Baseline" }
    ];
    
    y = addTable("Revenue Performance", revenueData, y);
    
    if (analysisData.profitability.productConcentration) {
      y += 10;
      const conc = analysisData.profitability.productConcentration;
      y = addParagraph(
        `Top 10 products contributed ${conc.current}% of total revenues, up from ${conc.previous}% in the prior year.`,
        y
      );
    }
    
    y = checkPageBreak(y);
  }

  // Cash Flow Analysis
  if (analysisData.cashFlow?.summary) {
    doc.addPage();
    y = margin;
    y = addSectionHeader("Cash Flow Analysis", y);
    
    const cf = analysisData.cashFlow.summary;
    const cashFlowData = [
      { Activity: "Operating Activities", Current: `$${cf.operating.current}M`, Previous: `$${cf.operating.previous}M`, Change: `$${cf.operating.change}M` },
      { Activity: "Investing Activities", Current: `$${cf.investing.current}M`, Previous: `$${cf.investing.previous}M`, Change: `$${cf.investing.change}M` },
      { Activity: "Financing Activities", Current: `$${cf.financing.current}M`, Previous: `$${cf.financing.previous}M`, Change: `$${cf.financing.change}M` }
    ];
    
    y = addTable("Cash Flow Summary", cashFlowData, y);
    
    y += 10;
    y = addParagraph(
      `Operating cash flow was $${cf.operating.current}M, ${cf.operating.change >= 0 ? 'an increase' : 'a decrease'} ` +
      `of $${Math.abs(cf.operating.change)}M from the prior period.`,
      y
    );
    
    y = checkPageBreak(y);
  }

  // AI Recommendation
  if (analysisData?.aiRecommendation) {
    doc.addPage();
    y = margin;
    y = addSectionHeader("AI Recommendation", y);
    
    const aiRec = typeof analysisData.aiRecommendation === 'string' 
      ? JSON.parse(analysisData.aiRecommendation)
      : analysisData.aiRecommendation;
    
    if (aiRec.overallAssessment) {
      y = addParagraph(aiRec.overallAssessment, y);
      y += 10;
    }
    
    if (aiRec.commentarySummary && aiRec.commentarySummary.length > 0) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Key Observations:", margin, y);
      doc.setFont("helvetica", "normal");
      y += 15;
      
      aiRec.commentarySummary.forEach((comment: string) => {
        doc.setFontSize(10);
        const bulletText = doc.splitTextToSize(`• ${comment}`, pageWidth - margin * 2 - 10);
        doc.text(bulletText, margin + 10, y);
        y += bulletText.length * 12 + 8;
        y = checkPageBreak(y);
      });
    }
    
    if (aiRec.strengths && aiRec.strengths.length > 0) {
      y += 10;
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(34, 139, 34);
      doc.text("Strengths:", margin, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      y += 15;
      
      aiRec.strengths.forEach((strength: string) => {
        doc.setFontSize(10);
        const bulletText = doc.splitTextToSize(`✓ ${strength}`, pageWidth - margin * 2 - 10);
        doc.text(bulletText, margin + 10, y);
        y += bulletText.length * 12 + 6;
        y = checkPageBreak(y);
      });
    }
    
    if (aiRec.weaknesses && aiRec.weaknesses.length > 0) {
      y += 10;
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(178, 34, 34);
      doc.text("Weaknesses:", margin, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      y += 15;
      
      aiRec.weaknesses.forEach((weakness: string) => {
        doc.setFontSize(10);
        const bulletText = doc.splitTextToSize(`⚠ ${weakness}`, pageWidth - margin * 2 - 10);
        doc.text(bulletText, margin + 10, y);
        y += bulletText.length * 12 + 6;
        y = checkPageBreak(y);
      });
    }
    
    if (aiRec.actionItems && aiRec.actionItems.length > 0) {
      y += 10;
      y = checkPageBreak(y, 150);
      
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Action Items:", margin, y);
      doc.setFont("helvetica", "normal");
      y += 15;
      
      const actionItemsData = aiRec.actionItems.map((item: any) => ({
        Priority: item.priority.toUpperCase(),
        Category: item.category,
        Recommendation: item.recommendation.substring(0, 50) + "..."
      }));
      
      y = addTable("Recommended Actions", actionItemsData, y);
    }
    
    if (aiRec.ratingGuidance) {
      y += 10;
      y = checkPageBreak(y);
      
      doc.setFillColor(241, 245, 249);
      doc.roundedRect(margin, y, pageWidth - margin * 2, 80, 5, 5, "F");
      y += 20;
      
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("Rating Guidance:", margin + 10, y);
      doc.setFont("helvetica", "normal");
      y += 18;
      
      y = addKeyValuePair("Risk Level", aiRec.ratingGuidance.riskLevel, y - 10);
      y = addKeyValuePair("Equivalent Rating", aiRec.ratingGuidance.equivalentRating, y - 10);
      
      if (aiRec.ratingGuidance.suggestedAction) {
        y += 5;
        doc.setFontSize(9);
        const actionText = doc.splitTextToSize(
          `Suggested Action: ${aiRec.ratingGuidance.suggestedAction}`,
          pageWidth - margin * 2 - 30
        );
        doc.text(actionText, margin + 10, y);
      }
    }
    
    // Disclaimer
    y += 30;
    y = checkPageBreak(y);
    
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(margin, y, pageWidth - margin * 2, 60, 5, 5, "F");
    
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    const disclaimerLines = doc.splitTextToSize(
      "DISCLAIMER: This is preliminary system guidance only. Final credit decision rests with the Credit Compliance Team. " +
      "This report is for informational purposes only and does not constitute financial advice.",
      pageWidth - margin * 2 - 20
    );
    doc.text(disclaimerLines, margin + 10, y + 15);
  }

  // Add footers to all pages
  addFooter();

  // Save PDF
  const fileName = `${analysisData.company.ticker}_Financial_Report_${Date.now()}.pdf`;
  doc.save(fileName);
};

// Keep the React component for backward compatibility if needed
export default generatePDF;