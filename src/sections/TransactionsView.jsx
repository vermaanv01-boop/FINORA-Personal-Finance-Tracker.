import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CheckCircle, 
  Sparkles, 
  Edit2, 
  Trash2,
  Receipt,
  PlusCircle
} from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { useTheme } from '../context/ThemeContext';

export default function TransactionsView({ 
  transactions = [], 
  currency = 'INR',
  onOpenAddModal,
  onEditTransaction,
  onDeleteTransaction
}) {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(transactions.map(t => t.category).filter(Boolean)))];

  const filtered = transactions.filter(t => {
    const matchesFilter = filterType === 'all' || t.type === filterType;
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch = 
      (t.title && t.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (t.category && t.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (t.account && t.account.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesCategory && matchesSearch;
  });

  const exportCSV = () => {
    if (filtered.length === 0) return;
    const headers = ['ID,Title,Type,Category,Account,Date,Status,Amount\n'];
    const rows = filtered.map(t => 
      `"${t.id}","${(t.title || '').replace(/"/g, '""')}","${t.type}","${t.category}","${t.account}","${t.date}","${t.status}",${t.amount}`
    );
    const blob = new Blob([headers.concat(rows.join('\n'))], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FINORA_Ledger_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Banner / Header */}
      <div className={`
        border rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors
        ${isDark 
          ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF]' 
          : 'bg-[#4A1025] border-[#5E142F] text-[#FFFFFF]'
        }
      `}>
        <div>
          <div className="flex items-center gap-2 text-xs opacity-80 font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Unified Ledger</span>
          </div>
          <h2 className="font-serif text-2xl font-bold">Transaction Ledger & Management</h2>
          <p className="text-xs opacity-80 mt-1 max-w-xl leading-relaxed">
            Record, update, filter and reconcile live debits & credits. All metric changes automatically synchronize with dashboard charts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenAddModal}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer
              ${isDark ? 'bg-[#FFFFFF] text-[#260814] hover:bg-[#F8F7F7]' : 'bg-[#FFFFFF] text-[#4A1025] hover:bg-[#F8F7F7]'}
            `}
          >
            <Plus className="w-4 h-4" />
            <span>Record Transaction</span>
          </button>
        </div>
      </div>

      {/* Filter & Controls Toolbar */}
      <div className={`
        border rounded-2xl p-4 shadow-lg flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 transition-colors
        ${isDark 
          ? 'bg-[#260814] border-[#360B1C] text-[#FFFFFF]' 
          : 'bg-[#FFFFFF] border-[#E8E2E4] text-[#260814]'
        }
      `}>
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by payee, category or account..."
            className={`w-full pl-10 pr-4 py-2 rounded-xl border text-xs focus:outline-hidden transition-all ${
              isDark 
                ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF] placeholder:text-[#FFFFFF]/40 focus:border-[#FFFFFF]' 
                : 'bg-[#F8F7F7] border-[#E8E2E4] text-[#260814] placeholder:text-gray-400 focus:border-[#4A1025]'
            }`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] opacity-75 hidden sm:inline">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`text-xs border rounded-xl px-3 py-1.5 focus:outline-hidden ${
                isDark ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF]' : 'bg-[#F8F7F7] border-[#E8E2E4] text-[#260814]'
              }`}
            >
              {categories.map((c) => (
                <option key={c} value={c} className={isDark ? 'bg-[#260814]' : 'bg-[#FFFFFF]'}>
                  {c === 'all' ? 'All Categories' : c}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className={`flex items-center gap-1 p-1 rounded-xl border ${isDark ? 'bg-[#360B1C] border-[#52152C]' : 'bg-[#F8F7F7] border-[#E8E2E4]'}`}>
            {['all', 'income', 'expense'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors cursor-pointer ${
                  filterType === type 
                    ? isDark ? 'bg-[#FFFFFF] text-[#260814]' : 'bg-[#4A1025] text-[#FFFFFF]' 
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <button 
            onClick={exportCSV}
            disabled={filtered.length === 0}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-colors ${
              filtered.length === 0 
                ? 'opacity-40 cursor-not-allowed' 
                : 'cursor-pointer hover:opacity-100'
            } ${
              isDark ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF] hover:bg-[#4A1025]' : 'bg-[#F8F7F7] border-[#E8E2E4] text-[#4A1025] hover:bg-[#FFFFFF]'
            }`}
            title={filtered.length === 0 ? "No records to export" : "Download records in CSV"}
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* Ledger Table */}
      <div className={`
        border rounded-2xl overflow-hidden shadow-xl transition-colors
        ${isDark 
          ? 'bg-[#260814] border-[#360B1C]' 
          : 'bg-[#FFFFFF] border-[#E8E2E4]'
        }
      `}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b text-[11px] font-semibold uppercase tracking-wider ${
                isDark ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF]' : 'bg-[#F8F7F7] border-[#E8E2E4] text-[#4A1025]'
              }`}>
                <th className="py-3.5 px-5">Transaction / Payee</th>
                <th className="py-3.5 px-5">Category</th>
                <th className="py-3.5 px-5">Account</th>
                <th className="py-3.5 px-5">Date</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Amount ({currency})</th>
                <th className="py-3.5 px-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y text-xs ${isDark ? 'divide-[#360B1C] text-[#FFFFFF]' : 'divide-[#E8E2E4] text-[#260814]'}`}>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-16 px-4">
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${isDark ? 'bg-[#360B1C] text-[#FFFFFF]' : 'bg-[#F8F7F7] text-[#4A1025]'}`}>
                        <Receipt className="w-6 h-6 opacity-60" />
                      </div>
                      <h4 className="font-serif font-bold text-base mb-1">Your Ledger is Clean & Empty</h4>
                      <p className="text-xs opacity-75 leading-relaxed mb-4">
                        You have not recorded any financial transactions yet. Add your income or expense entries to begin tracking.
                      </p>
                      <button
                        onClick={onOpenAddModal}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer ${
                          isDark ? 'bg-[#FFFFFF] text-[#260814] hover:bg-[#F8F7F7]' : 'bg-[#4A1025] text-[#FFFFFF] hover:bg-[#5E142F]'
                        }`}
                      >
                        <PlusCircle className="w-4 h-4" />
                        <span>Add First Transaction</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 opacity-60">
                    No transactions match your search filter "{searchTerm}".
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const isIncome = item.type === 'income';
                  return (
                    <tr key={item.id} className={`transition-colors group ${isDark ? 'hover:bg-[#360B1C]' : 'hover:bg-[#F8F7F7]'}`}>
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                            isIncome 
                              ? isDark ? 'bg-[#FFFFFF] text-[#260814] border-[#FFFFFF]' : 'bg-[#4A1025] text-[#FFFFFF] border-[#4A1025]' 
                              : isDark ? 'bg-[#360B1C] text-[#FFFFFF] border-[#52152C]' : 'bg-[#F8F7F7] text-[#4A1025] border-[#E8E2E4]'
                          }`}>
                            {isIncome ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                          </div>
                          <div>
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-[10px] opacity-60">{item.notes || `Ref: ${item.id}`}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-5 opacity-90 font-medium">{item.category}</td>
                      <td className="py-4 px-5 opacity-75">{item.account}</td>
                      <td className="py-4 px-5 opacity-75">{item.date}</td>
                      <td className="py-4 px-5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${
                          isDark 
                            ? 'bg-[#360B1C] text-[#FFFFFF] border-[#52152C]' 
                            : 'bg-[#F8F7F7] text-[#4A1025] border-[#E8E2E4]'
                        }`}>
                          <CheckCircle className="w-3 h-3" />
                          {item.status || 'Completed'}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right font-mono font-bold">
                        <span>
                          {isIncome ? '+' : '-'}{formatCurrency(item.amount, currency)}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => onEditTransaction(item)}
                            className="p-1.5 rounded-lg opacity-75 hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
                            title="Edit transaction"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteTransaction(item.id)}
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-950/20 transition-colors cursor-pointer"
                            title="Delete transaction"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
