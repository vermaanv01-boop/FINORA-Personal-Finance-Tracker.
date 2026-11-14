import React from 'react';
import { useOutletContext } from 'react-router-dom';
import AnalyticsView from '../sections/AnalyticsView';

export default function AnalyticsPage() {
  const { finance, currency, onOpenAddModal } = useOutletContext();

  return (
    <AnalyticsView 
      monthlyExpensesTrend={finance.monthlyExpensesTrend}
      incomeVsExpenses={finance.incomeVsExpenses}
      categoryExpenses={finance.categoryExpenses}
      kpis={finance.kpis}
      currency={currency}
      onOpenAddModal={onOpenAddModal}
    />
  );
}
