import React, { useState, useEffect } from 'react';
import { 
  X, 
  PlusCircle, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Calendar, 
  CreditCard, 
  Tag, 
  Check,
  Edit3
} from 'lucide-react';
import { CURRENCIES } from '../utils/currency';

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
  'HDFC Imperia •• 4910',
  'Infinia Metal •• 8842',
  'Zerodha Demat •• 8821',
  'ICICI Wealth •• 3011',
  'SBI Premier Savings •• 9022',
  'Cash Reserve'
];

export default function TransactionModal({ 
  isOpen, 
  onClose, 
  onSaveTransaction, 
  editingTransaction = null,
  currency = 'INR'
}) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: 'Food & Dining',
    account: 'HDFC Imperia •• 4910',
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
        account: editingTransaction.account || 'HDFC Imperia •• 4910',
        date: editingTransaction.date?.slice(0, 10) || new Date().toISOString().split('T')[0],
        notes: editingTransaction.notes || ''
      });
    } else {
      setFormData({
        title: '',
        amount: '',
        type: 'expense',
        category: 'Food & Dining',
        account: 'HDFC Imperia •• 4910',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#120308]/75 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div 
        className="w-full max-w-lg bg-[#230811] border border-[#441624] rounded-2xl shadow-2xl overflow-hidden text-[#FDFBF7]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#3E1421] flex items-center justify-between bg-gradient-to-r from-[#2D0B16] to-[#1C060D]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#DFB27A] to-[#E89BA8] flex items-center justify-center text-[#230811]">
              {editingTransaction ? <Edit3 className="w-4 h-4 font-bold" /> : <PlusCircle className="w-4 h-4 font-bold" />}
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg leading-tight">
                {editingTransaction ? 'Edit Transaction' : 'Record Transaction'}
              </h3>
              <p className="text-[11px] text-[#E89BA8]/70">
                {editingTransaction ? `Updating entry ${editingTransaction.id}` : 'Enter transaction details to update ledger & charts'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#A89299] hover:text-white hover:bg-[#3D1220] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Type Selector (Income vs Expense) */}
          <div className="grid grid-cols-2 gap-3 p-1 rounded-xl bg-[#1A050D] border border-[#37121F]">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'expense' })}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
                formData.type === 'expense'
                  ? 'bg-gradient-to-r from-[#3D1220] to-[#5C1D2E] text-white shadow-md border border-[#E89BA8]/30'
                  : 'text-[#A89299] hover:text-white'
              }`}
            >
              <ArrowUpRight className="w-4 h-4 text-[#E89BA8]" />
              <span>Expense (Debit)</span>
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'income' })}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
                formData.type === 'income'
                  ? 'bg-gradient-to-r from-[#182B1E] to-[#254630] text-[#34D399] shadow-md border border-[#34D399]/30'
                  : 'text-[#A89299] hover:text-white'
              }`}
            >
              <ArrowDownLeft className="w-4 h-4 text-[#34D399]" />
              <span>Income (Credit)</span>
            </button>
          </div>

          {/* Title / Description */}
          <div>
            <label className="block text-xs font-semibold text-[#E89BA8] mb-1.5">
              Title / Description *
            </label>
            <input 
              type="text"
              placeholder="e.g. Prestige Lease, Consulting Fee, Nature's Basket"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-3.5 py-2.5 bg-[#1C060D] border rounded-xl text-xs text-[#FDFBF7] placeholder:text-[#6E555C] focus:outline-hidden focus:ring-1 focus:ring-[#DFB27A] ${
                errors.title ? 'border-rose-500' : 'border-[#3D1421]'
              }`}
            />
            {errors.title && <p className="text-[10px] text-rose-400 mt-1">{errors.title}</p>}
          </div>

          {/* Amount & Date Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#E89BA8] mb-1.5">
                Amount ({currency}) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#DFB27A] font-bold">
                  {currSymbol}
                </span>
                <input 
                  type="number"
                  step="any"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className={`w-full pl-8 pr-3.5 py-2.5 bg-[#1C060D] border rounded-xl text-xs font-mono font-bold text-[#FDFBF7] placeholder:text-[#6E555C] focus:outline-hidden focus:ring-1 focus:ring-[#DFB27A] ${
                    errors.amount ? 'border-rose-500' : 'border-[#3D1421]'
                  }`}
                />
              </div>
              {errors.amount && <p className="text-[10px] text-rose-400 mt-1">{errors.amount}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#E89BA8] mb-1.5">
                Transaction Date *
              </label>
              <input 
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#1C060D] border border-[#3D1421] rounded-xl text-xs text-[#FDFBF7] focus:outline-hidden focus:ring-1 focus:ring-[#DFB27A]"
              />
              {errors.date && <p className="text-[10px] text-rose-400 mt-1">{errors.date}</p>}
            </div>
          </div>

          {/* Category & Account Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#E89BA8] mb-1.5">
                Category
              </label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#1C060D] border border-[#3D1421] rounded-xl text-xs text-[#FDFBF7] focus:outline-hidden focus:ring-1 focus:ring-[#DFB27A]"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#230811] text-[#FDFBF7]">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#E89BA8] mb-1.5">
                Funding Account
              </label>
              <select 
                value={formData.account}
                onChange={(e) => setFormData({ ...formData, account: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#1C060D] border border-[#3D1421] rounded-xl text-xs text-[#FDFBF7] focus:outline-hidden focus:ring-1 focus:ring-[#DFB27A]"
              >
                {ACCOUNT_OPTIONS.map((acc) => (
                  <option key={acc} value={acc} className="bg-[#230811] text-[#FDFBF7]">
                    {acc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Optional Memo */}
          <div>
            <label className="block text-xs font-semibold text-[#E89BA8] mb-1.5">
              Memo / Notes (Optional)
            </label>
            <input 
              type="text"
              placeholder="e.g. Tax deductible, family dinner, investment tranche"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#1C060D] border border-[#3D1421] rounded-xl text-xs text-[#FDFBF7] placeholder:text-[#6E555C] focus:outline-hidden focus:ring-1 focus:ring-[#DFB27A]"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-[#3D1421] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#1C060D] border border-[#3D1421] text-xs font-semibold text-[#A89299] hover:text-white hover:bg-[#2F0E1A] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DFB27A] to-[#E89BA8] text-[#230811] font-bold text-xs shadow-lg hover:opacity-95 transition-all"
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
