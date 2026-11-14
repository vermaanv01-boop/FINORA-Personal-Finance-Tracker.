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
        relative inline-flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border text-xs font-semibold
        transition-all duration-300 active:scale-95 shadow-xs
        ${isDark 
          ? 'bg-[#1C060D] border-[#4A1827] text-[#DFB27A] hover:bg-[#2E0D18]' 
          : 'bg-white border-[#E6D9CB] text-[#2D0B16] hover:bg-[#F7F3EB]'
        }
        ${className}
      `}
      title={`Toggle theme (currently ${theme})`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <Sun 
          className={`w-4 h-4 text-amber-500 absolute transition-all duration-300 transform ${
            isDark ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
          }`} 
        />
        <Moon 
          className={`w-4 h-4 text-[#DFB27A] absolute transition-all duration-300 transform ${
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
