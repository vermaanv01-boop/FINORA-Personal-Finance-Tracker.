import React from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  PiggyBank, 
  ReceiptText 
} from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { useTheme } from '../context/ThemeContext';

export default function KpiCards({ kpis, currency = 'INR' }) {
  const { isDark } = useTheme();

  const cards = [
    {
      id: 'balance',
      title: 'Total Balance',
      value: formatCurrency(kpis.totalBalance, currency),
      subtitle: `${kpis.balanceChange} net change`,
      icon: Wallet,
      badgeText: 'Net Liquidity',
      isPrimary: true
    },
    {
      id: 'income',
      title: 'Total Income',
      value: formatCurrency(kpis.totalIncome, currency),
      subtitle: `${kpis.incomeChange} recorded inflow`,
      icon: ArrowDownLeft,
      badgeText: 'Total Inflow'
    },
    {
      id: 'expenses',
      title: 'Total Expenses',
      value: formatCurrency(kpis.totalExpenses, currency),
      subtitle: `${kpis.expensesChange} budget discipline`,
      icon: ArrowUpRight,
      badgeText: 'Total Outflow'
    },
    {
      id: 'savings',
      title: 'Net Savings',
      value: formatCurrency(kpis.netSavings, currency),
      subtitle: `Savings rate ${kpis.savingsRate}`,
      icon: PiggyBank,
      badgeText: 'Retained Cash'
    },
    {
      id: 'transactions',
      title: 'Total Transactions',
      value: kpis.totalTransactions,
      subtitle: kpis.transactionsChange,
      icon: ReceiptText,
      badgeText: 'Ledger Count'
    }
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        
        return (
          <div
            key={card.id}
            className={`
              relative rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 group overflow-hidden border shadow-lg
              ${card.isPrimary
                ? isDark 
                  ? 'bg-[#360B1C] text-[#FFFFFF] border-[#52152C]' 
                  : 'bg-[#4A1025] text-[#FFFFFF] border-[#5E142F]'
                : isDark
                  ? 'bg-[#260814] text-[#FFFFFF] border-[#360B1C] hover:border-[#52152C]'
                  : 'bg-[#FFFFFF] text-[#260814] border-[#E8E2E4] hover:border-[#4A1025]'
              }
            `}
          >
            <div className="flex items-center justify-between mb-3.5">
              <span className={`text-[11px] font-semibold tracking-wider uppercase ${card.isPrimary ? 'text-[#FFFFFF]/80' : isDark ? 'text-[#FFFFFF]/70' : 'text-[#4A1025]/80'}`}>
                {card.title}
              </span>
              <div className={`
                p-2 rounded-xl transition-transform duration-300 group-hover:scale-110
                ${card.isPrimary 
                  ? 'bg-[#FFFFFF] text-[#4A1025]' 
                  : isDark 
                    ? 'bg-[#360B1C] text-[#FFFFFF]' 
                    : 'bg-[#F8F7F7] text-[#4A1025]'
                }
              `}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mb-3">
              <div className="text-2xl font-serif font-bold tracking-tight truncate">
                {card.value}
              </div>
            </div>

            <div className={`flex items-center justify-between pt-2 border-t text-xs ${card.isPrimary ? 'border-[#FFFFFF]/15' : isDark ? 'border-[#360B1C]' : 'border-[#E8E2E4]'}`}>
              <span className={`text-[11px] truncate max-w-[130px] ${card.isPrimary ? 'text-[#FFFFFF]/70' : isDark ? 'text-[#FFFFFF]/60' : 'text-[#260814]/70'}`}>
                {card.subtitle}
              </span>
              <span className={`
                text-[10px] font-semibold px-2 py-0.5 rounded-md border
                ${card.isPrimary 
                  ? 'bg-[#FFFFFF]/10 text-[#FFFFFF] border-[#FFFFFF]/20' 
                  : isDark 
                    ? 'bg-[#360B1C] text-[#FFFFFF] border-[#52152C]' 
                    : 'bg-[#F8F7F7] text-[#4A1025] border-[#E8E2E4]'
                }
              `}>
                {card.badgeText}
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
}
