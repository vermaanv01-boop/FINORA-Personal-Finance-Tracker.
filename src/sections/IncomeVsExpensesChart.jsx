import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  Legend
} from 'recharts';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function IncomeVsExpensesChart({ data }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const income = payload.find(p => p.dataKey === 'income')?.value || 0;
      const expenses = payload.find(p => p.dataKey === 'expenses')?.value || 0;
      const surplus = income - expenses;

      return (
        <div className="bg-[#1C060D] border border-[#481827] px-3.5 py-2.5 rounded-xl shadow-xl text-xs text-[#FDFBF7]">
          <p className="font-semibold text-[#DFB27A] mb-1.5">{label} 2026 Cash Flow</p>
          <div className="space-y-1">
            <p className="flex items-center justify-between gap-5 text-[#DFB27A]">
              <span>Inflow:</span>
              <span className="font-bold font-mono">+${income.toLocaleString()}</span>
            </p>
            <p className="flex items-center justify-between gap-5 text-[#E89BA8]">
              <span>Outflow:</span>
              <span className="font-bold font-mono">-${expenses.toLocaleString()}</span>
            </p>
            <div className="pt-1.5 mt-1.5 border-t border-[#3D1421] flex items-center justify-between gap-5 text-[#34D399]">
              <span>Net Surplus:</span>
              <span className="font-bold font-mono">+${surplus.toLocaleString()}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#230811] border border-[#3E1421] rounded-2xl p-6 shadow-xl shadow-[#15040a]/10 flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#DFB27A]" />
            <h3 className="font-serif font-bold text-lg text-[#FDFBF7] tracking-wide">
              Income vs Expenses
            </h3>
          </div>
          <p className="text-xs text-[#E89BA8]/70 mt-1">
            Comparative capital velocity over the past 6 months
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-[#DFB27A]">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#DFB27A]" />
            <span>Income</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#E89BA8]">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#E89BA8]" />
            <span>Expenses</span>
          </div>
        </div>
      </div>

      {/* Bar Chart Container */}
      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -18, bottom: 0 }} barGap={6}>
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
              tickFormatter={(v) => `$${v / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="income" 
              fill="#DFB27A" 
              radius={[4, 4, 0, 0]} 
              maxBarSize={28}
            />
            <Bar 
              dataKey="expenses" 
              fill="#E89BA8" 
              radius={[4, 4, 0, 0]} 
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Stat Summary */}
      <div className="mt-4 pt-3.5 border-t border-[#3D1421] grid grid-cols-2 gap-2 text-xs">
        <div className="bg-[#1A050D] p-2.5 rounded-xl border border-[#3A1420] flex items-center justify-between">
          <span className="text-[#A89299]">Avg Monthly Inflow</span>
          <span className="font-serif font-bold text-[#DFB27A]">$13,125</span>
        </div>
        <div className="bg-[#1A050D] p-2.5 rounded-xl border border-[#3A1420] flex items-center justify-between">
          <span className="text-[#A89299]">Net Inflow Ratio</span>
          <span className="font-serif font-bold text-[#34D399]">+2.4x</span>
        </div>
      </div>
    </div>
  );
}
