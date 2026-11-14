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
  CreditCard 
} from 'lucide-react';
import { formatCurrency } from '../utils/currency';

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

export default function TopSpendingCategories({ categories, currency = 'INR' }) {
  return (
    <div className="bg-[#230811] border border-[#3E1421] rounded-2xl p-6 shadow-xl shadow-[#15040a]/10 flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#DFB27A]" />
              <h3 className="font-serif font-bold text-lg text-[#FDFBF7] tracking-wide">
                Top Spending Categories
              </h3>
            </div>
            <p className="text-xs text-[#E89BA8]/70 mt-1">
              Primary outflows sorted by dynamic volume
            </p>
          </div>
          <span className="text-xs text-[#DFB27A] font-semibold bg-[#2F0E1A] px-2.5 py-1 rounded-lg border border-[#DFB27A]/20">
            Top {categories.length}
          </span>
        </div>

        {/* Categories List */}
        <div className="space-y-4">
          {categories.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#A89299]">
              No expense categories recorded yet.
            </div>
          ) : (
            categories.map((cat) => {
              const Icon = iconMap[cat.icon] || Home;
              const isHighUsage = cat.percentage >= 85;

              return (
                <div 
                  key={cat.id || cat.name}
                  className="p-3.5 rounded-xl bg-[#1C060D] border border-[#35101E] hover:border-[#571B2C] transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-semibold text-[#FDFBF7] group-hover:text-[#DFB27A] transition-colors truncate">
                          {cat.name}
                        </p>
                        <p className="text-[10px] text-[#A89299]">
                          Target Cap: {formatCurrency(cat.allocatedBudget, currency, false)}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono text-xs font-bold text-[#FDFBF7]">
                        {formatCurrency(cat.amount, currency, false)}
                      </span>
                      <span className={`block text-[10px] font-semibold ${
                        isHighUsage ? 'text-[#E89BA8]' : 'text-[#DFB27A]'
                      }`}>
                        {cat.percentage}% of cap
                      </span>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div className="w-full h-1.5 bg-[#2B0A15] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.min(cat.percentage, 100)}%`,
                        backgroundColor: cat.color 
                      }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-5 pt-3.5 border-t border-[#3D1421] flex items-center justify-between text-xs text-[#E89BA8]/70">
        <span>Portfolio Advisory Score</span>
        <span className="font-serif font-bold text-[#DFB27A]">94/100 (Optimal)</span>
      </div>
    </div>
  );
}
