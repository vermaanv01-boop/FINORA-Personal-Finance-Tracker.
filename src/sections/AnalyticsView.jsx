import React from 'react';
import { 
  TrendingUp, 
  Award, 
  Percent, 
  ShieldAlert, 
  Sparkles,
  BarChart3,
  PlusCircle
} from 'lucide-react';
import ExpensesTrendChart from './ExpensesTrendChart';
import IncomeVsExpensesChart from './IncomeVsExpensesChart';
import CategoryDonutChart from './CategoryDonutChart';
import { formatCurrency } from '../utils/currency';
import { useTheme } from '../context/ThemeContext';

export default function AnalyticsView({ 
  monthlyExpensesTrend = [], 
  incomeVsExpenses = [], 
  categoryExpenses = [], 
  kpis,
  currency = 'INR',
  onOpenAddModal
}) {
  const { isDark } = useTheme();

  const metrics = [
    { label: 'Savings Efficiency Rate', val: kpis?.savingsRate || '0.0%', change: 'Calculated from Net Margin', icon: Percent },
    { label: 'Total Inflow Velocity', val: formatCurrency(kpis?.totalIncome || 0, currency, false), change: 'Gross verified inflows', icon: TrendingUp },
    { label: 'Total Capital Disbursed', val: formatCurrency(kpis?.totalExpenses || 0, currency, false), change: 'Strictly ledger audited', icon: ShieldAlert },
    { label: 'Retained Net Capital', val: formatCurrency(kpis?.netSavings || 0, currency, false), change: 'Liquid surplus balance', icon: Award }
  ];

  const hasData = (kpis?.totalTransactions || 0) > 0;

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
            Dynamic capital trends, expenditure concentrations, and live portfolio retention calculated strictly from user transactions.
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
              className={`p-5 rounded-2xl border shadow-sm transition-colors ${
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
        <ExpensesTrendChart 
          data={monthlyExpensesTrend} 
          currency={currency} 
          onOpenAddModal={onOpenAddModal} 
        />
        <IncomeVsExpensesChart 
          data={incomeVsExpenses} 
          currency={currency} 
          onOpenAddModal={onOpenAddModal} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CategoryDonutChart 
            data={categoryExpenses} 
            currency={currency} 
            onOpenAddModal={onOpenAddModal} 
          />
        </div>
        <div className={`lg:col-span-2 border rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-colors ${
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
              Based on your actual savings velocity ({kpis?.savingsRate || '0.0%'}) and disciplined allocations:
            </p>

            {hasData ? (
              <div className="space-y-4">
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#360B1C] border-[#52152C]' : 'bg-[#F8F7F7] border-[#E8E2E4]'}`}>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-semibold">12-Month Projected Net Savings</span>
                    <span className="font-mono font-bold">
                      {formatCurrency(Math.max((kpis?.netSavings || 0) * 1.5, 0), currency, false)}
                    </span>
                  </div>
                  <div className={`w-full h-2 rounded-full mt-2 overflow-hidden ${isDark ? 'bg-[#260814]' : 'bg-[#E8E2E4]'}`}>
                    <div className={`h-full rounded-full ${isDark ? 'bg-[#FFFFFF]' : 'bg-[#4A1025]'}`} style={{ width: '65%' }} />
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#360B1C] border-[#52152C]' : 'bg-[#F8F7F7] border-[#E8E2E4]'}`}>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-semibold">Emergency Liquidity Reserve Target</span>
                    <span className="font-mono font-bold">
                      {kpis?.totalBalance > 0 ? 'Active Reserve Accumulation' : 'Pending Inflows'}
                    </span>
                  </div>
                  <div className={`w-full h-2 rounded-full mt-2 overflow-hidden ${isDark ? 'bg-[#260814]' : 'bg-[#E8E2E4]'}`}>
                    <div 
                      className={`h-full rounded-full ${isDark ? 'bg-[#FFFFFF]' : 'bg-[#4A1025]'}`} 
                      style={{ width: `${Math.min(Math.max((kpis?.totalBalance || 0) / 1000, 5), 100)}%` }} 
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 px-4 text-center">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 ${isDark ? 'bg-[#360B1C] text-[#FFFFFF]' : 'bg-[#F8F7F7] text-[#4A1025]'}`}>
                  <BarChart3 className="w-6 h-6 opacity-60" />
                </div>
                <h4 className="font-serif font-bold text-base mb-1">No Wealth Projections Available</h4>
                <p className="text-xs opacity-75 max-w-sm mx-auto mb-4 leading-relaxed">
                  Wealth projections are calculated strictly from your recorded cash flows. Enter your transactions to begin forecasting.
                </p>
                {onOpenAddModal && (
                  <button
                    onClick={onOpenAddModal}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer ${
                      isDark ? 'bg-[#FFFFFF] text-[#260814] hover:bg-[#F8F7F7]' : 'bg-[#4A1025] text-[#FFFFFF] hover:bg-[#5E142F]'
                    }`}
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Record Entry</span>
                  </button>
                )}
              </div>
            )}
          </div>

          <div className={`pt-4 mt-6 border-t text-xs opacity-75 flex items-center justify-between ${isDark ? 'border-[#360B1C]' : 'border-[#E8E2E4]'}`}>
            <span>Model: Ledger Cash Velocity</span>
            <span className="font-semibold">{hasData ? 'Live Calculated' : 'Idle'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
