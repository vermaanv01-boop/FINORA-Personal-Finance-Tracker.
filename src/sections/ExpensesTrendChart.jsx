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

export default function ExpensesTrendChart({ data, currency = 'INR' }) {
  const [timeRange, setTimeRange] = useState('all');

  const filteredData = (timeRange === 'recent' && data.length > 4) ? data.slice(-4) : data;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1C060D] border border-[#481827] px-3.5 py-2.5 rounded-xl shadow-xl text-xs text-[#FDFBF7]">
          <p className="font-semibold text-[#DFB27A] mb-1">{label} Month</p>
          <div className="space-y-1">
            <p className="flex items-center justify-between gap-4">
              <span className="text-[#E89BA8]">Actual Spend:</span>
              <span className="font-bold font-mono">{formatCurrency(payload[0].value, currency)}</span>
            </p>
            {payload[1] && (
              <p className="flex items-center justify-between gap-4 text-[#A8989C]">
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
    <div className="bg-[#230811] border border-[#3E1421] rounded-2xl p-6 shadow-xl shadow-[#15040a]/10 flex flex-col justify-between">
      {/* Header with Title and Range Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E89BA8]" />
            <h3 className="font-serif font-bold text-lg text-[#FDFBF7] tracking-wide">
              Monthly Expenses Trend
            </h3>
          </div>
          <p className="text-xs text-[#E89BA8]/70 mt-1">
            Dynamic calculated outflow patterns from actual postings
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="bg-[#1A050D] p-1 rounded-xl border border-[#3A1420] flex items-center gap-1">
            <button
              onClick={() => setTimeRange('recent')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                timeRange === 'recent' 
                  ? 'bg-[#3D1220] text-[#FDFBF7] shadow-xs' 
                  : 'text-[#E89BA8]/60 hover:text-white'
              }`}
            >
              Recent
            </button>
            <button
              onClick={() => setTimeRange('all')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                timeRange === 'all' 
                  ? 'bg-[#3D1220] text-[#FDFBF7] shadow-xs' 
                  : 'text-[#E89BA8]/60 hover:text-white'
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
          <div className="h-full flex items-center justify-center text-xs text-[#A89299]">
            No expense trend data available. Add transactions to generate graph.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E89BA8" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#E89BA8" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="budgetGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DFB27A" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#DFB27A" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#3D1421" vertical={false} />
              <XAxis 
                dataKey="month" 
                stroke="#8C6E76" 
                tick={{ fill: '#A89299', fontSize: 11 }} 
                axisLine={{ stroke: '#3D1421' }}
                tickLine={false}
              />
              <YAxis 
                stroke="#8C6E76" 
                tick={{ fill: '#A89299', fontSize: 11 }} 
                axisLine={{ stroke: '#3D1421' }}
                tickLine={false}
                tickFormatter={(v) => formatCompactCurrency(v, currency)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="budget" 
                stroke="#DFB27A" 
                strokeWidth={1.5}
                strokeDasharray="4 4"
                fillOpacity={1} 
                fill="url(#budgetGradient)" 
                name="Budget Cap"
              />
              <Area 
                type="monotone" 
                dataKey="expenses" 
                stroke="#E89BA8" 
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
      <div className="mt-4 pt-3.5 border-t border-[#3D1421] flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-4 text-[#E89BA8]/80">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E89BA8]" />
            <span>Actual Outflow</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-[#DFB27A]" />
            <span className="text-[#DFB27A]">Monthly Target Cap</span>
          </div>
        </div>
        <div className="text-[11px] text-[#DFB27A] font-medium bg-[#2E0D18] px-2.5 py-1 rounded-lg border border-[#DFB27A]/20 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-[#DFB27A]" />
          <span>Average monthly outflow: {formatCurrency(avgExpense, currency, false)}</span>
        </div>
      </div>
    </div>
  );
}
