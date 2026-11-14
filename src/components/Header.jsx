import React from 'react';
import { 
  Bell, 
  Search, 
  Calendar, 
  Menu, 
  ChevronDown,
  Download,
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
        ? 'bg-[#14040A]/90 backdrop-blur-md border-[#38111E] text-[#FDFBF7]' 
        : 'bg-[#FDFBF7]/90 backdrop-blur-md border-[#EADDCD] text-[#230811]'
      }
    `}>
      <div className="flex items-center justify-between gap-3">
        
        {/* Left Section: Mobile Menu & Page Title */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onMenuClick}
            className={`lg:hidden p-2 rounded-xl border transition-colors shadow-xs ${
              isDark 
                ? 'bg-[#1C060D] border-[#3E1421] text-[#FDFBF7] hover:bg-[#2D0B16]' 
                : 'bg-white border-[#E8DCCF] text-[#2D0B16] hover:bg-[#F7F3EB]'
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
              <Calendar className="w-3.5 h-3.5 text-[#E89BA8]" />
              <span>{currentDate}</span>
              <span className="hidden sm:inline-block text-[#C2B5A5]">•</span>
              <span className="hidden sm:inline-block font-semibold text-[#DFB27A]">
                {currentCurrLabel} ({CURRENCIES[currency]?.symbol || '₹'}) Currency Base
              </span>
            </div>
          </div>
        </div>

        {/* Center / Search bar on medium & desktop */}
        <div className="hidden md:flex items-center flex-1 max-w-sm mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A888D]" />
            <input 
              type="text" 
              placeholder="Quick search transactions, categories..."
              className={`w-full pl-10 pr-4 py-2 rounded-xl border text-xs focus:outline-hidden transition-all shadow-xs ${
                isDark 
                  ? 'bg-[#1C060D] border-[#3E1421] text-[#FDFBF7] placeholder:text-[#8C6E76] focus:border-[#E89BA8]' 
                  : 'bg-white border-[#E6D9CB] text-[#230811] placeholder:text-[#9A888D] focus:border-[#8A2D43]'
              }`}
            />
          </div>
        </div>

        {/* Right Section: Action tools & Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Add Transaction Button */}
          <button 
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-[#DFB27A] to-[#E89BA8] text-[#230811] hover:opacity-95 transition-all shadow-md active:scale-95"
            title="Record New Transaction"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Entry</span>
          </button>

          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* User Profile Capsule */}
          <div className={`flex items-center gap-2 pl-2 border-l ${isDark ? 'border-[#38111E]' : 'border-[#E6D9CB]'}`}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2D0B16] to-[#5C1D2E] p-0.5 text-white shadow-xs flex items-center justify-center font-serif text-sm font-bold">
              <span>{currentUser?.name?.slice(0, 2).toUpperCase() || 'EL'}</span>
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-bold leading-tight truncate max-w-[110px]">
                {currentUser?.name || 'Eleanor Laurence'}
              </p>
              <p className="text-[10px] text-[#DFB27A] font-medium tracking-wide">Family Office</p>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}
