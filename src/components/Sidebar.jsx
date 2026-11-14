import React from 'react';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  PieChart, 
  Settings, 
  Wallet,
  Sparkles,
  TrendingUp,
  X
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, mobileOpen, setMobileOpen }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight, badge: '142' },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-[#15040a]/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#230811] text-[#FDFBF7] flex flex-col justify-between 
        border-r border-[#3d1420]/80 transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top Branding */}
        <div>
          <div className="flex items-center justify-between px-6 pt-7 pb-6 border-b border-[#3d1420]/70">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DFB27A] to-[#E89BA8] p-0.5 flex items-center justify-center shadow-lg shadow-[#DFB27A]/10">
                <div className="w-full h-full bg-[#230811] rounded-[10px] flex items-center justify-center">
                  <span className="font-serif font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-tr from-[#DFB27A] to-[#F7D6DC]">
                    F
                  </span>
                </div>
              </div>
              <div>
                <h1 className="font-serif font-bold text-xl tracking-wider text-[#FDFBF7]">FINORA</h1>
                <p className="text-[10px] uppercase tracking-widest text-[#E89BA8]/70 font-medium">Wealth & Finance</p>
              </div>
            </div>

            {/* Mobile close button */}
            <button 
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-[#E89BA8]/70 hover:text-white hover:bg-[#3D1220] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 mt-2">
            <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-[#E89BA8]/50 uppercase">
              Main Menu
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                    ${isActive 
                      ? 'bg-gradient-to-r from-[#3D1220] to-[#4F192B] text-white shadow-md shadow-[#15040a]/40 border-l-4 border-[#E89BA8]' 
                      : 'text-[#E89BA8]/80 hover:bg-[#2D0B16] hover:text-[#FDFBF7]'
                    }
                  `}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-[#E89BA8]' : 'text-[#E89BA8]/70'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#3D1220] text-[#DFB27A] border border-[#DFB27A]/20">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Premium Card / Portfolio summary */}
        <div className="p-4 m-4 rounded-2xl bg-gradient-to-b from-[#2e0c18] to-[#1a050c] border border-[#4a1827]/70 shadow-lg relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-[#E89BA8]/5 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-medium text-[#DFB27A]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Finora Premier</span>
            </div>
            <span className="text-[10px] bg-[#DFB27A]/20 text-[#DFB27A] px-2 py-0.5 rounded-full border border-[#DFB27A]/30">Tier I</span>
          </div>

          <p className="text-xs text-[#FDFBF7]/80 leading-relaxed mb-3">
            All premium analytics & financial metrics active.
          </p>

          <div className="pt-2 border-t border-[#4a1827]/60 flex items-center justify-between text-xs text-[#E89BA8]/70">
            <span>Portfolio Status</span>
            <span className="text-[#34D399] font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Healthy
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}

