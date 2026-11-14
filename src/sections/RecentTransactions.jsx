import React, { useState } from 'react';
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  Utensils, 
  Laptop, 
  Activity, 
  Plane, 
  TrendingUp, 
  CreditCard,
  Home,
  Zap,
  Edit2,
  Trash2
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { formatCurrency } from '../utils/currency';
import { useTheme } from '../context/ThemeContext';

const iconMap = {
  Utensils,
  Laptop,
  Activity,
  Plane,
  TrendingUp,
  ArrowDownLeft,
  Home,
  Zap,
  CreditCard
};

export default function RecentTransactions({ 
  transactions, 
  currency = 'INR',
  onEditTransaction,
  onDeleteTransaction 
}) {
  const { isDark } = useTheme();
  const [filterType, setFilterType] = useState('all');

  const filtered = transactions.filter(t => {
    if (filterType === 'all') return true;
    return t.type === filterType;
  });

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#FFFFFF]' : 'bg-[#4A1025]'}`} />
              <h3 className="font-serif font-bold text-lg tracking-wide">
                Recent Transactions
              </h3>
            </div>
            <p className="text-xs opacity-75 mt-1">
              Live settlement across linked banking & investment accounts
            </p>
          </div>

          {/* Filter Pills */}
          <div className={`flex items-center gap-1.5 p-1 rounded-xl border self-start sm:self-auto ${isDark ? 'bg-[#360B1C] border-[#52152C]' : 'bg-[#F8F7F7] border-[#E8E2E4]'}`}>
            {['all', 'income', 'expense'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-colors cursor-pointer ${
                  filterType === type 
                    ? isDark ? 'bg-[#FFFFFF] text-[#260814]' : 'bg-[#4A1025] text-[#FFFFFF]' 
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs opacity-60">
              No transactions found matching criteria.
            </div>
          ) : (
            filtered.slice(0, 6).map((item) => {
              const Icon = iconMap[item.icon] || CreditCard;
              const isIncome = item.type === 'income';

              return (
                <div 
                  key={item.id}
                  className={`
                    group p-3 sm:p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3
                    ${isDark 
                      ? 'bg-[#360B1C] border-[#52152C] hover:border-[#FFFFFF]/40 hover:bg-[#420D23]' 
                      : 'bg-[#F8F7F7] border-[#E8E2E4] hover:border-[#4A1025] hover:bg-[#FFFFFF]'
                    }
                  `}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`
                      w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105
                      ${isIncome 
                        ? isDark ? 'bg-[#FFFFFF] text-[#260814] border-[#FFFFFF]' : 'bg-[#4A1025] text-[#FFFFFF] border-[#4A1025]' 
                        : isDark ? 'bg-[#260814] text-[#FFFFFF] border-[#52152C]' : 'bg-[#FFFFFF] text-[#4A1025] border-[#E8E2E4]'
                      }
                    `}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs opacity-75 mt-0.5">
                        <span className="truncate">{item.category}</span>
                        <span>•</span>
                        <span className="truncate text-[11px] opacity-75">{item.account}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right shrink-0">
                      <p className="text-sm font-mono font-bold">
                        {isIncome ? '+' : '-'}{formatCurrency(item.amount, currency)}
                      </p>
                      <p className="text-[11px] opacity-60 mt-0.5">
                        {item.date}
                      </p>
                    </div>

                    {/* Quick Edit/Delete on Hover */}
                    <div className="flex items-center gap-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      {onEditTransaction && (
                        <button 
                          onClick={() => onEditTransaction(item)}
                          className="p-1.5 rounded-lg opacity-80 hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
                          title="Edit transaction"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {onDeleteTransaction && (
                        <button 
                          onClick={() => onDeleteTransaction(item.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-950/20 transition-colors cursor-pointer"
                          title="Delete transaction"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer link */}
      <div className={`mt-5 pt-3.5 border-t flex items-center justify-between text-xs ${isDark ? 'border-[#360B1C]' : 'border-[#E8E2E4]'}`}>
        <span className="opacity-60">Showing {Math.min(filtered.length, 6)} of {transactions.length} total entries</span>
        <NavLink 
          to="/transactions" 
          className="font-semibold flex items-center gap-1 hover:underline transition-colors"
        >
          <span>Open Full Ledger</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </NavLink>
      </div>
    </div>
  );
}
