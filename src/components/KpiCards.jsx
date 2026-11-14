import React from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  PiggyBank, 
  ReceiptText,
  TrendingUp,
  Percent
} from 'lucide-react';

export default function KpiCards({ kpis }) {
  const cards = [
    {
      id: 'balance',
      title: 'Total Balance',
      value: `$${kpis.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      subtitle: `${kpis.balanceChange} vs last month`,
      isPositive: true,
      icon: Wallet,
      badgeText: 'Live Portfolio',
      variant: 'primary' // deep burgundy
    },
    {
      id: 'income',
      title: 'Total Income',
      value: `$${kpis.totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      subtitle: `${kpis.incomeChange} this month`,
      isPositive: true,
      icon: ArrowDownRight,
      badgeText: 'Net Inflow',
      variant: 'maroon'
    },
    {
      id: 'expenses',
      title: 'Total Expenses',
      value: `$${kpis.totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      subtitle: `${kpis.expensesChange} budget discipline`,
      isPositive: false, // lower expense is positive in real life, display nicely
      icon: ArrowUpRight,
      badgeText: 'Monthly Outflow',
      variant: 'maroon'
    },
    {
      id: 'savings',
      title: 'Net Savings',
      value: `$${kpis.netSavings.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      subtitle: `Savings rate ${kpis.savingsRate}`,
      isPositive: true,
      icon: PiggyBank,
      badgeText: 'Retained Cash',
      variant: 'maroon'
    },
    {
      id: 'transactions',
      title: 'Total Transactions',
      value: kpis.totalTransactions,
      subtitle: kpis.transactionsChange,
      isPositive: true,
      icon: ReceiptText,
      badgeText: 'Activity Count',
      variant: 'maroon'
    }
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const isPrimary = card.variant === 'primary';
        
        return (
          <div
            key={card.id}
            className={`
              relative rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 group overflow-hidden
              ${isPrimary 
                ? 'bg-gradient-to-br from-[#2D0B16] via-[#230811] to-[#17040B] text-white shadow-xl shadow-[#2D0B16]/20 border border-[#4F192B]' 
                : 'bg-[#230811] text-[#FDFBF7] shadow-lg shadow-[#15040a]/10 border border-[#3E1421] hover:border-[#6B2238]'
              }
            `}
          >
            {/* Subtle glow effect */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#E89BA8]/10 via-transparent to-transparent rounded-bl-full pointer-events-none" />

            <div className="flex items-center justify-between mb-3.5">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#E89BA8]/80">
                {card.title}
              </span>
              <div className={`
                p-2 rounded-xl transition-transform duration-300 group-hover:scale-110
                ${isPrimary ? 'bg-[#3D1220] text-[#DFB27A]' : 'bg-[#2E0D18] text-[#E89BA8]'}
              `}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mb-3">
              <div className="text-2xl font-serif font-bold tracking-tight text-[#FDFBF7]">
                {card.value}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#3D1421]/80 text-xs">
              <span className="text-[11px] text-[#E89BA8]/70 truncate max-w-[140px]">
                {card.subtitle}
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#2F0E1A] text-[#DFB27A] border border-[#DFB27A]/20">
                {card.badgeText}
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
}
