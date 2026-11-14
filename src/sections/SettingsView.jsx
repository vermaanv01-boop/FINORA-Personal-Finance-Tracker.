import React, { useState } from 'react';
import { 
  RotateCcw, 
  Save, 
  Check,
  DollarSign,
  Bell,
  Sliders,
  Sparkles
} from 'lucide-react';
import { CURRENCIES, formatCurrency } from '../utils/currency';

export default function SettingsView({ 
  settings, 
  updateSettings, 
  resetToDefault 
}) {
  const [currency, setCurrency] = useState(settings?.currency || 'INR');
  const [budgetLimit, setBudgetLimit] = useState(settings?.monthlyBudgetLimit || 175000);
  const [emailAlerts, setEmailAlerts] = useState(settings?.emailAlerts ?? true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateSettings({
      currency,
      monthlyBudgetLimit: Number(budgetLimit) || 175000,
      emailAlerts
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#2D0B16] via-[#230811] to-[#18040C] border border-[#481827] rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-2 text-xs text-[#DFB27A] font-semibold uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Configuration Hub</span>
        </div>
        <h2 className="font-serif text-2xl font-bold">Preferences & Currency Setup</h2>
        <p className="text-xs text-[#E89BA8]/80 mt-1">
          Configure default reporting currency (INR ₹ by default), monthly budget caps, notifications, and reset demo data.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-[#1A3824] border border-[#2B5E3C] text-[#34D399] text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Preferences saved successfully to LocalStorage. Live calculations updated!</span>
        </div>
      )}

      {/* General Settings */}
      <form onSubmit={handleSave} className="bg-[#230811] border border-[#3E1421] rounded-2xl p-6 shadow-xl space-y-6">
        <div>
          <h3 className="font-serif font-bold text-base text-[#FDFBF7] mb-1 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#DFB27A]" />
            <span>Currency & Budget Thresholds</span>
          </h3>
          <p className="text-xs text-[#A89299] mb-4">
            FINORA dynamically re-formats all cards, charts, and transaction ledgers according to your selected currency.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#E89BA8] mb-1.5">
                Default Currency *
              </label>
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-[#1C060D] border border-[#3D1421] text-xs text-[#FDFBF7] rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-[#E89BA8]"
              >
                {Object.values(CURRENCIES).map((curr) => (
                  <option key={curr.code} value={curr.code} className="bg-[#230811]">
                    {curr.label}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-[#A89299] mt-1">
                Selected: {CURRENCIES[currency]?.symbol} with Indian formatting ({formatCurrency(125000, currency)})
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#E89BA8] mb-1.5">
                Monthly Spending Envelope ({CURRENCIES[currency]?.symbol})
              </label>
              <input 
                type="number"
                value={budgetLimit}
                onChange={(e) => setBudgetLimit(e.target.value)}
                className="w-full bg-[#1C060D] border border-[#3D1421] text-xs text-[#FDFBF7] rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-[#E89BA8]"
              />
              <p className="text-[10px] text-[#A89299] mt-1">
                Used to plot threshold benchmark lines in Expenses Trend
              </p>
            </div>
          </div>
        </div>

        <div className="pt-5 border-t border-[#3D1421]">
          <h3 className="font-serif font-bold text-base text-[#FDFBF7] mb-1 flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#DFB27A]" />
            <span>Notification & Advisory Warnings</span>
          </h3>
          <div className="mt-3 flex items-center justify-between p-3.5 rounded-xl bg-[#1C060D] border border-[#35101E]">
            <div>
              <p className="text-xs font-semibold text-[#FDFBF7]">Monthly Budget Cap Alerts</p>
              <p className="text-[11px] text-[#A89299]">Trigger visual alerts when monthly expenditure reaches 85% of budget</p>
            </div>
            <input 
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 accent-[#DFB27A] rounded cursor-pointer"
            />
          </div>
        </div>

        <div className="pt-5 border-t border-[#3D1421] flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={resetToDefault}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1C060D] border border-[#3D1421] text-xs text-[#E89BA8] hover:bg-[#2D0B16] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restore Default INR Dataset</span>
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DFB27A] to-[#E89BA8] text-[#230811] font-bold text-xs shadow-lg hover:opacity-95 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
}
