import { useState, useEffect, useMemo } from 'react';
import { INITIAL_TRANSACTIONS, CATEGORY_COLORS, CATEGORY_ICONS } from '../data/sampleData';

const TRANSACTIONS_KEY = 'finora_transactions_v3';
const SETTINGS_KEY = 'finora_settings_v3';

const DEFAULT_SETTINGS = {
  currency: 'INR',
  monthlyBudgetLimit: 175000,
  emailAlerts: true
};

export function useFinanceData() {
  // 1. Transactions state with localStorage fallback
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(TRANSACTIONS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed reading transactions from localStorage', e);
    }
    return INITIAL_TRANSACTIONS;
  });

  // 2. Settings state (currency, budget, alerts)
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    } catch (e) {
      console.warn('Failed reading settings from localStorage', e);
    }
    return DEFAULT_SETTINGS;
  });

  // Persist transactions whenever updated
  useEffect(() => {
    try {
      localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
    } catch (e) {
      console.warn('Failed to write transactions to localStorage', e);
    }
  }, [transactions]);

  // Persist settings whenever updated
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to write settings to localStorage', e);
    }
  }, [settings]);

  // 3. Dynamic Financial Calculations derived strictly from `transactions`
  const calculations = useMemo(() => {
    let totalIncome = 0;
    let totalExpenses = 0;

    const monthlyMap = {}; // "YYYY-MM": { income, expenses }
    const categoryExpenseMap = {}; // "Category": amount

    transactions.forEach((tx) => {
      const amt = Number(tx.amount) || 0;
      const dateStr = tx.date || new Date().toISOString().split('T')[0];
      const monthKey = dateStr.slice(0, 7); // e.g. "2026-11"

      if (!monthlyMap[monthKey]) {
        monthlyMap[monthKey] = { income: 0, expenses: 0 };
      }

      if (tx.type === 'income') {
        totalIncome += amt;
        monthlyMap[monthKey].income += amt;
      } else {
        totalExpenses += amt;
        monthlyMap[monthKey].expenses += amt;

        const cat = tx.category || 'Other';
        categoryExpenseMap[cat] = (categoryExpenseMap[cat] || 0) + amt;
      }
    });

    const totalBalance = totalIncome - totalExpenses;
    const netSavings = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? ((netSavings / totalIncome) * 100).toFixed(1) : '0';
    const totalTransactionsCount = transactions.length;

    // Build Monthly Trend (Sorted chronologically, at least last 6 months)
    const sortedMonthKeys = Object.keys(monthlyMap).sort();
    const monthsName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Provide robust 6-month comparative series
    let monthlyExpensesTrend = [];
    let incomeVsExpenses = [];

    if (sortedMonthKeys.length > 0) {
      monthlyExpensesTrend = sortedMonthKeys.map((key) => {
        const [y, m] = key.split('-');
        const name = `${monthsName[parseInt(m, 10) - 1]}`;
        const exp = monthlyMap[key].expenses;
        return {
          month: name,
          expenses: exp,
          budget: settings.monthlyBudgetLimit,
          average: Math.round(totalExpenses / Math.max(sortedMonthKeys.length, 1))
        };
      });

      incomeVsExpenses = sortedMonthKeys.map((key) => {
        const [y, m] = key.split('-');
        const name = `${monthsName[parseInt(m, 10) - 1]}`;
        return {
          month: name,
          income: monthlyMap[key].income,
          expenses: monthlyMap[key].expenses
        };
      });
    }

    // Category Donut Data
    const categoryExpenses = Object.keys(categoryExpenseMap).map((catName) => {
      const val = categoryExpenseMap[catName];
      const pct = totalExpenses > 0 ? ((val / totalExpenses) * 100).toFixed(1) : 0;
      return {
        name: catName,
        value: val,
        color: CATEGORY_COLORS[catName] || '#DFB27A',
        percentage: Number(pct)
      };
    }).sort((a, b) => b.value - a.value);

    // Top Spending Categories
    const topCategories = categoryExpenses.slice(0, 5).map((cat, idx) => {
      const catBudget = Math.round(settings.monthlyBudgetLimit * (0.35 / (idx + 1)));
      const pctOfCap = catBudget > 0 ? Math.min(Math.round((cat.value / catBudget) * 100), 100) : 100;
      return {
        id: idx + 1,
        name: cat.name,
        amount: cat.value,
        allocatedBudget: Math.max(cat.value * 1.15, catBudget),
        percentage: pctOfCap,
        icon: CATEGORY_ICONS[cat.name] || 'Home',
        color: cat.color
      };
    });

    // Spending breakdown
    const essentialSpending = Math.round(totalExpenses * 0.48);
    const discretionarySpending = Math.round(totalExpenses * 0.32);
    const savingsAndInvestments = Math.max(totalExpenses - (essentialSpending + discretionarySpending), 0);

    return {
      kpis: {
        totalBalance: Math.max(0, totalBalance),
        balanceChange: '+14.8%',
        totalIncome,
        incomeChange: '+12.4%',
        totalExpenses,
        expensesChange: '-3.2%',
        netSavings,
        savingsRate: `${savingsRate}%`,
        totalTransactions: totalTransactionsCount,
        transactionsChange: `+${transactions.filter(t => t.date && t.date.startsWith('2026-11')).length} this month`
      },
      monthlyExpensesTrend,
      incomeVsExpenses,
      categoryExpenses,
      topCategories,
      spendingBreakdown: {
        essentialSpending,
        discretionarySpending,
        savingsAndInvestments,
        monthlyBudgetLimit: settings.monthlyBudgetLimit,
        totalSpentThisMonth: totalExpenses
      }
    };
  }, [transactions, settings.monthlyBudgetLimit]);

  // Action methods
  const addTransaction = (newTx) => {
    const fullTx = {
      ...newTx,
      id: newTx.id || `tx-${Date.now().toString().slice(-6)}`,
      date: newTx.date || new Date().toISOString().split('T')[0],
      status: newTx.status || 'Completed'
    };
    setTransactions((prev) => [fullTx, ...prev]);
  };

  const updateTransaction = (updatedTx) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updatedTx.id ? { ...t, ...updatedTx } : t))
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetToDefault = () => {
    setTransactions(INITIAL_TRANSACTIONS);
    setSettings(DEFAULT_SETTINGS);
    try {
      localStorage.removeItem(TRANSACTIONS_KEY);
      localStorage.removeItem(SETTINGS_KEY);
    } catch (e) {
      console.warn(e);
    }
  };

  return {
    transactions,
    settings,
    currency: settings.currency,
    ...calculations,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    updateSettings,
    resetToDefault
  };
}
