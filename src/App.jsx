import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import KpiCards from './components/KpiCards';
import ExpensesTrendChart from './sections/ExpensesTrendChart';
import IncomeVsExpensesChart from './sections/IncomeVsExpensesChart';
import CategoryDonutChart from './sections/CategoryDonutChart';
import SpendingBreakdown from './sections/SpendingBreakdown';
import RecentTransactions from './sections/RecentTransactions';
import TopSpendingCategories from './sections/TopSpendingCategories';
import TransactionsView from './sections/TransactionsView';
import AnalyticsView from './sections/AnalyticsView';
import SettingsView from './sections/SettingsView';
import { useFinanceData } from './hooks/useFinanceData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  const {
    kpis,
    monthlyExpensesTrend,
    incomeVsExpenses,
    categoryExpenses,
    topCategories,
    recentTransactions,
    spendingBreakdown,
    resetToDefault
  } = useFinanceData();

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1F2937] flex flex-col lg:flex-row antialiased selection:bg-[#E89BA8]/30 selection:text-[#230811]">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header 
          onMenuClick={() => setMobileOpen(true)}
          activeTab={activeTab}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && (
            <>
              {/* 1. Top KPI Summary Cards */}
              <KpiCards kpis={kpis} />

              {/* 2. Primary Analytics Visualizations: Monthly Expenses Trend & Income vs Expenses */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ExpensesTrendChart data={monthlyExpensesTrend} />
                <IncomeVsExpensesChart data={incomeVsExpenses} />
              </section>

              {/* 3. Mid Section: Donut Category Distribution & Structured Spending Breakdown */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CategoryDonutChart data={categoryExpenses} />
                <SpendingBreakdown stats={spendingBreakdown} />
              </section>

              {/* 4. Bottom Section: Recent Transactions Ledger & Top Spending Categories */}
              <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <RecentTransactions transactions={recentTransactions} />
                </div>
                <div className="lg:col-span-1">
                  <TopSpendingCategories categories={topCategories} />
                </div>
              </section>
            </>
          )}

          {activeTab === 'transactions' && (
            <TransactionsView transactions={recentTransactions} />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView 
              monthlyExpensesTrend={monthlyExpensesTrend}
              incomeVsExpenses={incomeVsExpenses}
              categoryExpenses={categoryExpenses}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView resetToDefault={resetToDefault} />
          )}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-[#EADDCD] py-4 px-6 sm:px-8 text-xs text-[#8C7A80] flex flex-col sm:flex-row items-center justify-between gap-2 bg-[#FDFBF7]">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-[#230811]">FINORA</span>
            <span>• Personal Wealth Intelligence Platform</span>
          </div>
          <p>© 2026 FINORA Inc. Frontend Phase 1 Build • LocalStorage active</p>
        </footer>
      </div>
    </div>
  );
}
