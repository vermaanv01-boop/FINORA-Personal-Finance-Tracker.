import React, { useState } from 'react';
import { 
  Trash2, 
  Save, 
  Check,
  DollarSign,
  Bell,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { CURRENCIES, formatCurrency } from '../utils/currency';
import { useTheme } from '../context/ThemeContext';

export default function SettingsView({ 
  settings, 
  updateSettings, 
  clearAllTransactions 
}) {
  const { isDark } = useTheme();
  const [currency, setCurrency] = useState(settings?.currency || 'INR');
  const [budgetLimit, setBudgetLimit] = useState(settings?.monthlyBudgetLimit || 100000);
  const [emailAlerts, setEmailAlerts] = useState(settings?.emailAlerts ?? true);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [clearedSuccess, setClearedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateSettings({
      currency,
      monthlyBudgetLimit: Number(budgetLimit) || 100000,
      emailAlerts
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to delete all transactions for your account? This action cannot be undone.')) {
      clearAllTransactions();
      setClearedSuccess(true);
      setTimeout(() => setClearedSuccess(false), 2500);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Banner */}
      <div className={`
        border rounded-2xl p-6 shadow-xl transition-colors
        ${isDark 
          ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF]' 
          : 'bg-[#4A1025] border-[#5E142F] text-[#FFFFFF]'
        }
      `}>
        <div className="flex items-center gap-2 text-xs opacity-80 font-semibold uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Configuration Hub</span>
        </div>
        <h2 className="font-serif text-2xl font-bold">Preferences & Currency Setup</h2>
        <p className="text-xs opacity-80 mt-1">
          Configure default reporting currency, monthly budget caps, notifications, and manage account ledger data.
        </p>
      </div>

      {savedSuccess && (
        <div className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
          isDark 
            ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF]' 
            : 'bg-[#F8F7F7] border-[#4A1025] text-[#4A1025]'
        }`}>
          <Check className="w-4 h-4" />
          <span>Preferences saved successfully to LocalStorage. Live calculations updated!</span>
        </div>
      )}

      {clearedSuccess && (
        <div className="p-3.5 rounded-xl border border-red-500 bg-red-950/40 text-red-300 text-xs font-semibold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          <span>All account transactions have been cleared. Dashboard is reset to zero.</span>
        </div>
      )}

      {/* General Settings */}
      <form onSubmit={handleSave} className={`
        border rounded-2xl p-6 shadow-xl space-y-6 transition-colors
        ${isDark 
          ? 'bg-[#260814] border-[#360B1C] text-[#FFFFFF]' 
          : 'bg-[#FFFFFF] border-[#E8E2E4] text-[#260814]'
        }
      `}>
        <div>
          <h3 className="font-serif font-bold text-base mb-1 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <span>Currency & Budget Thresholds</span>
          </h3>
          <p className="text-xs opacity-75 mb-4">
            FINORA dynamically re-formats all cards, charts, and transaction ledgers according to your selected currency.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 opacity-90">
                Default Currency *
              </label>
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                className={`w-full border text-xs rounded-xl px-3.5 py-2.5 focus:outline-hidden ${
                  isDark ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF]' : 'bg-[#F8F7F7] border-[#E8E2E4] text-[#260814]'
                }`}
              >
                {Object.values(CURRENCIES).map((curr) => (
                  <option key={curr.code} value={curr.code} className={isDark ? 'bg-[#260814]' : 'bg-[#FFFFFF]'}>
                    {curr.label}
                  </option>
                ))}
              </select>
              <p className="text-[10px] opacity-60 mt-1">
                Selected: {CURRENCIES[currency]?.symbol} with Indian formatting ({formatCurrency(125000, currency)})
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5 opacity-90">
                Monthly Spending Envelope ({CURRENCIES[currency]?.symbol})
              </label>
              <input 
                type="number"
                value={budgetLimit}
                onChange={(e) => setBudgetLimit(e.target.value)}
                className={`w-full border text-xs rounded-xl px-3.5 py-2.5 focus:outline-hidden ${
                  isDark ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF]' : 'bg-[#F8F7F7] border-[#E8E2E4] text-[#260814]'
                }`}
              />
              <p className="text-[10px] opacity-60 mt-1">
                Used to plot threshold benchmark lines in Expenses Trend
              </p>
            </div>
          </div>
        </div>

        <div className={`pt-5 border-t ${isDark ? 'border-[#360B1C]' : 'border-[#E8E2E4]'}`}>
          <h3 className="font-serif font-bold text-base mb-1 flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span>Notification & Advisory Warnings</span>
          </h3>
          <div className={`mt-3 flex items-center justify-between p-3.5 rounded-xl border ${
            isDark ? 'bg-[#360B1C] border-[#52152C]' : 'bg-[#F8F7F7] border-[#E8E2E4]'
          }`}>
            <div>
              <p className="text-xs font-semibold">Monthly Budget Cap Alerts</p>
              <p className="text-[11px] opacity-75">Trigger visual alerts when monthly expenditure reaches 85% of budget</p>
            </div>
            <input 
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 accent-[#4A1025] rounded cursor-pointer"
            />
          </div>
        </div>

        <div className={`pt-5 border-t flex flex-wrap items-center justify-between gap-3 ${isDark ? 'border-[#360B1C]' : 'border-[#E8E2E4]'}`}>
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/40 text-xs text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
            title="Clear all transactions in this account"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Account Transactions</span>
          </button>

          <button
            type="submit"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all cursor-pointer ${
              isDark ? 'bg-[#FFFFFF] text-[#260814] hover:bg-[#F8F7F7]' : 'bg-[#4A1025] text-[#FFFFFF] hover:bg-[#5E142F]'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
}
