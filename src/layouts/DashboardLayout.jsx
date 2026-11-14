import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import TransactionModal from '../components/TransactionModal';
import { useFinanceData } from '../hooks/useFinanceData';
import { useTheme } from '../context/ThemeContext';

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const location = useLocation();
  const { isDark } = useTheme();

  const finance = useFinanceData();

  const tabTitles = {
    '/dashboard': 'Financial Dashboard',
    '/transactions': 'Transaction Ledger',
    '/analytics': 'Performance & Analytics',
    '/settings': 'Account & Preferences'
  };

  const currentTitle = tabTitles[location.pathname] || 'Dashboard';

  const handleOpenAdd = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleEditTransaction = (tx) => {
    setEditingTransaction(tx);
    setIsModalOpen(true);
  };

  const handleSaveTransaction = (txData) => {
    if (txData.id && editingTransaction) {
      finance.updateTransaction(txData);
    } else {
      finance.addTransaction(txData);
    }
  };

  return (
    <div className={`
      min-h-screen flex flex-col lg:flex-row antialiased transition-colors duration-300 selection:bg-[#4A1025] selection:text-[#FFFFFF]
      ${isDark ? 'bg-[#260814] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#260814]'}
    `}>
      {/* Sidebar Navigation */}
      <Sidebar 
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        transactionCount={finance.transactions.length}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header 
          onMenuClick={() => setMobileOpen(true)}
          activeTitle={currentTitle}
          onOpenAddModal={handleOpenAdd}
          currency={finance.currency}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Inject outlet with shared finance tools & modal openers */}
          <Outlet context={{ 
            finance, 
            currency: finance.currency,
            onOpenAddModal: handleOpenAdd,
            onEditTransaction: handleEditTransaction,
            onDeleteTransaction: finance.deleteTransaction
          }} />
        </main>

        {/* Global Dashboard Footer */}
        <footer className={`
          border-t py-4 px-6 sm:px-8 text-xs flex flex-col sm:flex-row items-center justify-between gap-2 transition-colors
          ${isDark 
            ? 'border-[#360B1C] bg-[#260814] text-[#FFFFFF]/60' 
            : 'border-[#E8E2E4] bg-[#FFFFFF] text-[#260814]/70'
          }
        `}>
          <div className="flex items-center gap-2">
            <span className={`font-serif font-bold ${isDark ? 'text-[#FFFFFF]' : 'text-[#4A1025]'}`}>FINORA</span>
            <span>• Personal Wealth Intelligence Platform</span>
          </div>
          <p>© 2026 FINORA. LocalStorage Persistence Active • Default INR (₹)</p>
        </footer>
      </div>

      {/* Transaction Modal (Add / Edit) */}
      <TransactionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaveTransaction={handleSaveTransaction}
        editingTransaction={editingTransaction}
        currency={finance.currency}
      />
    </div>
  );
}
