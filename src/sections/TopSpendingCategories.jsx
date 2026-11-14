import React from 'react';
import { 
  Home, 
  TrendingUp, 
  Utensils, 
  Plane, 
  Zap, 
  Laptop, 
  Activity, 
  ArrowDownLeft, 
  CreditCard,
  PlusCircle,
  Tag
} from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { useTheme } from '../context/ThemeContext';

const iconMap = {
  Home,
  TrendingUp,
  Utensils,
  Plane,
  Zap,
  Laptop,
  Activity,
  ArrowDownLeft,
  CreditCard
};

export default function TopSpendingCategories({ categories = [], currency = 'INR', onOpenAddModal }) {
  const { isDark } = useTheme();

  return (
    <div className={`
      border rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-colors min-h-[360px]
      ${isDark 
        ? 'bg-[#260814] border-[#360B1C] text-[#FFFFFF]' 
        : 'bg-[#FFFFFF] border-[#E8E2E4] text-[#260814]'
      }
    `}>
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#FFFFFF]' : 'bg-[#4A1025]'}`} />
              <h3 className="font-serif font-bold text-lg tracking-wide">
                Top Spending Categories
              </h3>
            </div>
            <p className="text-xs opacity-75 mt-1">
              Primary outflows ranked by volume
            </p>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${isDark ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF]' : 'bg-[#F8F7F7] border-[#E8E2E4] text-[#4A1025]'}`}>
            Top {categories.length}
          </span>
        </div>

        {/* Categories List or Proper Empty State */}
        <div className="space-y-4">
          {categories.length === 0 ? (
            <div className="text-center py-10 px-4 flex flex-col items-center">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${isDark ? 'bg-[#360B1C] text-[#FFFFFF]' : 'bg-[#F8F7F7] text-[#4A1025]'}`}>
                <Tag className="w-6 h-6 opacity-60" />
              </div>
              <h4 className="font-serif font-bold text-sm mb-1">No Categories Recorded</h4>
              <p className="text-xs opacity-75 max-w-xs leading-relaxed mb-4">
                When you record expenses, your top spending categories will be automatically calculated and ranked here.
              </p>
              {onOpenAddModal && (
                <button
                  onClick={onOpenAddModal}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer ${
                    isDark ? 'bg-[#FFFFFF] text-[#260814] hover:bg-[#F8F7F7]' : 'bg-[#4A1025] text-[#FFFFFF] hover:bg-[#5E142F]'
                  }`}
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Record Expense</span>
                </button>
              )}
            </div>
          ) : (
            categories.map((cat) => {
              const Icon = iconMap[cat.icon] || Home;
              const isHighUsage = cat.percentage >= 85;

              return (
                <div 
                  key={cat.id || cat.name}
                  className={`
                    p-3.5 rounded-xl border transition-all group
                    ${isDark 
                      ? 'bg-[#360B1C] border-[#52152C] hover:border-[#FFFFFF]/30' 
                      : 'bg-[#F8F7F7] border-[#E8E2E4] hover:border-[#4A1025]'
                    }
                  `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`
                        w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                        ${isDark ? 'bg-[#260814] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#4A1025] border border-[#E8E2E4]'}
                      `}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-semibold truncate">
                          {cat.name}
                        </p>
                        <p className="text-[10px] opacity-60">
                          Target Cap: {formatCurrency(cat.allocatedBudget, currency, false)}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono text-xs font-bold">
                        {formatCurrency(cat.amount, currency, false)}
                      </span>
                      <span className="block text-[10px] font-semibold opacity-75">
                        {cat.percentage}% of cap
                      </span>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-[#260814]' : 'bg-[#E8E2E4]'}`}>
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${isDark ? 'bg-[#FFFFFF]' : 'bg-[#4A1025]'}`}
                      style={{ width: `${Math.min(cat.percentage, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className={`mt-5 pt-3.5 border-t flex items-center justify-between text-xs ${isDark ? 'border-[#360B1C]' : 'border-[#E8E2E4]'}`}>
        <span className="opacity-75">Category Ranking</span>
        <span className="font-serif font-bold">
          {categories.length > 0 ? `${categories.length} Categories Tracked` : 'Awaiting data'}
        </span>
      </div>
    </div>
  );
}
