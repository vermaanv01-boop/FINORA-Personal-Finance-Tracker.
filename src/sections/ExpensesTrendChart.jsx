import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { Sparkles } from 'lucide-react';
import { formatCurrency, formatCompactCurrency } from '../utils/currency';
import { useTheme } from '../context/ThemeContext';

export default function ExpensesTrendChart({ data, currency = 'INR' }) {
  const { isDark } = useTheme();
  const [timeRange, setTimeRange] = useState('all');

  const filteredData = (timeRange === 'recent' && data.length > 4) ? data.slice(-4) : data;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`
          border px-3.5 py-2.5 rounded-xl shadow-xl text-xs
          ${isDark 
            ? 'bg-[#260814] border-[#52152C] text-[#FFFFFF]' 
            : 'bg-[#FFFFFF] border-[#E8E2E4] text-[#260814]'
          }
        `}>
          <p className="font-semibold mb-1">{label} Month</p>
          <div className="space-y-1">
            <p className="flex items-center justify-between gap-4">
              <span>Actual Spend:</span>
              <span className="font-bold font-mono">{formatCurrency(payload[0].value, currency)}</span>
            </p>
            {payload[1] && (
              <p className="flex items-center justify-between gap-4 opacity-75">
                <span>Planned Cap:</span>
                <span className="font-mono">{formatCurrency(payload[1].value, currency)}</span>
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const avgExpense = data.length > 0
    ? Math.round(data.reduce((a, b) => a + (b.expenses || 0), 0) / data.length)
    : 0;

  return (
    <div className={`
      border rounded-2xl p-6 shadow-xl flex flex-col justify-between transition-colors
      ${isDark 
        ? 'bg-[#260814] border-[#360B1C] text-[#FFFFFF]' 
        : 'bg-[#FFFFFF] border-[#E8E2E4] text-[#260814]'
      }
    `}>
      {/* Header with Title and Range Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#FFFFFF]' : 'bg-[#4A1025]'}`} />
            <h3 className="font-serif font-bold text-lg tracking-wide">
              Monthly Expenses Trend
            </h3>
          </div>
          <p className="text-xs opacity-75 mt-1">
            Dynamic calculated outflow patterns from actual postings
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className={`p-1 rounded-xl border flex items-center gap-1 ${isDark ? 'bg-[#360B1C] border-[#52152C]' : 'bg-[#F8F7F7] border-[#E8E2E4]'}`}>
            <button
              onClick={() => setTimeRange('recent')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                timeRange === 'recent' 
                  ? isDark ? 'bg-[#FFFFFF] text-[#260814]' : 'bg-[#4A1025] text-[#FFFFFF]' 
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              Recent
            </button>
            <button
              onClick={() => setTimeRange('all')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                timeRange === 'all' 
                  ? isDark ? 'bg-[#FFFFFF] text-[#260814]' : 'bg-[#4A1025] text-[#FFFFFF]' 
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              All Months
            </button>
          </div>
        </div>
      </div>

      {/* Chart container */}
      <div className="h-64 sm:h-72 w-full">
        {filteredData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs opacity-60">
            No expense trend data available. Add transactions to generate graph.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isDark ? '#FFFFFF' : '#4A1025'} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={isDark ? '#FFFFFF' : '#4A1025'} stopOpacity={0.0} />
                </linearGradient>
              </defs>
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
              <Area 
                type="monotone" 
                dataKey="budget" 
                stroke={isDark ? '#FFFFFF' : '#4A1025'} 
                strokeWidth={1.5}
                strokeDasharray="4 4"
                fill="none"
                name="Budget Cap"
              />
              <Area 
                type="monotone" 
                dataKey="expenses" 
                stroke={isDark ? '#FFFFFF' : '#4A1025'} 
                strokeWidth={2.5}
                fillOpacity={1} 
                fill="url(#expenseGradient)" 
                name="Expenses"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Footer Insight Capsule */}
      <div className={`mt-4 pt-3.5 border-t flex flex-wrap items-center justify-between gap-2 text-xs ${isDark ? 'border-[#360B1C]' : 'border-[#E8E2E4]'}`}>
        <div className="flex items-center gap-4 opacity-80">
          <div className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-[#FFFFFF]' : 'bg-[#4A1025]'}`} />
            <span>Actual Outflow</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`w-2.5 h-0.5 ${isDark ? 'bg-[#FFFFFF]' : 'bg-[#4A1025]'}`} />
            <span>Monthly Target Cap</span>
          </div>
        </div>
        <div className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${isDark ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF]' : 'bg-[#F8F7F7] border-[#E8E2E4] text-[#4A1025]'}`}>
          <Sparkles className="w-3 h-3" />
          <span>Average monthly outflow: {formatCurrency(avgExpense, currency, false)}</span>
        </div>
      </div>
    </div>
  );
}
