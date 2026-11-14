import React from 'react';
import { 
  TrendingUp, 
  Award, 
  Percent, 
  BarChart3, 
  ShieldAlert, 
  Sparkles,
  PieChart as PieIcon,
  Zap
} from 'lucide-react';
import ExpensesTrendChart from './ExpensesTrendChart';
import IncomeVsExpensesChart from './IncomeVsExpensesChart';
import CategoryDonutChart from './CategoryDonutChart';

export default function AnalyticsView({ monthlyExpensesTrend, incomeVsExpenses, categoryExpenses }) {
  const metrics = [
    { label: 'Savings Efficiency Rate', val: '59.1%', change: '+4.2% QoQ', icon: Percent },
    { label: 'Fixed Cost Overhead', val: '31.8%', change: 'Well within limit (<45%)', icon: ShieldAlert },
    { label: 'Capital Reinvestment', val: '$1,200/mo', change: 'Consistent monthly compounding', icon: TrendingUp },
    { label: 'Cash Runway Equivalent', val: '8.4 Months', change: 'Conservative buffer tier', icon: Award }
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#2D0B16] via-[#230811] to-[#18040C] border border-[#481827] rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#DFB27A] font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Deep Insights</span>
          </div>
          <h2 className="font-serif text-2xl font-bold">Financial Analytics & Intelligence</h2>
          <p className="text-xs text-[#E89BA8]/80 mt-1 max-w-xl leading-relaxed">
            Multi-quarter comparative variance, discretionary outflow trends, and savings longevity modeling.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="bg-[#230811] border border-[#3E1421] p-5 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-[#A89299] uppercase tracking-wider">{m.label}</span>
                <div className="p-2 rounded-lg bg-[#2E0D18] text-[#DFB27A]">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-serif font-bold text-[#FDFBF7]">{m.val}</div>
              <p className="text-[11px] text-[#E89BA8] mt-1">{m.change}</p>
            </div>
          );
        })}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpensesTrendChart data={monthlyExpensesTrend} />
        <IncomeVsExpensesChart data={incomeVsExpenses} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CategoryDonutChart data={categoryExpenses} />
        </div>
        <div className="lg:col-span-2 bg-[#230811] border border-[#3E1421] rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#DFB27A]" />
              <h3 className="font-serif font-bold text-lg text-[#FDFBF7]">Strategic Wealth Projections</h3>
            </div>
            <p className="text-xs text-[#E89BA8]/70 mb-5">
              Based on your steady 59.1% net retention and conservative yield assumption:
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#1C060D] border border-[#35101E]">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-[#FDFBF7]">12-Month Projected Liquid Net Worth</span>
                  <span className="font-mono font-bold text-[#DFB27A]">$149,800 (+208%)</span>
                </div>
                <div className="w-full bg-[#2E0D18] h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#DFB27A] to-[#E89BA8] h-full rounded-full" style={{ width: '74%' }} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#1C060D] border border-[#35101E]">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-[#FDFBF7]">Emergency Reserve Target ($30,000)</span>
                  <span className="font-mono font-bold text-[#34D399]">100% Fully Funded</span>
                </div>
                <div className="w-full bg-[#2E0D18] h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-[#34D399] h-full rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-[#3D1421] text-xs text-[#A89299] flex items-center justify-between">
            <span>Model: Monte Carlo Simulation (Deterministic Base)</span>
            <span className="text-[#DFB27A] font-semibold">Q4 Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
