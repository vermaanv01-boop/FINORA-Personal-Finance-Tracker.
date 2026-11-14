import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`
        relative inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold
        transition-all duration-300 active:scale-95 shadow-sm cursor-pointer select-none
        ${isDark 
          ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF] hover:bg-[#4A1025]' 
          : 'bg-[#FFFFFF] border-[#E8E2E4] text-[#4A1025] hover:bg-[#F8F7F7]'
        }
        ${className}
      `}
      title={`Toggle theme (currently ${theme})`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <Sun 
          className={`w-4 h-4 text-[#4A1025] absolute transition-all duration-300 transform ${
            isDark ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
          }`} 
        />
        <Moon 
          className={`w-4 h-4 text-[#FFFFFF] absolute transition-all duration-300 transform ${
            isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'
          }`} 
        />
      </div>
      <span className="hidden md:inline text-[11px] font-medium tracking-wide">
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  );
}
