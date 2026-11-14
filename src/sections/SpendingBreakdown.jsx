import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

export default function SpendingBreakdown({ stats, currency = 'INR' }) {
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
      color: '#E89BA8'
    },
    {
      title: 'Discretionary Lifestyle',
      amount: discretionarySpending,
      desc: 'Dining, travel, executive shopping',
      percentage: totalSpentThisMonth > 0 ? Math.round((discretionarySpending / totalSpentThisMonth) * 100) : 0,
      color: '#DFB27A'
    },
    {
      title: 'Strategic Asset Allocation',
      amount: savingsAndInvestments,
      desc: 'Equities, index SIPs, reserves',
      percentage: totalSpentThisMonth > 0 ? Math.round((savingsAndInvestments / totalSpentThisMonth) * 100) : 0,
      color: '#F7D6DC'
    }
  ];

  return (
    <div className="bg-[#230811] border border-[#3E1421] rounded-2xl p-6 shadow-xl shadow-[#15040a]/10 flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#DFB27A]" />
              <h3 className="font-serif font-bold text-lg text-[#FDFBF7] tracking-wide">
                Spending Breakdown
              </h3>
            </div>
            <p className="text-xs text-[#E89BA8]/70 mt-1">
              Live calculated capital distribution vs configured cap
            </p>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-[#2E0D18] border border-[#481827] text-[11px] text-[#DFB27A] font-semibold">
            {budgetUsagePercent}% Used
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="bg-[#1A050D] p-4 rounded-xl border border-[#35101E] mb-5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[#A89299]">Monthly Budget Envelope</span>
            <span className="font-mono text-[#FDFBF7] font-semibold">
              {formatCurrency(totalSpentThisMonth, currency, false)} / <span className="text-[#A89299]">{formatCurrency(monthlyBudgetLimit, currency, false)}</span>
            </span>
          </div>

          <div className="w-full h-3 bg-[#2D0B16] rounded-full overflow-hidden flex p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-[#DFB27A] via-[#E89BA8] to-[#D17888] rounded-full transition-all duration-500"
              style={{ width: `${budgetUsagePercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between mt-2.5 text-[11px] text-[#E89BA8]/70">
            <span>Remaining Buffer: <strong className="text-[#34D399] font-mono">{formatCurrency(remainingBudget, currency, false)}</strong></span>
            <span>Target: &lt; 80% utilization</span>
          </div>
        </div>

        {/* Breakdown Items */}
        <div className="space-y-3">
          {breakdownSegments.map((seg) => (
            <div 
              key={seg.title}
              className="p-3 rounded-xl bg-[#1F070F] border border-[#3A1220] hover:border-[#521C2F] transition-colors"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: seg.color }} />
                  <span className="text-xs font-semibold text-[#FDFBF7]">{seg.title}</span>
                </div>
                <div className="text-xs font-mono font-bold text-[#FDFBF7]">
                  {formatCurrency(seg.amount, currency, false)} <span className="text-[10px] text-[#A89299] font-normal">({seg.percentage}%)</span>
                </div>
              </div>
              <p className="text-[11px] text-[#A89299] pl-4">{seg.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Advisory */}
      <div className="mt-5 pt-3.5 border-t border-[#3D1421] flex items-center justify-between text-xs text-[#E89BA8]/70">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#DFB27A]" />
          <span>Optimal Liquidity Margin Maintained</span>
        </span>
        <span className="text-[#DFB27A] font-semibold text-[11px]">Audit OK</span>
      </div>
    </div>
  );
}
