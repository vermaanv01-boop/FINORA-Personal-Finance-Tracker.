import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export default function TransactionsView({ transactions }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filtered = transactions.filter(t => {
    const matchesFilter = filterType === 'all' || t.type === filterType;
    const matchesSearch = 
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.account.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Banner / Header */}
      <div className="bg-gradient-to-r from-[#2D0B16] via-[#230811] to-[#18040C] border border-[#481827] rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#DFB27A] font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Unified Ledger</span>
          </div>
          <h2 className="font-serif text-2xl font-bold">Transaction History</h2>
          <p className="text-xs text-[#E89BA8]/80 mt-1 max-w-xl leading-relaxed">
            Review detailed postings, account reconciliations, categorized expenses and verified inbound transfers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            disabled 
            title="Transaction management will be enabled in Prompt 2"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#DFB27A] to-[#E89BA8] text-[#230811] font-semibold text-xs opacity-90 cursor-not-allowed shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Transaction (Phase 2)</span>
          </button>
        </div>
      </div>

      {/* Filter & Controls Toolbar */}
      <div className="bg-[#230811] border border-[#3E1421] rounded-2xl p-4 shadow-lg flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A89299]" />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by payee, category or account..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#1C060D] border border-[#3D1421] text-xs text-[#FDFBF7] placeholder:text-[#8C6E76] focus:outline-hidden focus:border-[#E89BA8]"
          />
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex items-center gap-1 bg-[#1A050D] p-1 rounded-xl border border-[#3A1420]">
            {['all', 'income', 'expense'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${
                  filterType === type 
                    ? 'bg-[#3D1220] text-[#FDFBF7]' 
                    : 'text-[#E89BA8]/60 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1C060D] border border-[#3D1421] text-xs text-[#DFB27A] font-semibold hover:bg-[#2B0A15]">
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CSV Export</span>
          </button>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-[#230811] border border-[#3E1421] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#3D1421] bg-[#1C060D] text-[11px] font-semibold text-[#DFB27A] uppercase tracking-wider">
                <th className="py-3.5 px-5">Transaction / Payee</th>
                <th className="py-3.5 px-5">Category</th>
                <th className="py-3.5 px-5">Account</th>
                <th className="py-3.5 px-5">Timestamp</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Amount (USD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#310E1B] text-xs">
              {filtered.map((item) => {
                const isIncome = item.type === 'income';
                return (
                  <tr key={item.id} className="hover:bg-[#2B0A15]/60 transition-colors">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isIncome ? 'bg-[#182B1E] text-[#34D399]' : 'bg-[#2E0D18] text-[#E89BA8]'
                        }`}>
                          {isIncome ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="font-semibold text-[#FDFBF7]">{item.title}</p>
                          <p className="text-[10px] text-[#A89299]">Ref: {item.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-[#E89BA8]/90 font-medium">{item.category}</td>
                    <td className="py-4 px-5 text-[#A89299]">{item.account}</td>
                    <td className="py-4 px-5 text-[#A89299]">{item.date}</td>
                    <td className="py-4 px-5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#1A3824] text-[#34D399] border border-[#2B5E3C]">
                        <CheckCircle className="w-3 h-3" />
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right font-mono font-bold">
                      <span className={isIncome ? 'text-[#34D399]' : 'text-[#FDFBF7]'}>
                        {isIncome ? '+' : '-'}${item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

