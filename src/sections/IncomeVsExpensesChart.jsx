import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid
} from 'recharts';
import { BarChart3, PlusCircle } from 'lucide-react';
import { formatCurrency, formatCompactCurrency } from '../utils/currency';
import { useTheme } from '../context/ThemeContext';

export default function IncomeVsExpensesChart({ data = [], currency = 'INR', onOpenAddModal }) {
  const { isDark } = useTheme();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const income = payload.find(p => p.dataKey === 'income')?.value || 0;
      const expenses = payload.find(p => p.dataKey === 'expenses')?.value || 0;
      const surplus = income - expenses;

      return (
        <div className={`
          border px-3.5 py-2.5 rounded-xl shadow-xl text-xs
          ${isDark 
            ? 'bg-[#260814] border-[#52152C] text-[#FFFFFF]' 
            : 'bg-[#FFFFFF] border-[#E8E2E4] text-[#260814]'
          }
        `}>
          <p className="font-semibold mb-1.5">{label} Cash Flow</p>
          <div className="space-y-1">
            <p className="flex items-center justify-between gap-5">
              <span>Inflow:</span>
              <span className="font-bold font-mono">+{formatCurrency(income, currency)}</span>
            </p>
            <p className="flex items-center justify-between gap-5 opacity-80">
              <span>Outflow:</span>
              <span className="font-bold font-mono">-{formatCurrency(expenses, currency)}</span>
            </p>
            <div className={`pt-1.5 mt-1.5 border-t flex items-center justify-between gap-5 font-semibold ${isDark ? 'border-[#360B1C]' : 'border-[#E8E2E4]'}`}>
              <span>Net Surplus:</span>
              <span className="font-mono">
                {surplus >= 0 ? '+' : '-'}{formatCurrency(Math.abs(surplus), currency)}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const totalIn = data.reduce((a, b) => a + (b.income || 0), 0);
  const totalOut = data.reduce((a, b) => a + (b.expenses || 0), 0);
  const flowRatio = totalOut > 0 ? (totalIn / totalOut).toFixed(1) : (totalIn > 0 ? '1.0' : '0.0');

  return (
    <div className={`
      border rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-colors min-h-[360px]
      ${isDark 
        ? 'bg-[#260814] border-[#360B1C] text-[#FFFFFF]' 
        : 'bg-[#FFFFFF] border-[#E8E2E4] text-[#260814]'
      }
    `}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#FFFFFF]' : 'bg-[#4A1025]'}`} />
            <h3 className="font-serif font-bold text-lg tracking-wide">
              Income vs Expenses
            </h3>
          </div>
          <p className="text-xs opacity-75 mt-1">
            Computed from user-entered debits & credits
          </p>
        </div>

        {data.length > 0 && (
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-sm ${isDark ? 'bg-[#FFFFFF]' : 'bg-[#4A1025]'}`} />
              <span>Income</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-75">
              <span className={`w-2.5 h-2.5 rounded-sm border ${isDark ? 'bg-[#360B1C] border-[#FFFFFF]' : 'bg-[#FFFFFF] border-[#4A1025]'}`} />
              <span>Expenses</span>
            </div>
          </div>
        )}
      </div>

      {/* Bar Chart Container or Proper Empty State */}
      <div className="h-64 sm:h-72 w-full flex items-center justify-center">
        {data.length === 0 ? (
          <div className="text-center p-6 max-w-sm flex flex-col items-center">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${isDark ? 'bg-[#360B1C] text-[#FFFFFF]' : 'bg-[#F8F7F7] text-[#4A1025]'}`}>
              <BarChart3 className="w-6 h-6 opacity-60" />
            </div>
            <h4 className="font-serif font-bold text-base mb-1">No Inflow or Outflow Comparison</h4>
            <p className="text-xs opacity-75 leading-relaxed mb-4">
              Your capital velocity and month-by-month cash flow balance will appear here once entries are added.
            </p>
            {onOpenAddModal && (
              <button
                onClick={onOpenAddModal}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer ${
                  isDark ? 'bg-[#FFFFFF] text-[#260814] hover:bg-[#F8F7F7]' : 'bg-[#4A1025] text-[#FFFFFF] hover:bg-[#5E142F]'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>Record New Entry</span>
              </button>
            )}
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }} barGap={6}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#360B1C' : '#F0EBEF'} vertical={false} />
              <XAxis 
                dataKey="month" 
                stroke={isDark ? '#FFFFFF' : '#4A1025'} 
                tick={{ fill: isDark ? '#FFFFFF' : '#4A1025', fontSize: 11 }} 
                axisLine={{ stroke: isDark ? '#360B1C' : '#E8E2E4' }}
                tickLine={false}
              />
              <YAxis 
                stroke={isDark ? '#FFFFFF' : '#4A1025'} 
                tick={{ fill: isDark ? '#FFFFFF' : '#4A1025', fontSize: 11 }} 
                axisLine={{ stroke: isDark ? '#360B1C' : '#E8E2E4' }}
                tickLine={false}
                tickFormatter={(v) => formatCompactCurrency(v, currency)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="income" 
                fill={isDark ? '#FFFFFF' : '#4A1025'} 
                radius={[4, 4, 0, 0]} 
                maxBarSize={28}
              />
              <Bar 
                dataKey="expenses" 
                fill={isDark ? '#52152C' : '#8C2046'} 
                radius={[4, 4, 0, 0]} 
                maxBarSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Footer Stat Summary */}
      <div className={`mt-4 pt-3.5 border-t grid grid-cols-2 gap-2 text-xs ${isDark ? 'border-[#360B1C]' : 'border-[#E8E2E4]'}`}>
        <div className={`p-2.5 rounded-xl border flex items-center justify-between ${isDark ? 'bg-[#360B1C] border-[#52152C]' : 'bg-[#F8F7F7] border-[#E8E2E4]'}`}>
          <span className="opacity-75">Total Inflow</span>
          <span className="font-serif font-bold">{formatCurrency(totalIn, currency, false)}</span>
        </div>
        <div className={`p-2.5 rounded-xl border flex items-center justify-between ${isDark ? 'bg-[#360B1C] border-[#52152C]' : 'bg-[#F8F7F7] border-[#E8E2E4]'}`}>
          <span className="opacity-75">Inflow Multiple</span>
          <span className="font-serif font-bold">+{flowRatio}x</span>
        </div>
      </div>
    </div>
  );
}
