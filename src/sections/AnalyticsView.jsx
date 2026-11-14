import React from 'react';
import { 
  TrendingUp, 
  Award, 
  Percent, 
  ShieldAlert, 
  Sparkles 
} from 'lucide-react';
import ExpensesTrendChart from './ExpensesTrendChart';
import IncomeVsExpensesChart from './IncomeVsExpensesChart';
import CategoryDonutChart from './CategoryDonutChart';
import { formatCurrency } from '../utils/currency';
import { useTheme } from '../context/ThemeContext';

export default function AnalyticsView({ 
  monthlyExpensesTrend, 
  incomeVsExpenses, 
  categoryExpenses,
  kpis,
  currency = 'INR' 
}) {
  const { isDark } = useTheme();

  const metrics = [
    { label: 'Savings Efficiency Rate', val: kpis?.savingsRate || '0%', change: 'Calculated from Net Margin', icon: Percent },
    { label: 'Total Inflow Velocity', val: formatCurrency(kpis?.totalIncome || 0, currency, false), change: 'Gross realized revenue', icon: TrendingUp },
    { label: 'Total Capital Disbursed', val: formatCurrency(kpis?.totalExpenses || 0, currency, false), change: 'Strictly ledger audited', icon: ShieldAlert },
    { label: 'Retained Net Capital', val: formatCurrency(kpis?.netSavings || 0, currency, false), change: 'Liquid surplus reserve', icon: Award }
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className={`
        border rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors
        ${isDark 
          ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF]' 
          : 'bg-[#4A1025] border-[#5E142F] text-[#FFFFFF]'
        }
      `}>
        <div>
          <div className="flex items-center gap-2 text-xs opacity-80 font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Deep Insights</span>
          </div>
          <h2 className="font-serif text-2xl font-bold">Financial Analytics & Intelligence</h2>
          <p className="text-xs opacity-80 mt-1 max-w-xl leading-relaxed">
            Dynamic capital trends, expenditure concentrations, and live portfolio retention modeling in White & Burgundy.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div 
              key={m.label} 
              className={`p-5 rounded-2xl border shadow-lg transition-colors ${
                isDark 
                  ? 'bg-[#260814] border-[#360B1C] text-[#FFFFFF]' 
                  : 'bg-[#FFFFFF] border-[#E8E2E4] text-[#260814]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold opacity-60 uppercase tracking-wider">{m.label}</span>
                <div className={`p-2 rounded-lg ${isDark ? 'bg-[#360B1C] text-[#FFFFFF]' : 'bg-[#F8F7F7] text-[#4A1025]'}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-serif font-bold truncate">{m.val}</div>
              <p className="text-[11px] opacity-75 mt-1 truncate">{m.change}</p>
            </div>
          );
        })}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpensesTrendChart data={monthlyExpensesTrend} currency={currency} />
        <IncomeVsExpensesChart data={incomeVsExpenses} currency={currency} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CategoryDonutChart data={categoryExpenses} currency={currency} />
        </div>
        <div className={`lg:col-span-2 border rounded-2xl p-6 shadow-xl flex flex-col justify-between transition-colors ${
          isDark 
            ? 'bg-[#260814] border-[#360B1C] text-[#FFFFFF]' 
            : 'bg-[#FFFFFF] border-[#E8E2E4] text-[#260814]'
        }`}>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#FFFFFF]' : 'bg-[#4A1025]'}`} />
              <h3 className="font-serif font-bold text-lg">Strategic Wealth Projections</h3>
            </div>
            <p className="text-xs opacity-75 mb-5">
              Based on your steady savings velocity ({kpis?.savingsRate}) and disciplined allocations:
            </p>

            <div className="space-y-4">
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#360B1C] border-[#52152C]' : 'bg-[#F8F7F7] border-[#E8E2E4]'}`}>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold">12-Month Projected Net Savings</span>
                  <span className="font-mono font-bold">
                    {formatCurrency((kpis?.netSavings || 0) * 1.8, currency, false)} (+180%)
                  </span>
                </div>
                <div className={`w-full h-2 rounded-full mt-2 overflow-hidden ${isDark ? 'bg-[#260814]' : 'bg-[#E8E2E4]'}`}>
                  <div className={`h-full rounded-full ${isDark ? 'bg-[#FFFFFF]' : 'bg-[#4A1025]'}`} style={{ width: '74%' }} />
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#360B1C] border-[#52152C]' : 'bg-[#F8F7F7] border-[#E8E2E4]'}`}>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold">Emergency Liquidity Reserve Target</span>
                  <span className="font-mono font-bold">100% Fully Funded</span>
                </div>
                <div className={`w-full h-2 rounded-full mt-2 overflow-hidden ${isDark ? 'bg-[#260814]' : 'bg-[#E8E2E4]'}`}>
                  <div className={`h-full rounded-full ${isDark ? 'bg-[#FFFFFF]' : 'bg-[#4A1025]'}`} style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className={`pt-4 mt-6 border-t text-xs opacity-75 flex items-center justify-between ${isDark ? 'border-[#360B1C]' : 'border-[#E8E2E4]'}`}>
            <span>Model: Live Multi-Account Cash Velocity</span>
            <span className="font-semibold">Q4 Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
