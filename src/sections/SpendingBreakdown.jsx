import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { useTheme } from '../context/ThemeContext';

export default function SpendingBreakdown({ stats, currency = 'INR' }) {
  const { isDark } = useTheme();

  const {
    essentialSpending = 0,
    discretionarySpending = 0,
    savingsAndInvestments = 0,
    monthlyBudgetLimit = 175000,
    totalSpentThisMonth = 0
  } = stats || {};

  const budgetUsagePercent = monthlyBudgetLimit > 0 
    ? Math.min(Math.round((totalSpentThisMonth / monthlyBudgetLimit) * 100), 100) 
    : 0;
  const remainingBudget = Math.max(monthlyBudgetLimit - totalSpentThisMonth, 0);

  const breakdownSegments = [
    {
      title: 'Fixed & Essential Core',
      amount: essentialSpending,
      desc: 'Housing lease, utilities, insurance',
      percentage: totalSpentThisMonth > 0 ? Math.round((essentialSpending / totalSpentThisMonth) * 100) : 0,
    },
    {
      title: 'Discretionary Lifestyle',
      amount: discretionarySpending,
      desc: 'Dining, travel, executive shopping',
      percentage: totalSpentThisMonth > 0 ? Math.round((discretionarySpending / totalSpentThisMonth) * 100) : 0,
    },
    {
      title: 'Strategic Asset Allocation',
      amount: savingsAndInvestments,
      desc: 'Equities, index SIPs, reserves',
      percentage: totalSpentThisMonth > 0 ? Math.round((savingsAndInvestments / totalSpentThisMonth) * 100) : 0,
    }
  ];

  return (
    <div className={`
      border rounded-2xl p-6 shadow-xl flex flex-col justify-between transition-colors
      ${isDark 
        ? 'bg-[#260814] border-[#360B1C] text-[#FFFFFF]' 
        : 'bg-[#FFFFFF] border-[#E8E2E4] text-[#260814]'
      }
    `}>
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#FFFFFF]' : 'bg-[#4A1025]'}`} />
              <h3 className="font-serif font-bold text-lg tracking-wide">
                Spending Breakdown
              </h3>
            </div>
            <p className="text-xs opacity-75 mt-1">
              Live calculated capital distribution vs configured cap
            </p>
          </div>
          <div className={`px-2.5 py-1 rounded-full border text-[11px] font-semibold ${isDark ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF]' : 'bg-[#F8F7F7] border-[#E8E2E4] text-[#4A1025]'}`}>
            {budgetUsagePercent}% Used
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className={`p-4 rounded-xl border mb-5 ${isDark ? 'bg-[#360B1C] border-[#52152C]' : 'bg-[#F8F7F7] border-[#E8E2E4]'}`}>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="opacity-75">Monthly Budget Envelope</span>
            <span className="font-mono font-semibold">
              {formatCurrency(totalSpentThisMonth, currency, false)} / <span className="opacity-60">{formatCurrency(monthlyBudgetLimit, currency, false)}</span>
            </span>
          </div>

          <div className={`w-full h-3 rounded-full overflow-hidden flex p-0.5 ${isDark ? 'bg-[#260814]' : 'bg-[#E8E2E4]'}`}>
            <div 
              className={`h-full rounded-full transition-all duration-500 ${isDark ? 'bg-[#FFFFFF]' : 'bg-[#4A1025]'}`}
              style={{ width: `${budgetUsagePercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between mt-2.5 text-[11px] opacity-75">
            <span>Remaining Buffer: <strong className="font-mono">{formatCurrency(remainingBudget, currency, false)}</strong></span>
            <span>Target: &lt; 80% utilization</span>
          </div>
        </div>

        {/* Breakdown Items */}
        <div className="space-y-3">
          {breakdownSegments.map((seg) => (
            <div 
              key={seg.title}
              className={`p-3 rounded-xl border transition-colors ${
                isDark 
                  ? 'bg-[#360B1C] border-[#52152C] hover:border-[#FFFFFF]/30' 
                  : 'bg-[#F8F7F7] border-[#E8E2E4] hover:border-[#4A1025]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-sm ${isDark ? 'bg-[#FFFFFF]' : 'bg-[#4A1025]'}`} />
                  <span className="text-xs font-semibold">{seg.title}</span>
                </div>
                <div className="text-xs font-mono font-bold">
                  {formatCurrency(seg.amount, currency, false)} <span className="text-[10px] opacity-60 font-normal">({seg.percentage}%)</span>
                </div>
              </div>
              <p className="text-[11px] opacity-75 pl-4">{seg.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Advisory */}
      <div className={`mt-5 pt-3.5 border-t flex items-center justify-between text-xs ${isDark ? 'border-[#360B1C]' : 'border-[#E8E2E4]'}`}>
        <span className="flex items-center gap-1.5 opacity-80">
          <ShieldCheck className="w-4 h-4" />
          <span>Optimal Liquidity Margin Maintained</span>
        </span>
        <span className="font-semibold text-[11px]">Audit OK</span>
      </div>
    </div>
  );
}
