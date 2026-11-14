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
  CheckCircle2,
  Filter
} from 'lucide-react';

const iconMap = {
  Utensils,
  Laptop,
  Activity,
  Plane,
  TrendingUp,
  ArrowDownLeft,
};

export default function RecentTransactions({ transactions }) {
  const [filterType, setFilterType] = useState('all');

  const filtered = transactions.filter(t => {
    if (filterType === 'all') return true;
    return t.type === filterType;
  });

  return (
    <div className="bg-[#230811] border border-[#3E1421] rounded-2xl p-6 shadow-xl shadow-[#15040a]/10 flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E89BA8]" />
              <h3 className="font-serif font-bold text-lg text-[#FDFBF7] tracking-wide">
                Recent Transactions
              </h3>
            </div>
            <p className="text-xs text-[#E89BA8]/70 mt-1">
              Real-time settlement across linked cards and accounts
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-[#1A050D] p-1 rounded-xl border border-[#3A1420] self-start sm:self-auto">
            {['all', 'income', 'expense'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-colors ${
                  filterType === type 
                    ? 'bg-[#3D1220] text-[#FDFBF7] shadow-xs' 
                    : 'text-[#E89BA8]/60 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          {filtered.map((item) => {
            const Icon = iconMap[item.icon] || CreditCard;
            const isIncome = item.type === 'income';

            return (
              <div 
                key={item.id}
                className="group p-3 sm:p-3.5 rounded-xl bg-[#1C060D] border border-[#37121F] hover:border-[#5C1D2E] hover:bg-[#280B15] transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105
                    ${isIncome 
                      ? 'bg-[#182B1E] text-[#34D399] border-[#294B34]' 
                      : 'bg-[#2E0D18] text-[#E89BA8] border-[#4A1827]'
                    }
                  `}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#FDFBF7] truncate group-hover:text-[#DFB27A] transition-colors">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-[#A89299] mt-0.5">
                      <span className="truncate">{item.category}</span>
                      <span>•</span>
                      <span className="truncate text-[11px] text-[#E89BA8]/60">{item.account}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className={`text-sm font-mono font-bold ${
                    isIncome ? 'text-[#34D399]' : 'text-[#FDFBF7]'
                  }`}>
                    {isIncome ? '+' : '-'}${item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-[11px] text-[#8C6E76] mt-0.5">
                    {item.date}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer link */}
      <div className="mt-5 pt-3.5 border-t border-[#3D1421] flex items-center justify-between text-xs">
        <span className="text-[#A89299]">Showing {filtered.length} of {transactions.length} records</span>
        <button className="text-[#DFB27A] hover:text-[#f2caa0] font-semibold flex items-center gap-1 transition-colors">
          <span>View Detailed Statement</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

