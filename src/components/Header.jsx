import React from 'react';
import { 
  Bell, 
  Search, 
  Calendar, 
  Menu, 
  ChevronDown,
  Download,
  Filter
} from 'lucide-react';

export default function Header({ onMenuClick, activeTab }) {
  const tabTitles = {
    dashboard: 'Financial Dashboard',
    transactions: 'Transaction Ledger',
    analytics: 'Performance & Analytics',
    settings: 'Account & Preferences'
  };

  const currentDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className="sticky top-0 z-30 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#EADDCD] px-4 sm:px-6 lg:px-8 py-4 transition-colors">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left Section: Mobile Menu & Page Title */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl bg-white border border-[#E8DCCF] text-[#2D0B16] hover:bg-[#F7F3EB] transition-colors shadow-xs"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#230811] tracking-tight">
              {tabTitles[activeTab] || 'Dashboard'}
            </h2>
            <div className="flex items-center gap-2 text-xs text-[#6B5A5F] mt-0.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#A05C6E]" />
              <span>{currentDate}</span>
              <span className="hidden sm:inline-block text-[#C2B5A5]">•</span>
              <span className="hidden sm:inline-block text-[#82324C] font-semibold">USD Currency Base</span>
            </div>
          </div>
        </div>

        {/* Center / Search bar on medium & desktop */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A888D]" />
            <input 
              type="text" 
              placeholder="Search transactions, accounts, categories..."
              className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-[#E6D9CB] text-sm text-[#230811] placeholder:text-[#9A888D] focus:outline-hidden focus:ring-2 focus:ring-[#8A2D43]/20 focus:border-[#8A2D43] transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Right Section: Action tools & Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick statement download button */}
          <button 
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-white border border-[#E6D9CB] text-[#2D0B16] hover:bg-[#F7F3EB] transition-all shadow-xs"
            title="Export Monthly Statement"
          >
            <Download className="w-3.5 h-3.5 text-[#8A2D43]" />
            <span>Export</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button 
              className="p-2 sm:p-2.5 rounded-xl bg-white border border-[#E6D9CB] text-[#2D0B16] hover:bg-[#F7F3EB] transition-all shadow-xs relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E89BA8] ring-2 ring-white"></span>
            </button>
          </div>

          {/* User Profile Capsule */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#E6D9CB]">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2D0B16] to-[#5C1D2E] p-0.5 text-white shadow-xs flex items-center justify-center font-serif text-sm font-bold">
              <span>EL</span>
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-bold text-[#230811] leading-tight">Eleanor Laurence</p>
              <p className="text-[10px] text-[#8A2D43] font-medium tracking-wide">Family Office</p>
            </div>
            <ChevronDown className="w-4 h-4 text-[#8C7A80] hidden sm:block" />
          </div>

        </div>

      </div>
    </header>
  );
}
