import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip 
} from 'recharts';
import { PieChart as PieIcon, ArrowUpRight } from 'lucide-react';

export default function CategoryDonutChart({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-[#1C060D] border border-[#481827] px-3.5 py-2 rounded-xl shadow-xl text-xs text-[#FDFBF7]">
          <p className="font-semibold text-[#DFB27A] mb-0.5">{item.name}</p>
          <div className="flex items-center justify-between gap-4">
            <span className="text-[#E89BA8]">Amount:</span>
            <span className="font-bold font-mono">${item.value.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-[#A89299] text-[11px]">
            <span>Share:</span>
            <span>{((item.value / total) * 100).toFixed(1)}%</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#230811] border border-[#3E1421] rounded-2xl p-6 shadow-xl shadow-[#15040a]/10 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E89BA8]" />
            <h3 className="font-serif font-bold text-lg text-[#FDFBF7] tracking-wide">
              Expenses by Category
            </h3>
          </div>
          <p className="text-xs text-[#E89BA8]/70 mt-1">
            Diversification of monthly disbursements
          </p>
        </div>
        <div className="p-2 rounded-xl bg-[#2D0B16] text-[#E89BA8] border border-[#3D1420]">
          <PieIcon className="w-4 h-4" />
        </div>
      </div>

      {/* Donut Chart with Center Label */}
      <div className="relative h-56 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={88}
              paddingAngle={3}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  stroke="#230811" 
                  strokeWidth={2}
                  className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Total Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10px] uppercase tracking-wider text-[#A89299] font-medium">Total Spend</span>
          <span className="font-serif font-bold text-lg text-[#FDFBF7] mt-0.5">
            ${total.toLocaleString()}
          </span>
          <span className="text-[10px] text-[#DFB27A]">100% Allocated</span>
        </div>
      </div>

      {/* Categories Legend List */}
      <div className="mt-4 pt-3 border-t border-[#3D1421] grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        {data.slice(0, 6).map((item, index) => (
          <div 
            key={item.name}
            className={`flex items-center justify-between p-1.5 rounded-lg transition-colors ${
              activeIndex === index ? 'bg-[#35101E]' : ''
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-[#E89BA8]/80 truncate text-[11px]">{item.name}</span>
            </div>
            <span className="font-mono font-medium text-[#FDFBF7] text-[11px] ml-1">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
