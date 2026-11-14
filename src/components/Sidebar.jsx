import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  PieChart, 
  Settings, 
  Sparkles,
  TrendingUp,
  X,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Sidebar({ mobileOpen, setMobileOpen, transactionCount = 0 }) {
  const { currentUser, logout } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight, badge: transactionCount.toString() },
    { to: '/analytics', label: 'Analytics', icon: PieChart },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-[#260814]/80 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-72 flex flex-col justify-between 
        transition-transform duration-300 ease-in-out border-r
        lg:static lg:translate-x-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isDark 
          ? 'bg-[#260814] text-[#FFFFFF] border-[#360B1C]' 
          : 'bg-[#4A1025] text-[#FFFFFF] border-[#5E142F]'
        }
      `}>
        {/* Top Branding */}
        <div>
          <div className="flex items-center justify-between px-6 pt-7 pb-6 border-b border-[#FFFFFF]/10">
            <NavLink to="/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] p-0.5 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#4A1025] rounded-[10px] flex items-center justify-center">
                  <span className="font-serif font-extrabold text-xl tracking-wider text-[#FFFFFF]">
                    F
                  </span>
                </div>
              </div>
              <div>
                <h1 className="font-serif font-bold text-xl tracking-wider text-[#FFFFFF]">FINORA</h1>
                <p className="text-[10px] uppercase tracking-widest text-[#FFFFFF]/70 font-medium">Wealth & Finance</p>
              </div>
            </NavLink>

            {/* Mobile close button */}
            <button 
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-[#FFFFFF]/70 hover:text-white hover:bg-[#FFFFFF]/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 mt-2">
            <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-[#FFFFFF]/50 uppercase">
              Main Menu
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) => `
                    w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                    ${isActive 
                      ? 'bg-[#FFFFFF] text-[#260814] shadow-md border-l-4 border-[#260814] font-semibold' 
                      : 'text-[#FFFFFF]/80 hover:bg-[#FFFFFF]/10 hover:text-[#FFFFFF]'
                    }
                  `}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#FFFFFF]/20 text-[#FFFFFF] border border-[#FFFFFF]/20">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Capsule & Logout */}
        <div className="p-4 m-4 rounded-2xl bg-[#FFFFFF]/5 border border-[#FFFFFF]/10 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-medium text-[#FFFFFF]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Finora Premier</span>
            </div>
            <span className="text-[10px] bg-[#FFFFFF] text-[#260814] px-2 py-0.5 rounded-full font-bold">Tier I</span>
          </div>

          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#FFFFFF] text-[#4A1025] flex items-center justify-center font-bold text-xs">
              {currentUser?.name?.slice(0, 2).toUpperCase() || 'FN'}
            </div>
            <div className="truncate text-left">
              <p className="text-xs font-bold text-[#FFFFFF] truncate">{currentUser?.name || 'Authorized Member'}</p>
              <p className="text-[10px] text-[#FFFFFF]/70 truncate">{currentUser?.email || 'Simulated Auth'}</p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#FFFFFF]/10 flex items-center justify-between text-xs">
            <span className="text-[#FFFFFF]/90 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-[#FFFFFF]" /> Active
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-[11px] text-[#FFFFFF] hover:bg-[#FFFFFF]/10 px-2 py-1 rounded-lg transition-colors cursor-pointer"
              title="Sign Out of Session"
            >
              <LogOut className="w-3 h-3" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
