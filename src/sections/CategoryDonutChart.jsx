import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip 
} from 'recharts';
import { PieChart as PieIcon, PlusCircle } from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { useTheme } from '../context/ThemeContext';

export default function CategoryDonutChart({ data = [], currency = 'INR', onOpenAddModal }) {
  const { isDark } = useTheme();
  const [activeIndex, setActiveIndex] = useState(null);

  const total = data.reduce((acc, curr) => acc + (curr.value || 0), 0);

  // Dynamic burgundy palette
  const BURGUNDY_PIE_SHADES = [
    '#4A1025',
    '#5E142F',
    '#73193A',
    '#871E44',
    '#9C234F',
    '#B02859',
    '#260814'
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className={`
          border px-3.5 py-2 rounded-xl shadow-xl text-xs
          ${isDark 
            ? 'bg-[#260814] border-[#52152C] text-[#FFFFFF]' 
            : 'bg-[#FFFFFF] border-[#E8E2E4] text-[#260814]'
          }
        `}>
          <p className="font-semibold mb-0.5">{item.name}</p>
          <div className="flex items-center justify-between gap-4">
            <span>Amount:</span>
            <span className="font-bold font-mono">{formatCurrency(item.value, currency)}</span>
          </div>
          <div className="flex items-center justify-between gap-4 opacity-75 text-[11px]">
            <span>Share:</span>
            <span>{total > 0 ? ((item.value / total) * 100).toFixed(1) : 0}%</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`
      border rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-colors min-h-[360px]
      ${isDark 
        ? 'bg-[#260814] border-[#360B1C] text-[#FFFFFF]' 
        : 'bg-[#FFFFFF] border-[#E8E2E4] text-[#260814]'
      }
    `}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#FFFFFF]' : 'bg-[#4A1025]'}`} />
            <h3 className="font-serif font-bold text-lg tracking-wide">
              Expenses by Category
            </h3>
          </div>
          <p className="text-xs opacity-75 mt-1">
            Dynamic distribution derived from your entries
          </p>
        </div>
        <div className={`p-2 rounded-xl border ${isDark ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF]' : 'bg-[#F8F7F7] border-[#E8E2E4] text-[#4A1025]'}`}>
          <PieIcon className="w-4 h-4" />
        </div>
      </div>

      {/* Donut Chart or Proper Empty State */}
      <div className="relative h-56 w-full flex items-center justify-center">
        {data.length === 0 ? (
          <div className="text-center p-4 max-w-xs flex flex-col items-center">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2.5 ${isDark ? 'bg-[#360B1C] text-[#FFFFFF]' : 'bg-[#F8F7F7] text-[#4A1025]'}`}>
              <PieIcon className="w-6 h-6 opacity-60" />
            </div>
            <h4 className="font-serif font-bold text-sm mb-1">No Category Spending Yet</h4>
            <p className="text-xs opacity-75 leading-relaxed mb-3">
              Add your first expense to visualize category allocations automatically.
            </p>
            {onOpenAddModal && (
              <button
                onClick={onOpenAddModal}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer ${
                  isDark ? 'bg-[#FFFFFF] text-[#260814] hover:bg-[#F8F7F7]' : 'bg-[#4A1025] text-[#FFFFFF] hover:bg-[#5E142F]'
                }`}
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Expense</span>
              </button>
            )}
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={88}
                  paddingAngle={2}
                  dataKey="value"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={BURGUNDY_PIE_SHADES[index % BURGUNDY_PIE_SHADES.length]} 
                      stroke={isDark ? '#260814' : '#FFFFFF'} 
                      strokeWidth={2}
                      className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Center Total Readout */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] uppercase tracking-wider opacity-60 font-medium">Total Spend</span>
              <span className="font-serif font-bold text-base sm:text-lg mt-0.5 max-w-[120px] truncate text-center">
                {formatCurrency(total, currency, false)}
              </span>
              <span className="text-[10px] opacity-75 font-semibold">100% Calculated</span>
            </div>
          </>
        )}
      </div>

      {/* Categories Legend List */}
      <div className={`mt-4 pt-3 border-t grid grid-cols-2 gap-x-4 gap-y-2 text-xs ${isDark ? 'border-[#360B1C]' : 'border-[#E8E2E4]'}`}>
        {data.length === 0 ? (
          <div className="col-span-2 text-center text-[11px] opacity-60 py-1">
            Category breakdown updates in real time as you record spending.
          </div>
        ) : (
          data.slice(0, 6).map((item, index) => (
            <div 
              key={item.name}
              className={`flex items-center justify-between p-1.5 rounded-lg transition-colors ${
                activeIndex === index ? isDark ? 'bg-[#360B1C]' : 'bg-[#F8F7F7]' : ''
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span 
                  className="w-2 h-2 rounded-full shrink-0" 
                  style={{ backgroundColor: BURGUNDY_PIE_SHADES[index % BURGUNDY_PIE_SHADES.length] }} 
                />
                <span className="truncate text-[11px] opacity-80">{item.name}</span>
              </div>
              <span className="font-mono font-medium text-[11px] ml-1">
                {item.percentage}%
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
