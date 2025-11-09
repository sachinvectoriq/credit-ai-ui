import React, { useState } from 'react';
// Using type-only import for types that don't exist at runtime (e.g., ReactNode, FC)
import type { ReactNode, FC } from 'react'; 
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  AlertCircle, 
  ArrowUpRight, 
  ArrowDownRight, 
  Info, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

// --- Type Definitions ---

type ExpandedSectionKey = 'assets' | 'liabilities' | 'ratios';

interface ExpandedSectionsState {
  assets: boolean;
  liabilities: boolean;
  ratios: boolean;
}

interface SummaryCardProps {
  title: string;
  current: number;
  previous: number;
  fy2024: number;
  trend?: number;
  color: 'blue' | 'green' | 'red' | 'purple' | 'amber' | 'slate';
  icon: React.ElementType;
}

interface TableHeaderProps {
  columns: string[];
}

interface DataRowProps {
  label: string;
  // Correctly uses ReactNode imported as a type
  values: (number | ReactNode)[]; 
  isSubItem?: boolean;
  isTotal?: boolean;
  isSectionHeader?: boolean;
}

interface CollapsibleSectionProps {
  title: string;
  sectionKey: ExpandedSectionKey;
  children: ReactNode;
  color?: 'slate'; 
}


const FinancialStatementsTab = () => {
  const [activeSubTab, setActiveSubTab] = useState<'balance-sheet' | 'income-statement' | 'cash-flow-statement'>('balance-sheet');
  const [expandedSections, setExpandedSections] = useState<ExpandedSectionsState>({
    assets: true,
    liabilities: true,
    ratios: true
  });

  const toggleSection = (section: ExpandedSectionKey): void => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const formatCurrency = (value: number | null | undefined | ''): string => {
    if (value === null || value === undefined || value === '') return '-';
    const numericValue = typeof value === 'string' ? parseFloat(value) : value; 

    const absValue = Math.abs(numericValue);
    const formatted = absValue >= 1000000 
      ? `$${(numericValue / 1000000).toFixed(1)}M`
      : absValue >= 1000 
      ? `$${(numericValue / 1000).toFixed(0)}K`
      : `$${numericValue.toFixed(0)}`;
    
    return numericValue < 0 ? `(${formatted.replace('$-', '$')})` : formatted;
  };

  const PercentBadge = ({ value, showZero = true }: { value: number | null | undefined | '', showZero?: boolean }): ReactNode => {
    if (value === null || value === undefined || value === '' || (typeof value === 'number' && !showZero && value === 0)) {
      return <span className="text-gray-400">-</span>;
    }
    
    const numericValue = typeof value === 'string' ? parseFloat(value) : (value as number);

    if (numericValue === 0 && showZero) return <span className="text-gray-500 text-sm">0.0%</span>;
    
    const isPositive = numericValue > 0;
    
    return (
      <span className={`inline-flex items-center gap-0.5 text-sm font-semibold px-2 py-0.5 rounded ${
        isPositive ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'
      }`}>
        {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {Math.abs(numericValue).toFixed(1)}%
      </span>
    );
  };

  // Using FC from type import
  const TableHeader: FC<TableHeaderProps> = ({ columns }) => (
    <thead className="bg-gradient-to-r from-slate-100 to-slate-50 sticky top-0 z-10">
      <tr>
        {columns.map((col, idx) => (
          <th 
            key={idx}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 border-slate-300 ${
              idx === 0 ? 'text-left text-slate-700' : 'text-right text-slate-600'
            }`}
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );

  // Using FC from type import
  const DataRow: FC<DataRowProps> = ({ label, values, isSubItem = false, isTotal = false, isSectionHeader = false }) => {
    if (isSectionHeader) {
      return (
        <tr className="bg-slate-100 border-t-2 border-slate-300"> 
          <td colSpan={values.length + 1} className="px-4 py-2 text-sm font-bold text-slate-700">
            {label}
          </td>
        </tr>
      );
    }

    return (
      <tr className={`group transition-colors ${
        isTotal 
          ? 'bg-slate-100 font-bold border-t-2 border-b-2 border-slate-300' 
          : 'hover:bg-slate-50' 
      }`}>
        <td className={`px-4 py-3 text-sm border-b border-slate-200 ${
          isSubItem ? 'pl-8 text-slate-600' : isTotal ? 'font-bold text-slate-900' : 'text-slate-700 font-medium'
        }`}>
          {label}
        </td>
        {values.map((val, idx) => (
          <td key={idx} className={`px-4 py-3 text-right text-sm border-b border-slate-200 ${
            isTotal ? 'font-bold text-slate-900' : 'text-slate-700'
          }`}>
            {typeof val === 'number' ? formatCurrency(val) : val}
          </td>
        ))}
      </tr>
    );
  };

  // Using FC from type import
  const SummaryCard: FC<SummaryCardProps> = ({ title, current, previous, fy2024, trend, color, icon: Icon }) => {
    const colorClasses = {
      blue: 'from-blue-600 to-blue-700',
      green: 'from-green-600 to-green-700',
      red: 'from-red-600 to-red-700',
      purple: 'from-purple-600 to-purple-700',
      amber: 'from-amber-600 to-amber-700',
      slate: 'from-slate-600 to-slate-700',
    };

    return (
      <div className="bg-white rounded-lg border-2 border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
        <div className={`bg-gradient-to-r ${colorClasses[color]} p-3 text-white`}>
          <div className="flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4" />}
            <p className="text-xs font-semibold uppercase tracking-wide">{title}</p>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-3">
            <p className="text-xs text-slate-500 mb-1">Latest Quarter (Q2 2025)</p>
            <p className="text-2xl font-bold text-slate-900">{formatCurrency(current)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200">
            <div>
              <p className="text-xs text-slate-500 mb-1">Q1 2025</p>
              <p className="text-sm font-semibold text-slate-700">{formatCurrency(previous)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">FY 2024</p>
              <p className="text-sm font-semibold text-slate-700">{formatCurrency(fy2024)}</p>
            </div>
          </div>
          {trend !== undefined && trend !== null && (
            <div className="mt-3 pt-3 border-t border-slate-200">
              <PercentBadge value={trend} />
            </div>
          )}
        </div>
      </div>
    );
  };

  // Using FC from type import
  const CollapsibleSection: FC<CollapsibleSectionProps> = ({ title, sectionKey, children }) => {
    const isExpanded = expandedSections[sectionKey];
    
    const colorClasses = 'bg-slate-700 hover:bg-slate-800'; 

    return (
      <div className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection(sectionKey)}
          className={`w-full ${colorClasses} text-white p-4 flex items-center justify-between transition-colors`}
        >
          <h3 className="text-lg font-bold flex items-center gap-2">
            {title}
          </h3>
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        {isExpanded && <div className="overflow-x-auto">{children}</div>}
      </div>
    );
  };

  const renderBalanceSheet = (): ReactNode => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard 
          title="Total Assets"
          current={13832000}
          previous={13428000}
          fy2024={13469000}
          trend={-2.9}
          color="blue"
          icon={TrendingUp}
        />
        <SummaryCard 
          title="Total Liabilities"
          current={7324000}
          previous={6995000}
          fy2024={6925000}
          trend={-4.5}
          color="red"
          icon={TrendingDown}
        />
        <SummaryCard 
          title="Equity"
          current={6440000}
          previous={6361000}
          fy2024={6473000}
          trend={-1.2}
          color="green"
          icon={DollarSign}
        />
        <SummaryCard 
          title="Working Capital"
          current={1006000}
          previous={968000}
          fy2024={1050000}
          color="purple" 
          icon={Info}
        />
      </div>

      <CollapsibleSection title="Assets" sectionKey="assets" color="slate">
        <table className="w-full">
          <TableHeader columns={['Item', 'Q 06/30/2025', 'Q 03/31/2025', 'Q Δ% 1', 'Q 12/31/2024', 'Q Δ% 2', 'FY 2024', 'FY 2023', 'FY2023 Δ%', 'FY 2022', 'FY2022 Δ%']} />
          <tbody>
            <DataRow isSectionHeader label="Current Assets" values={Array(10).fill('')} />
            <DataRow 
              label="Cash and Equivalents"
              values={[266000, 202000, <PercentBadge value={-24.1} />, 305000, <PercentBadge value={51.0} />, 305000, 331000, <PercentBadge value={8.5} />, 354000, <PercentBadge value={6.9} />]}
              isSubItem
            />
            <DataRow 
              label="Accounts Receivable"
              values={[1084000, 1007000, <PercentBadge value={-7.1} />, 1026000, <PercentBadge value={1.9} />, 1026000, 839000, <PercentBadge value={-18.2} />, 724000, <PercentBadge value={-13.7} />]}
              isSubItem
            />
            <DataRow 
              label="Inventories"
              values={[1051000, 1031000, <PercentBadge value={-1.9} />, 1036000, <PercentBadge value={0.5} />, 1036000, 1028000, <PercentBadge value={-0.8} />, 628000, <PercentBadge value={-38.9} />]}
              isSubItem
            />
            <DataRow 
              label="Current Assets"
              values={[2846000, 2694000, <PercentBadge value={-5.3} />, 2788000, <PercentBadge value={3.5} />, 2788000, 2742000, <PercentBadge value={-1.6} />, 2137000, <PercentBadge value={-22.1} />]}
              isTotal
            />
            <DataRow 
              label="Total Assets"
              values={[13832000, 13428000, <PercentBadge value={-2.9} />, 13469000, <PercentBadge value={0.3} />, 13469000, 13442000, <PercentBadge value={-0.2} />, 11144000, <PercentBadge value={-17.1} />]}
              isTotal
            />
          </tbody>
        </table>
      </CollapsibleSection>

      <CollapsibleSection title="Liabilities" sectionKey="liabilities" color="slate">
        <table className="w-full">
          <TableHeader columns={['Item', 'Q 06/30/2025', 'Q 03/31/2025', 'Q Δ% 1', 'Q 12/31/2024', 'Q Δ% 2', 'FY 2024', 'FY 2023', 'FY2023 Δ%', 'FY 2022', 'FY2022 Δ%']} />
          <tbody>
            <DataRow isSectionHeader label="Current Liabilities" values={Array(10).fill('')} />
            <DataRow 
              label="Short-Term Debt"
              values={[28000, 40000, <PercentBadge value={42.9} />, 40000, <PercentBadge value={0} showZero={false} />, 40000, 30000, <PercentBadge value={-25.0} />, 25000, <PercentBadge value={-16.7} />]}
              isSubItem
            />
            <DataRow 
              label="Accounts Payable"
              values={[449000, 427000, <PercentBadge value={-4.9} />, 389000, <PercentBadge value={-8.9} />, 389000, 522000, <PercentBadge value={34.2} />, 370000, <PercentBadge value={-29.1} />]}
              isSubItem
            />
            <DataRow 
              label="Other Current Liabilities"
              values={[408000, 313000, <PercentBadge value={-23.3} />, 403000, <PercentBadge value={28.8} />, 403000, 400000, <PercentBadge value={-0.7} />, 342000, <PercentBadge value={-14.5} />]}
              isSubItem
            />
            <DataRow 
              label="Current Liabilities"
              values={[1840000, 1726000, <PercentBadge value={-6.2} />, 1738000, <PercentBadge value={0.7} />, 1738000, 1579000, <PercentBadge value={-9.1} />, 1296000, <PercentBadge value={-17.9} />]}
              isTotal
            />
            <DataRow isSectionHeader label="Non-Current Liabilities" values={Array(10).fill('')} />
            <DataRow 
              label="Long-Term Debt"
              values={[4931000, 4789000, <PercentBadge value={-2.9} />, 4744000, <PercentBadge value={-0.9} />, 4744000, 4532000, <PercentBadge value={-4.5} />, 2411000, <PercentBadge value={-46.8} />]}
              isSubItem
            />
            <DataRow 
              label="Total Liabilities"
              values={[7324000, 6995000, <PercentBadge value={-4.5} />, 6925000, <PercentBadge value={-1.0} />, 6925000, 6522000, <PercentBadge value={-5.8} />, 4043000, <PercentBadge value={-38.0} />]}
              isTotal
            />
            <DataRow 
              label="Stockholders Equity"
              values={[6440000, 6361000, <PercentBadge value={-1.2} />, 6473000, <PercentBadge value={1.8} />, 6473000, 6850000, <PercentBadge value={5.8} />, 7033000, <PercentBadge value={2.7} />]}
              isTotal
            />
          </tbody>
        </table>
      </CollapsibleSection>

      <CollapsibleSection title="Financial Ratios" sectionKey="ratios" color="slate">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-lg border-2 border-slate-200">
              <p className="text-sm font-medium text-slate-700 mb-2">Current Ratio</p>
              <p className="text-3xl font-bold text-slate-900">1.55</p>
              <p className="text-xs text-slate-600 mt-2">Ability to pay short-term debts</p>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-lg border-2 border-slate-200">
              <p className="text-sm font-medium text-slate-700 mb-2">Quick Ratio</p>
              <p className="text-3xl font-bold text-slate-900">0.98</p>
              <p className="text-xs text-slate-600 mt-2">Liquidity without inventory</p>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-lg border-2 border-slate-200">
              <p className="text-sm font-medium text-slate-700 mb-2">Debt to Equity</p>
              <p className="text-3xl font-bold text-slate-900">1.13</p>
              <p className="text-xs text-slate-600 mt-2">Financial leverage</p>
            </div>
          </div>
          <table className="w-full">
            <TableHeader columns={['Ratio', 'Q 06/30/2025', 'Q 03/31/2025', 'Q 12/31/2024', 'FY 2024', 'FY 2023', 'FY 2022']} />
            <tbody>
              <DataRow label="Current Ratio" values={[1.55, 1.56, 1.60, 1.60, 1.74, 1.65]} />
              <DataRow label="Quick Ratio" values={[0.98, 0.96, 1.01, 1.01, 1.09, 1.16]} />
              <DataRow label="Debt to Equity" values={[1.13, 1.09, 1.06, 1.06, 0.94, 0.57]} />
            </tbody>
          </table>
        </div>
      </CollapsibleSection>
    </div>
  );

  const renderIncomeStatement = (): ReactNode => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard 
          title="Revenue"
          current={1278000}
          previous={1137000}
          fy2024={4791000}
          trend={-11.0}
          color="blue"
          icon={DollarSign}
        />
        <SummaryCard 
          title="Gross Profit"
          current={753000}
          previous={655000}
          fy2024={2919000}
          trend={-13.0}
          color="green"
          icon={TrendingUp}
        />
        <SummaryCard 
          title="Operating Income"
          current={11000}
          previous={-61000}
          fy2024={206000}
          trend={-654.5}
          color="purple"
          icon={TrendingUp}
        />
        <SummaryCard 
          title="Net Income"
          current={-62000}
          previous={-212000}
          fy2024={-317000}
          trend={-241.9}
          color="red"
          icon={TrendingDown}
        />
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-amber-900">Profitability Alert</h4>
            <p className="text-sm text-amber-800 mt-1">
              Company reported a net loss this quarter. However, operating income improved significantly from previous quarter.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-4">
          <h3 className="text-lg font-bold text-white">Income Statement</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <TableHeader columns={['Item', 'Q 06/30/2025', 'Q 03/31/2025', 'Q Δ% 1', 'Q 12/31/2024', 'Q Δ% 2', 'FY 2024', 'FY 2023', 'FY2023 Δ%', 'FY 2022', 'FY2022 Δ%']} />
            <tbody>
              <DataRow 
                label="Total Revenue"
                values={[1278000, 1137000, <PercentBadge value={-11.0} />, 1280000, <PercentBadge value={12.6} />, 4791000, 4146000, <PercentBadge value={-13.5} />, 3768000, <PercentBadge value={-9.1} />]}
                isTotal
              />
              <DataRow 
                label="Cost of Revenue"
                values={[525000, 482000, <PercentBadge value={-8.2} />, 501000, <PercentBadge value={3.9} />, 1872000, 1642000, <PercentBadge value={-12.3} />, 1519000, <PercentBadge value={-7.5} />]}
                isSubItem
              />
              <DataRow 
                label="Gross Profit"
                values={[753000, 655000, <PercentBadge value={-13.0} />, 779000, <PercentBadge value={18.9} />, 2919000, 2504000, <PercentBadge value={-14.2} />, 2249000, <PercentBadge value={-10.2} />]}
                isTotal
              />
              <DataRow 
                label="Gross Margin %"
                values={['58.9%', '57.6%', '-', '60.9%', '-', '60.9%', '60.4%', '-', '59.7%', '-']}
              />
              <DataRow 
                label="Operating Expenses"
                values={[742000, 716000, <PercentBadge value={-3.5} />, 693000, <PercentBadge value={-3.2} />, 2713000, 2300000, <PercentBadge value={-15.2} />, 2029000, <PercentBadge value={-11.8} />]}
                isSubItem
              />
              <DataRow 
                label="Operating Income"
                values={[11000, -61000, <PercentBadge value={-654.5} />, 86000, <PercentBadge value={241.0} />, 206000, 204000, <PercentBadge value={-1.0} />, 220000, <PercentBadge value={7.8} />]}
                isTotal
              />
              <DataRow 
                label="Operating Margin %"
                values={['0.9%', '-5.4%', '-', '6.7%', '-', '4.3%', '4.9%', '-', '5.8%', '-']}
              />
              <DataRow 
                label="EBIT"
                values={[-19000, -86000, <PercentBadge value={-352.6} />, 88000, <PercentBadge value={202.3} />, 165000, 117000, <PercentBadge value={-29.1} />, 219000, <PercentBadge value={87.2} />]}
                isSubItem
              />
              <DataRow 
                label="Interest Expense"
                values={[128000, 94000, <PercentBadge value={-26.6} />, 98000, <PercentBadge value={4.3} />, 399000, 283000, <PercentBadge value={-29.1} />, 146000, <PercentBadge value={-48.4} />]}
                isSubItem
              />
              <DataRow 
                label="Tax"
                values={[-89000, 31000, <PercentBadge value={134.8} />, -8000, <PercentBadge value={-125.8} />, 71000, 82000, <PercentBadge value={15.5} />, 58000, <PercentBadge value={-29.3} />]}
                isSubItem
              />
              <DataRow 
                label="Net Income"
                values={[-62000, -212000, <PercentBadge value={-241.9} />, -3000, <PercentBadge value={98.6} />, -317000, -260000, <PercentBadge value={18.0} />, 6000, <PercentBadge value={102.3} />]}
                isTotal
              />
              <DataRow 
                label="Net Margin %"
                values={['-4.9%', '-18.6%', '-', '-0.2%', '-', '-6.6%', '-6.3%', '-', '0.2%', '-']}
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCashFlow = (): ReactNode => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard 
          title="Operating CF"
          current={35000}
          previous={-25000}
          fy2024={232000}
          color="green"
          icon={TrendingUp}
        />
        <SummaryCard 
          title="Investing CF"
          current={-90000}
          previous={-116000}
          fy2024={-412000}
          color="blue"
          icon={DollarSign}
        />
        <SummaryCard 
          title="Financing CF"
          current={90000}
          previous={31000}
          fy2024={178000}
          color="purple"
          icon={TrendingUp}
        />
        <SummaryCard 
          title="Free Cash Flow"
          current={-54000}
          previous={-135000}
          fy2024={-59000}
          color="amber"
          icon={AlertCircle}
        />
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-amber-900">Cash Flow Analysis</h4>
            <p className="text-sm text-amber-800 mt-1">
              Negative free cash flow indicates capital expenditures exceeded operating cash generation this quarter.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-4">
          <h3 className="text-lg font-bold text-white">Cash Flow Statement</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <TableHeader columns={['Item', 'Q 06/30/2025', 'Q 03/31/2025', 'Q 12/31/2024', 'FY 2024', 'FY 2023', 'FY 2022']} />
            <tbody>
              <DataRow isSectionHeader label="Operating Activities:" values={Array(6).fill('')} />
              <DataRow 
                label="Depreciation"
                values={[107000, 106000, 106000, 436000, 382000, 379000]}
                isSubItem
              />
              <DataRow 
                label="Working Capital Changes"
                values={[48000, 0, -182000, -87000, -287000, -19000]}
                isSubItem
              />
              <DataRow 
                label="Operating Cash Flow"
                values={[35000, -25000, 22000, 232000, -17000, 345000]}
                isTotal
              />
              
              <DataRow isSectionHeader label="Investing Activities:" values={Array(6).fill('')} />
              <DataRow 
                label="Capital Expenditures"
                values={[-89000, -110000, -92000, -291000, -181000, -175000]}
                isSubItem
              />
              <DataRow 
                label="Investments"
                values={[0, 0, -2000, 2000, -1000, 5000]}
                isSubItem
              />
              <DataRow 
                label="Investing Cash Flow"
                values={[-90000, -116000, -185000, -412000, -2109000, -215000]}
                isTotal
              />
              
              <DataRow isSectionHeader label="Financing Activities:" values={Array(6).fill('')} />
              <DataRow 
                label="Debt Repayment"
                values={[111000, 40000, 149000, 201000, 2115000, 2458000]}
                isSubItem
              />
              <DataRow 
                label="Financing Cash Flow"
                values={[90000, 31000, 146000, 178000, 2078000, 81000]}
                isTotal
              />
              
              <DataRow 
                label="Net Cash Flow"
                values={[35000, -110000, -17000, -2000, -48000, 211000]}
                isTotal
              />
              <DataRow 
                label="Free Cash Flow"
                values={[-54000, -135000, -70000, -59000, -198000, 170000]}
                isTotal
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-[1800px] mx-auto p-6 bg-slate-50 min-h-screen">
      
      <div className="mb-8">
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl p-6 text-white shadow-lg">
          <h1 className="text-2xl font-bold">Financial Statements - BLCO</h1>
        </div>
      </div>

      <div className="mb-6 bg-slate-100 border-l-4 border-slate-400 p-4 rounded-r-lg">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-slate-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-slate-900">How to Use This Dashboard</h4>
            <p className="text-sm text-slate-800 mt-1">
              <strong>Summary Cards</strong> show key metrics at a glance. <strong>Tables</strong> provide detailed multi-period comparisons. 
              <span className="inline-flex items-center text-green-700"> Green arrows (↗)</span> indicate positive changes, <span className="inline-flex items-center text-red-700">red arrows (↘)</span> show declines. 
              Click section headers to expand/collapse detailed data. All figures are in thousands ($000s).
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border-2 border-slate-200 overflow-hidden mb-6">
        <div className="flex">
          <button
            onClick={() => setActiveSubTab('balance-sheet')}
            className={`flex-1 px-6 py-4 text-sm font-bold transition-all border-r border-slate-200 ${
              activeSubTab === 'balance-sheet'
                ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <span>Balance Sheet</span>
            </div>
          </button>
          <button
            onClick={() => setActiveSubTab('income-statement')}
            className={`flex-1 px-6 py-4 text-sm font-bold transition-all border-r border-slate-200 ${
              activeSubTab === 'income-statement'
                ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <DollarSign className="w-5 h-5" />
              <span>Income Statement</span>
            </div>
          </button>
          <button
            onClick={() => setActiveSubTab('cash-flow-statement')}
            className={`flex-1 px-6 py-4 text-sm font-bold transition-all ${
              activeSubTab === 'cash-flow-statement'
                ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <TrendingDown className="w-5 h-5" />
              <span>Cash Flow Statement</span>
            </div>
          </button>
        </div>
      </div>

      <div className="transition-all duration-300">
        {activeSubTab === 'balance-sheet' && renderBalanceSheet()}
        {activeSubTab === 'income-statement' && renderIncomeStatement()}
        {activeSubTab === 'cash-flow-statement' && renderCashFlow()}
      </div>

      <div className="mt-8 bg-gradient-to-r from-slate-100 to-slate-50 border-2 border-slate-300 p-5 rounded-xl">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-slate-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-slate-700">
            <p className="font-semibold mb-2">Important Notes:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li><strong>Analysis Method:</strong> Artificial Intelligence generated on October 15, 2025</li>
              <li><strong>Currency:</strong> All figures are in thousands of dollars ($000s) unless otherwise specified</li>
              <li><strong>Comparisons:</strong> Q Δ% shows quarter-over-quarter change; FY Δ% shows year-over-year change</li>
              <li><strong>Negative values:</strong> Displayed in parentheses, e.g., ($62K) represents a loss of $62,000</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialStatementsTab;
