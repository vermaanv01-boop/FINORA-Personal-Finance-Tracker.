import { useState, useEffect, useMemo } from 'react';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../data/sampleData';
import { useAuth } from '../context/AuthContext';

const DEFAULT_SETTINGS = {
  currency: 'INR',
  monthlyBudgetLimit: 100000,
  emailAlerts: true
};

export function useFinanceData() {
  const { currentUser } = useAuth();
  
  // Use a user-scoped storage key so each account has isolated financial data
  const userKey = currentUser?.id || currentUser?.email || 'guest';
  const transactionsKey = `finora_transactions_${userKey}`;
  const settingsKey = `finora_settings_${userKey}`;

  // 1. Transactions state - starts EMPTY for any new user
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(transactionsKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Failed reading transactions from localStorage', e);
    }
    return [];
  });

  // Re-sync transactions if current user changes (e.g. login / switch account)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(transactionsKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setTransactions(parsed);
          return;
        }
      }
      setTransactions([]);
    } catch (e) {
      setTransactions([]);
    }
  }, [transactionsKey]);

  // 2. Settings state (currency, budget, alerts)
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(settingsKey);
      if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    } catch (e) {
      console.warn('Failed reading settings from localStorage', e);
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(settingsKey);
      if (saved) {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(saved) });
      } else {
        setSettings(DEFAULT_SETTINGS);
      }
    } catch (e) {
      setSettings(DEFAULT_SETTINGS);
    }
  }, [settingsKey]);

  // Persist transactions whenever updated
  useEffect(() => {
    try {
      localStorage.setItem(transactionsKey, JSON.stringify(transactions));
    } catch (e) {
      console.warn('Failed to write transactions to localStorage', e);
    }
  }, [transactions, transactionsKey]);

  // Persist settings whenever updated
  useEffect(() => {
    try {
      localStorage.setItem(settingsKey, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to write settings to localStorage', e);
    }
  }, [settings, settingsKey]);

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
    const savingsRate = totalIncome > 0 ? ((netSavings / totalIncome) * 100).toFixed(1) : '0.0';
    const totalTransactionsCount = transactions.length;

    // Build Monthly Trend (Sorted chronologically from actual transactions)
    const sortedMonthKeys = Object.keys(monthlyMap).sort();
    const monthsName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let monthlyExpensesTrend = [];
    let incomeVsExpenses = [];

    if (sortedMonthKeys.length > 0) {
      monthlyExpensesTrend = sortedMonthKeys.map((key) => {
        const [, m] = key.split('-');
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
        const [, m] = key.split('-');
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
        color: CATEGORY_COLORS[catName] || '#4A1025',
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
    const essentialSpending = Math.round(totalExpenses * 0.5);
    const discretionarySpending = Math.round(totalExpenses * 0.3);
    const savingsAndInvestments = Math.max(totalExpenses - (essentialSpending + discretionarySpending), 0);

    return {
      kpis: {
        totalBalance: totalBalance,
        totalIncome,
        totalExpenses,
        netSavings,
        savingsRate: `${savingsRate}%`,
        totalTransactions: totalTransactionsCount
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

  const clearAllTransactions = () => {
    setTransactions([]);
    try {
      localStorage.removeItem(transactionsKey);
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
    clearAllTransactions
  };
}
