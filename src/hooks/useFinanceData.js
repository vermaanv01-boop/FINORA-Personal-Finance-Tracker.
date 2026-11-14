import { useState, useEffect } from 'react';
import {
  KPI_DATA,
  MONTHLY_EXPENSES_TREND,
  INCOME_VS_EXPENSES,
  CATEGORY_EXPENSES,
  TOP_SPENDING_CATEGORIES,
  RECENT_TRANSACTIONS,
  SPENDING_BREAKDOWN_STATS
} from '../data/sampleData';

const STORAGE_KEY = 'finora_dashboard_data_v2';

export function useFinanceData() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
    return {
      kpis: KPI_DATA,
      monthlyExpensesTrend: MONTHLY_EXPENSES_TREND,
      incomeVsExpenses: INCOME_VS_EXPENSES,
      categoryExpenses: CATEGORY_EXPENSES,
      topCategories: TOP_SPENDING_CATEGORIES,
      recentTransactions: RECENT_TRANSACTIONS,
      spendingBreakdown: SPENDING_BREAKDOWN_STATS,
    };
  });

  // Save changes to localStorage for future persistence
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Could not write to localStorage', e);
    }
  }, [data]);

  // Recalculate KPIs and analytics whenever transactions change
  const addTransaction = (newTx) => {
    setData((prev) => {
      const isIncome = newTx.type === 'income';
      const amount = Number(newTx.amount);

      // Update KPIs
      const newTotalIncome = isIncome ? prev.kpis.totalIncome + amount : prev.kpis.totalIncome;
      const newTotalExpenses = !isIncome ? prev.kpis.totalExpenses + amount : prev.kpis.totalExpenses;
      const newBalance = isIncome ? prev.kpis.totalBalance + amount : prev.kpis.totalBalance - amount;
      const newNetSavings = newTotalIncome - newTotalExpenses;
      const newSavingsRate = newTotalIncome > 0 ? `${((newNetSavings / newTotalIncome) * 100).toFixed(1)}%` : '0%';

      const updatedKpis = {
        ...prev.kpis,
        totalBalance: Math.max(0, newBalance),
        totalIncome: newTotalIncome,
        totalExpenses: newTotalExpenses,
        netSavings: newNetSavings,
        savingsRate: newSavingsRate,
        totalTransactions: prev.kpis.totalTransactions + 1,
      };

      // Update Recent Transactions list (at top)
      const updatedTransactions = [newTx, ...prev.recentTransactions];

      // Update Category Expenses if expense
      let updatedCategoryExpenses = [...prev.categoryExpenses];
      if (!isIncome) {
        const catIdx = updatedCategoryExpenses.findIndex(c => c.name.toLowerCase().includes(newTx.category.toLowerCase().split(' ')[0]));
        if (catIdx >= 0) {
          const updatedVal = updatedCategoryExpenses[catIdx].value + amount;
          updatedCategoryExpenses[catIdx] = {
            ...updatedCategoryExpenses[catIdx],
            value: updatedVal
          };
        } else {
          updatedCategoryExpenses.push({
            name: newTx.category,
            value: amount,
            color: '#B35467',
            percentage: 5.0
          });
        }
      }

      // Update Monthly Expenses Trend (last month - Nov)
      let updatedMonthlyTrend = [...prev.monthlyExpensesTrend];
      if (!isIncome) {
        const lastIdx = updatedMonthlyTrend.length - 1;
        updatedMonthlyTrend[lastIdx] = {
          ...updatedMonthlyTrend[lastIdx],
          expenses: updatedMonthlyTrend[lastIdx].expenses + amount
        };
      }

      // Update Income vs Expenses (Nov)
      let updatedIncomeVsExpenses = [...prev.incomeVsExpenses];
      const lastIncomeIdx = updatedIncomeVsExpenses.length - 1;
      if (isIncome) {
        updatedIncomeVsExpenses[lastIncomeIdx] = {
          ...updatedIncomeVsExpenses[lastIncomeIdx],
          income: updatedIncomeVsExpenses[lastIncomeIdx].income + amount
        };
      } else {
        updatedIncomeVsExpenses[lastIncomeIdx] = {
          ...updatedIncomeVsExpenses[lastIncomeIdx],
          expenses: updatedIncomeVsExpenses[lastIncomeIdx].expenses + amount
        };
      }

      // Update Spending Breakdown stats
      const updatedBreakdown = {
        ...prev.spendingBreakdown,
        totalSpentThisMonth: !isIncome 
          ? prev.spendingBreakdown.totalSpentThisMonth + amount 
          : prev.spendingBreakdown.totalSpentThisMonth,
        discretionarySpending: !isIncome 
          ? prev.spendingBreakdown.discretionarySpending + amount 
          : prev.spendingBreakdown.discretionarySpending
      };

      return {
        ...prev,
        kpis: updatedKpis,
        recentTransactions: updatedTransactions,
        categoryExpenses: updatedCategoryExpenses,
        monthlyExpensesTrend: updatedMonthlyTrend,
        incomeVsExpenses: updatedIncomeVsExpenses,
        spendingBreakdown: updatedBreakdown
      };
    });
  };

  const deleteTransaction = (id) => {
    setData((prev) => {
      const tx = prev.recentTransactions.find(t => t.id === id);
      if (!tx) return prev;

      const isIncome = tx.type === 'income';
      const amount = Number(tx.amount);

      const newTotalIncome = isIncome ? prev.kpis.totalIncome - amount : prev.kpis.totalIncome;
      const newTotalExpenses = !isIncome ? prev.kpis.totalExpenses - amount : prev.kpis.totalExpenses;
      const newBalance = isIncome ? prev.kpis.totalBalance - amount : prev.kpis.totalBalance + amount;
      const newNetSavings = newTotalIncome - newTotalExpenses;
      const newSavingsRate = newTotalIncome > 0 ? `${((newNetSavings / newTotalIncome) * 100).toFixed(1)}%` : '0%';

      return {
        ...prev,
        kpis: {
          ...prev.kpis,
          totalBalance: newBalance,
          totalIncome: newTotalIncome,
          totalExpenses: newTotalExpenses,
          netSavings: newNetSavings,
          savingsRate: newSavingsRate,
          totalTransactions: Math.max(0, prev.kpis.totalTransactions - 1)
        },
        recentTransactions: prev.recentTransactions.filter(t => t.id !== id)
      };
    });
  };

  const resetToDefault = () => {
    setData({
      kpis: KPI_DATA,
      monthlyExpensesTrend: MONTHLY_EXPENSES_TREND,
      incomeVsExpenses: INCOME_VS_EXPENSES,
      categoryExpenses: CATEGORY_EXPENSES,
      topCategories: TOP_SPENDING_CATEGORIES,
      recentTransactions: RECENT_TRANSACTIONS,
      spendingBreakdown: SPENDING_BREAKDOWN_STATS,
    });
  };

  return {
    ...data,
    addTransaction,
    deleteTransaction,
    resetToDefault,
  };
}
