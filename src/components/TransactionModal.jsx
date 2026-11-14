import React, { useState, useEffect } from 'react';
import { 
  X, 
  PlusCircle, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Check,
  Edit3
} from 'lucide-react';
import { CURRENCIES } from '../utils/currency';
import { useTheme } from '../context/ThemeContext';

const CATEGORY_OPTIONS = [
  'Housing & Rent',
  'Food & Dining',
  'Investments',
  'Transport & Travel',
  'Utilities & Bills',
  'Entertainment & Leisure',
  'Healthcare & Wellness',
  'Salary & Bonus',
  'Consulting Income',
  'Dividend & Yield',
  'Other'
];

const ACCOUNT_OPTIONS = [
  'Private Banking •• 4910',
  'Burgundy Signature •• 8842',
  'Wealth Demat •• 8821',
  'Wealth Reserve •• 3011',
  'High-Yield Savings •• 9022',
  'Cash Reserve'
];

export default function TransactionModal({ 
  isOpen, 
  onClose, 
  onSaveTransaction, 
  editingTransaction = null,
  currency = 'INR'
}) {
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: 'Food & Dining',
    account: 'Private Banking •• 4910',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        title: editingTransaction.title || '',
        amount: editingTransaction.amount?.toString() || '',
        type: editingTransaction.type || 'expense',
        category: editingTransaction.category || 'Food & Dining',
        account: editingTransaction.account || 'Private Banking •• 4910',
        date: editingTransaction.date?.slice(0, 10) || new Date().toISOString().split('T')[0],
        notes: editingTransaction.notes || ''
      });
    } else {
      setFormData({
        title: '',
        amount: '',
        type: 'expense',
        category: 'Food & Dining',
        account: 'Private Banking •• 4910',
        date: new Date().toISOString().split('T')[0],
        notes: ''
      });
    }
    setErrors({});
  }, [editingTransaction, isOpen]);

  if (!isOpen) return null;

  const currSymbol = CURRENCIES[currency]?.symbol || '₹';

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Payee or description is required';
    if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
      errs.amount = 'Please enter a valid amount greater than 0';
    }
    if (!formData.date) {
      errs.date = 'Date is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    let icon = 'CreditCard';
    if (formData.type === 'income') {
      icon = 'ArrowDownLeft';
    } else {
      if (formData.category.includes('Food')) icon = 'Utensils';
      else if (formData.category.includes('Travel')) icon = 'Plane';
      else if (formData.category.includes('Invest')) icon = 'TrendingUp';
      else if (formData.category.includes('Health')) icon = 'Activity';
      else if (formData.category.includes('Housing')) icon = 'Home';
      else if (formData.category.includes('Util')) icon = 'Zap';
      else icon = 'Laptop';
    }

    const payload = {
      ...(editingTransaction ? { id: editingTransaction.id } : {}),
      title: formData.title.trim(),
      amount: parseFloat(formData.amount),
      type: formData.type,
      category: formData.category,
      account: formData.account,
      date: formData.date,
      status: editingTransaction?.status || 'Completed',
      notes: formData.notes.trim(),
      icon
    };

    onSaveTransaction(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div 
        className={`w-full max-w-lg border rounded-2xl shadow-2xl overflow-hidden transition-all ${
          isDark ? 'bg-[#260814] border-[#360B1C] text-[#FFFFFF]' : 'bg-[#FFFFFF] border-[#E8E2E4] text-[#260814]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`px-6 py-5 border-b flex items-center justify-between ${
          isDark ? 'bg-[#360B1C] border-[#52152C]' : 'bg-[#4A1025] text-[#FFFFFF] border-[#5E142F]'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              isDark ? 'bg-[#FFFFFF] text-[#260814]' : 'bg-[#FFFFFF] text-[#4A1025]'
            }`}>
              {editingTransaction ? <Edit3 className="w-4 h-4 font-bold" /> : <PlusCircle className="w-4 h-4 font-bold" />}
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg leading-tight text-[#FFFFFF]">
                {editingTransaction ? 'Edit Transaction' : 'Record Transaction'}
              </h3>
              <p className="text-[11px] text-[#FFFFFF]/70">
                {editingTransaction ? `Updating entry ${editingTransaction.id}` : 'Enter transaction details to update ledger & charts'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Type Selector (Income vs Expense) */}
          <div className={`grid grid-cols-2 gap-3 p-1 rounded-xl border ${
            isDark ? 'bg-[#360B1C] border-[#52152C]' : 'bg-[#F8F7F7] border-[#E8E2E4]'
          }`}>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'expense' })}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                formData.type === 'expense'
                  ? isDark ? 'bg-[#FFFFFF] text-[#260814]' : 'bg-[#4A1025] text-[#FFFFFF]'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Expense (Debit)</span>
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'income' })}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                formData.type === 'income'
                  ? isDark ? 'bg-[#FFFFFF] text-[#260814]' : 'bg-[#4A1025] text-[#FFFFFF]'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <ArrowDownLeft className="w-4 h-4" />
              <span>Income (Credit)</span>
            </button>
          </div>

          {/* Title / Description */}
          <div>
            <label className="block text-xs font-semibold mb-1.5 opacity-90">
              Title / Description *
            </label>
            <input 
              type="text"
              placeholder="e.g. Prestige Lease, Advisory Fee, Gourmet Provisions"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-3.5 py-2.5 border rounded-xl text-xs focus:outline-hidden ${
                isDark ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF]' : 'bg-[#F8F7F7] border-[#E8E2E4] text-[#260814]'
              } ${errors.title ? 'border-red-500' : ''}`}
            />
            {errors.title && <p className="text-[10px] text-red-400 mt-1">{errors.title}</p>}
          </div>

          {/* Amount & Date Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 opacity-90">
                Amount ({currency}) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold">
                  {currSymbol}
                </span>
                <input 
                  type="number"
                  step="any"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className={`w-full pl-8 pr-3.5 py-2.5 border rounded-xl text-xs font-mono font-bold focus:outline-hidden ${
                    isDark ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF]' : 'bg-[#F8F7F7] border-[#E8E2E4] text-[#260814]'
                  } ${errors.amount ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.amount && <p className="text-[10px] text-red-400 mt-1">{errors.amount}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5 opacity-90">
                Transaction Date *
              </label>
              <input 
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={`w-full px-3.5 py-2.5 border rounded-xl text-xs focus:outline-hidden ${
                  isDark ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF]' : 'bg-[#F8F7F7] border-[#E8E2E4] text-[#260814]'
                }`}
              />
              {errors.date && <p className="text-[10px] text-red-400 mt-1">{errors.date}</p>}
            </div>
          </div>

          {/* Category & Account Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 opacity-90">
                Category
              </label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full px-3.5 py-2.5 border rounded-xl text-xs focus:outline-hidden ${
                  isDark ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF]' : 'bg-[#F8F7F7] border-[#E8E2E4] text-[#260814]'
                }`}
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat} className={isDark ? 'bg-[#260814]' : 'bg-[#FFFFFF]'}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5 opacity-90">
                Funding Account
              </label>
              <select 
                value={formData.account}
                onChange={(e) => setFormData({ ...formData, account: e.target.value })}
                className={`w-full px-3.5 py-2.5 border rounded-xl text-xs focus:outline-hidden ${
                  isDark ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF]' : 'bg-[#F8F7F7] border-[#E8E2E4] text-[#260814]'
                }`}
              >
                {ACCOUNT_OPTIONS.map((acc) => (
                  <option key={acc} value={acc} className={isDark ? 'bg-[#260814]' : 'bg-[#FFFFFF]'}>
                    {acc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Optional Memo */}
          <div>
            <label className="block text-xs font-semibold mb-1.5 opacity-90">
              Memo / Notes (Optional)
            </label>
            <input 
              type="text"
              placeholder="e.g. Tax deductible, family dinner, investment tranche"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className={`w-full px-3.5 py-2.5 border rounded-xl text-xs focus:outline-hidden ${
                isDark ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF]' : 'bg-[#F8F7F7] border-[#E8E2E4] text-[#260814]'
              }`}
            />
          </div>

          {/* Modal Actions */}
          <div className={`pt-4 border-t flex items-center justify-end gap-3 ${isDark ? 'border-[#360B1C]' : 'border-[#E8E2E4]'}`}>
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer ${
                isDark ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF]' : 'bg-[#F8F7F7] border-[#E8E2E4] text-[#260814]'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all cursor-pointer ${
                isDark ? 'bg-[#FFFFFF] text-[#260814] hover:bg-[#F8F7F7]' : 'bg-[#4A1025] text-[#FFFFFF] hover:bg-[#5E142F]'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{editingTransaction ? 'Save Changes' : 'Record Transaction'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
