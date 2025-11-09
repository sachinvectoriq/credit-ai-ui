import React from 'react';
import { FileBarChart, Calendar, DollarSign, TrendingUp } from 'lucide-react';

// TypeScript interfaces
interface AgingRow {
  account: string;
  current: number;
  days1_30: number;
  days31_60: number;
  days61_90: number;
  days91_180: number;
  days181plus: number;
  total: number;
}

interface AccountSummary {
  invoicesPaid: {
    l3m: number;
    ltm: number;
    sinceInception: number;
  };
  amountPaid: {
    l3m: number;
    ltm: number;
    sinceInception: number;
  };
  averageDPD: {
    l3m: number;
    ltm: number;
    sinceInception: number;
  };
  lastPaymentDate: string;
  lastPaymentAmount: number;
  netTerms: string;
  totalCredits: number;
}

interface AccountOverviewData {
  agingData: AgingRow[];
  summary: AccountSummary;
}

// Data from HTML report section 6
const accountOverviewData: AccountOverviewData = {
  agingData: [
    { account: 'OSC01', current: 0, days1_30: 0, days31_60: 0, days61_90: 0, days91_180: 0, days181plus: 0, total: 0 },
    { account: 'OCS03', current: 0, days1_30: 0, days31_60: 0, days61_90: 0, days91_180: 0, days181plus: 0, total: 0 },
    { account: 'Aviation', current: 0, days1_30: 0, days31_60: 0, days61_90: 0, days91_180: 0, days181plus: 0, total: 0 },
    { account: 'SJA01', current: 29250, days1_30: 3931.20, days31_60: 0, days61_90: 0, days91_180: 0, days181plus: -1837.20, total: 31344 },
    { account: 'CE', current: 126067.05, days1_30: 0, days31_60: 0, days61_90: 0, days91_180: 0, days181plus: 0, total: 126067.05 },
    { account: 'Scientific', current: 53856, days1_30: 6120, days31_60: 0, days61_90: 0, days91_180: 0, days181plus: 0, total: 59976 },
    { account: 'Services', current: 192792.82, days1_30: 0, days31_60: 0, days61_90: 0, days91_180: 0, days181plus: 0, total: 192792.82 },
    { account: 'Actalent Canada', current: 0, days1_30: 0, days31_60: 0, days61_90: 0, days91_180: 0, days181plus: 0, total: 0 },
    { account: 'Services_EASCA', current: 0, days1_30: 0, days31_60: 0, days61_90: 0, days91_180: 0, days181plus: 0, total: 0 },
    { account: 'Aerotek Canada', current: 0, days1_30: 0, days31_60: 0, days61_90: 0, days91_180: 0, days181plus: 0, total: 0 },
    { account: 'Aston Carter Canada', current: 0, days1_30: 0, days31_60: 0, days61_90: 0, days91_180: 0, days181plus: 0, total: 0 },
    { account: 'MLA/IEL', current: 0, days1_30: 0, days31_60: 0, days61_90: 0, days91_180: 0, days181plus: 0, total: 0 },
    { account: 'Teksystems', current: 15536.04, days1_30: 2917.90, days31_60: 0, days61_90: 0, days91_180: 0, days181plus: 0, total: 18453.94 },
    { account: 'Tek Global', current: 0, days1_30: 0, days31_60: 0, days61_90: 0, days91_180: 0, days181plus: 0, total: 0 }
  ],
  summary: {
    invoicesPaid: { l3m: 1031, ltm: 1677, sinceInception: 15561 },
    amountPaid: { l3m: -7703420, ltm: -13757234, sinceInception: -55589162 },
    averageDPD: { l3m: 13, ltm: 15, sinceInception: 8 },
    lastPaymentDate: '09-26-2025',
    lastPaymentAmount: -76428,
    netTerms: 'N90',
    totalCredits: -1837.20
  }
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

const SummaryCard: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string | number;
  subtitle?: string;
  colorClass: string;
}> = ({ icon: Icon, title, value, subtitle, colorClass }) => (
  <div className={`bg-white border ${colorClass} rounded-lg p-4`}>
    <div className="flex items-center gap-2 mb-2">
      <Icon className={`w-4 h-4 ${colorClass.replace('border-', 'text-')}`} />
      <span className="text-sm font-medium text-slate-700">{title}</span>
    </div>
    <div className="text-2xl font-bold text-slate-900">{value}</div>
    {subtitle && <div className="text-xs text-slate-500 mt-1">{subtitle}</div>}
  </div>
);

const AccountOverview: React.FC = () => {
  const totals = accountOverviewData.agingData.find(row => row.account === 'Totals') || {
    current: 417501.91,
    days1_30: 12969.10,
    days31_60: 0,
    days61_90: 0,
    days91_180: 0,
    days181plus: -1837.20,
    total: 428633.81
  };

  // Filter out rows with all zeros and header rows
  const activeAccounts = accountOverviewData.agingData.filter(
    row => row.total !== 0
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 bg-slate-50">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <FileBarChart className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Account Overview</h2>
            <p className="text-sm text-slate-600">
              Comprehensive view of outstanding receivables by aging period and account summary metrics
            </p>
          </div>
        </div>
      </div>

      {/* Key Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          icon={DollarSign}
          title="Total Outstanding"
          value={formatCurrency(totals.total)}
          colorClass="border-blue-200"
        />
        <SummaryCard
          icon={Calendar}
          title="Last Payment"
          value={accountOverviewData.summary.lastPaymentDate}
          subtitle={formatCurrency(accountOverviewData.summary.lastPaymentAmount)}
          colorClass="border-green-200"
        />
        <SummaryCard
          icon={TrendingUp}
          title="Avg DPD (LTM)"
          value={`${accountOverviewData.summary.averageDPD.ltm} days`}
          subtitle={`Terms: ${accountOverviewData.summary.netTerms}`}
          colorClass="border-purple-200"
        />
        <SummaryCard
          icon={FileBarChart}
          title="Total Credits"
          value={formatCurrency(accountOverviewData.summary.totalCredits)}
          colorClass="border-orange-200"
        />
      </div>

      {/* Aging Analysis Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-semibold text-slate-900">Receivables Aging Analysis</h3>
          <p className="text-sm text-slate-600 mt-1">Outstanding balances by account and aging period</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Account
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Current
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  1-30
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  31-60
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  61-90
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  91-180
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  181+
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {activeAccounts.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="px-6 py-3 text-sm font-medium text-slate-900">
                    {row.account}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-slate-600">
                    {formatCurrency(row.current)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-slate-600">
                    {formatCurrency(row.days1_30)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-slate-600">
                    {formatCurrency(row.days31_60)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-slate-600">
                    {formatCurrency(row.days61_90)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-slate-600">
                    {formatCurrency(row.days91_180)}
                  </td>
                  <td className={`px-4 py-3 text-sm text-right ${row.days181plus < 0 ? 'text-red-600 font-medium' : 'text-slate-600'}`}>
                    {formatCurrency(row.days181plus)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-semibold text-slate-900">
                    {formatCurrency(row.total)}
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-50 border-t-2 border-slate-300 font-semibold">
                <td className="px-6 py-3 text-sm text-slate-900">
                  Totals
                </td>
                <td className="px-4 py-3 text-sm text-right text-slate-900">
                  {formatCurrency(totals.current)}
                </td>
                <td className="px-4 py-3 text-sm text-right text-slate-900">
                  {formatCurrency(totals.days1_30)}
                </td>
                <td className="px-4 py-3 text-sm text-right text-slate-900">
                  {formatCurrency(totals.days31_60)}
                </td>
                <td className="px-4 py-3 text-sm text-right text-slate-900">
                  {formatCurrency(totals.days61_90)}
                </td>
                <td className="px-4 py-3 text-sm text-right text-slate-900">
                  {formatCurrency(totals.days91_180)}
                </td>
                <td className={`px-4 py-3 text-sm text-right ${totals.days181plus < 0 ? 'text-red-600' : 'text-slate-900'}`}>
                  {formatCurrency(totals.days181plus)}
                </td>
                <td className="px-4 py-3 text-sm text-right text-slate-900">
                  {formatCurrency(totals.total)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Account Summary Metrics */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-semibold text-slate-900">Payment History Summary</h3>
          <p className="text-sm text-slate-600 mt-1">Historical payment performance metrics</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Metric
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  L3M
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  LTM
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Since 2/17/2006
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Additional Info
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-3 text-sm font-medium text-slate-900">
                  Invoices Paid
                </td>
                <td className="px-4 py-3 text-sm text-right text-slate-600">
                  {accountOverviewData.summary.invoicesPaid.l3m.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm text-right text-slate-600">
                  {accountOverviewData.summary.invoicesPaid.ltm.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm text-right text-slate-600">
                  {accountOverviewData.summary.invoicesPaid.sinceInception.toLocaleString()}
                </td>
                <td className="px-6 py-3 text-sm text-slate-700">
                  <span className="font-medium">Last Payment Date:</span> {accountOverviewData.summary.lastPaymentDate}
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-3 text-sm font-medium text-slate-900">
                  $ Paid
                </td>
                <td className="px-4 py-3 text-sm text-right text-slate-600">
                  {formatCurrency(accountOverviewData.summary.amountPaid.l3m)}
                </td>
                <td className="px-4 py-3 text-sm text-right text-slate-600">
                  {formatCurrency(accountOverviewData.summary.amountPaid.ltm)}
                </td>
                <td className="px-4 py-3 text-sm text-right text-slate-600">
                  {formatCurrency(accountOverviewData.summary.amountPaid.sinceInception)}
                </td>
                <td className="px-6 py-3 text-sm text-slate-700">
                  <span className="font-medium">Amount:</span> {formatCurrency(accountOverviewData.summary.lastPaymentAmount)}
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-3 text-sm font-medium text-slate-900">
                  Average DPD
                </td>
                <td className="px-4 py-3 text-sm text-right text-slate-600">
                  {accountOverviewData.summary.averageDPD.l3m}
                </td>
                <td className="px-4 py-3 text-sm text-right text-slate-600">
                  {accountOverviewData.summary.averageDPD.ltm}
                </td>
                <td className="px-4 py-3 text-sm text-right text-slate-600">
                  {accountOverviewData.summary.averageDPD.sinceInception}
                </td>
                <td className="px-6 py-3 text-sm text-slate-700">
                  <span className="font-medium">Net Terms:</span> {accountOverviewData.summary.netTerms}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountOverview;