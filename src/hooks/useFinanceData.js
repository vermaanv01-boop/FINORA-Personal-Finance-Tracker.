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

const STORAGE_KEY = 'finora_dashboard_data_v1';

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
    resetToDefault,
  };
}

