import React from 'react';
import { useOutletContext } from 'react-router-dom';
import KpiCards from '../components/KpiCards';
import ExpensesTrendChart from '../sections/ExpensesTrendChart';
import IncomeVsExpensesChart from '../sections/IncomeVsExpensesChart';
import CategoryDonutChart from '../sections/CategoryDonutChart';
import SpendingBreakdown from '../sections/SpendingBreakdown';
import RecentTransactions from '../sections/RecentTransactions';
import TopSpendingCategories from '../sections/TopSpendingCategories';

export default function DashboardPage() {
  const { 
    finance, 
    currency, 
    onEditTransaction, 
    onDeleteTransaction 
  } = useOutletContext();

  const {
    kpis,
    monthlyExpensesTrend,
    incomeVsExpenses,
    categoryExpenses,
    topCategories,
    recentTransactions,
    spendingBreakdown
  } = finance;

  return (
    <>
      {/* 1. Top KPI Summary Cards */}
      <KpiCards kpis={kpis} currency={currency} />

      {/* 2. Primary Analytics Visualizations: Monthly Expenses Trend & Income vs Expenses */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpensesTrendChart data={monthlyExpensesTrend} currency={currency} />
        <IncomeVsExpensesChart data={incomeVsExpenses} currency={currency} />
      </section>

      {/* 3. Mid Section: Donut Category Distribution & Structured Spending Breakdown */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryDonutChart data={categoryExpenses} currency={currency} />
        <SpendingBreakdown stats={spendingBreakdown} currency={currency} />
      </section>

      {/* 4. Bottom Section: Recent Transactions Ledger & Top Spending Categories */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentTransactions 
            transactions={finance.transactions} 
            currency={currency}
            onEditTransaction={onEditTransaction}
            onDeleteTransaction={onDeleteTransaction}
          />
        </div>
        <div className="lg:col-span-1">
          <TopSpendingCategories categories={topCategories} currency={currency} />
        </div>
      </section>
    </>
  );
}
