import React from 'react';
import { 
  Bell, 
  Search, 
  Calendar, 
  Menu, 
  Plus
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { CURRENCIES } from '../utils/currency';

export default function Header({ 
  onMenuClick, 
  activeTitle = 'Financial Dashboard', 
  onOpenAddModal,
  currency = 'INR'
}) {
  const { currentUser } = useAuth();
  const { isDark } = useTheme();

  const currentDate = new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  const currentCurrLabel = CURRENCIES[currency]?.code || 'INR';

  return (
    <header className={`
      sticky top-0 z-30 px-4 sm:px-6 lg:px-8 py-3.5 transition-colors border-b
      ${isDark 
        ? 'bg-[#260814]/90 backdrop-blur-md border-[#360B1C] text-[#FFFFFF]' 
        : 'bg-[#FFFFFF]/90 backdrop-blur-md border-[#E8E2E4] text-[#260814]'
      }
    `}>
      <div className="flex items-center justify-between gap-3">
        
        {/* Left Section: Mobile Menu & Page Title */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onMenuClick}
            className={`lg:hidden p-2 rounded-xl border transition-colors shadow-xs ${
              isDark 
                ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF] hover:bg-[#4A1025]' 
                : 'bg-[#FFFFFF] border-[#E8E2E4] text-[#260814] hover:bg-[#F8F7F7]'
            }`}
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight">
              {activeTitle}
            </h2>
            <div className="flex items-center gap-2 text-xs opacity-75 mt-0.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#4A1025] dark:text-[#FFFFFF]" />
              <span>{currentDate}</span>
              <span className="hidden sm:inline-block">•</span>
              <span className="hidden sm:inline-block font-semibold">
                {currentCurrLabel} ({CURRENCIES[currency]?.symbol || '₹'}) Base
              </span>
            </div>
          </div>
        </div>

        {/* Center / Search bar */}
        <div className="hidden md:flex items-center flex-1 max-w-sm mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search ledger entries, payees..."
              className={`w-full pl-10 pr-4 py-2 rounded-xl border text-xs focus:outline-hidden transition-all shadow-xs ${
                isDark 
                  ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF] placeholder:text-[#FFFFFF]/40 focus:border-[#FFFFFF]' 
                  : 'bg-[#FFFFFF] border-[#E8E2E4] text-[#260814] placeholder:text-gray-400 focus:border-[#4A1025]'
              }`}
            />
          </div>
        </div>

        {/* Right Section: Action tools & Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Add Transaction Button */}
          <button 
            onClick={onOpenAddModal}
            className={`
              flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-md active:scale-95 cursor-pointer
              ${isDark 
                ? 'bg-[#FFFFFF] text-[#260814] hover:bg-[#F8F7F7]' 
                : 'bg-[#4A1025] text-[#FFFFFF] hover:bg-[#5E142F]'
              }
            `}
            title="Record New Transaction"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Entry</span>
          </button>

          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* User Profile Capsule */}
          <div className={`flex items-center gap-2 pl-2 border-l ${isDark ? 'border-[#360B1C]' : 'border-[#E8E2E4]'}`}>
            <div className={`
              w-9 h-9 rounded-xl p-0.5 shadow-xs flex items-center justify-center font-serif text-sm font-bold
              ${isDark ? 'bg-[#FFFFFF] text-[#260814]' : 'bg-[#4A1025] text-[#FFFFFF]'}
            `}>
              <span>{currentUser?.name?.slice(0, 2).toUpperCase() || 'EL'}</span>
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-bold leading-tight truncate max-w-[110px]">
                {currentUser?.name || 'Eleanor Laurence'}
              </p>
              <p className="text-[10px] opacity-75 font-medium tracking-wide">Executive Account</p>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}
