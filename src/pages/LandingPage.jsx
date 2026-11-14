import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  PieChart, 
  ShieldCheck, 
  Wallet, 
  Zap, 
  ReceiptText, 
  CheckCircle2, 
  BarChart3,
  IndianRupee,
  ChevronRight
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: ReceiptText,
      title: 'Expense & Cash Flow Tracking',
      desc: 'Seamlessly categorize and monitor real-time debits and credits across multiple credit cards, wealth accounts, and emergency funds.'
    },
    {
      icon: BarChart3,
      title: 'Deep Financial Intelligence',
      desc: 'Comprehensive monthly outflow trends, income vs. expenses variances, and multi-quarter liquidity velocity curves.'
    },
    {
      icon: PieChart,
      title: 'Category & Budget Allocation',
      desc: 'Donut allocations and progress indicators ensure you maintain target caps across lifestyle and fixed costs without stress.'
    },
    {
      icon: IndianRupee,
      title: 'Native INR (₹) Financial Modeling',
      desc: 'Built specifically for Indian financial notation with Lakhs and Crores support, tailored for modern high-net-worth portfolios.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#0F0307] text-[#1F2937] dark:text-[#FDFBF7] transition-colors selection:bg-[#E89BA8]/30">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/90 dark:bg-[#0F0307]/90 backdrop-blur-md border-b border-[#EADDCD] dark:border-[#38111E] px-4 sm:px-8 py-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DFB27A] to-[#E89BA8] p-0.5 flex items-center justify-center shadow-lg shadow-[#DFB27A]/10 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#230811] rounded-[10px] flex items-center justify-center">
                <span className="font-serif font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-tr from-[#DFB27A] to-[#F7D6DC]">
                  F
                </span>
              </div>
            </div>
            <div>
              <span className="font-serif font-bold text-xl tracking-wider text-[#230811] dark:text-[#FDFBF7]">
                FINORA
              </span>
              <p className="text-[9px] uppercase tracking-widest text-[#8A2D43] dark:text-[#E89BA8] font-semibold">
                Wealth & Finance
              </p>
            </div>
          </NavLink>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <NavLink
                to="/dashboard"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#DFB27A] to-[#E89BA8] text-[#230811] font-bold text-xs shadow-md hover:opacity-95 transition-all"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </NavLink>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#2D0B16] dark:text-[#FDFBF7] hover:bg-[#EADDCD]/50 dark:hover:bg-[#230811] transition-colors"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/signup"
                  className="hidden sm:flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-[#DFB27A] to-[#E89BA8] text-[#230811] font-bold text-xs shadow-md hover:opacity-95 transition-all"
                >
                  <span>Get Started</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </NavLink>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 px-4 sm:px-8">
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E89BA8]/15 dark:bg-[#E89BA8]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-[#DFB27A]/15 dark:bg-[#DFB27A]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#230811] text-[#DFB27A] border border-[#481827] text-xs font-semibold mb-6 shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Personal Finance Intelligence</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#230811] dark:text-[#FDFBF7] leading-tight sm:leading-[1.1] mb-6">
            Take Control of Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A2D43] via-[#B35467] to-[#DFB27A] dark:from-[#E89BA8] dark:via-[#DFB27A] dark:to-[#F7D6DC]">
              Money & Wealth.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#554248] dark:text-[#E89BA8]/80 leading-relaxed mb-8">
            FINORA brings boardroom-grade financial discipline to your personal economy. 
            Real-time tracking, intuitive Indian Rupee (₹) analytics, and intelligent spending benchmarks in an elegant burgundy design.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <NavLink
              to="/signup"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#2D0B16] via-[#4F192B] to-[#2D0B16] text-[#FDFBF7] dark:from-[#DFB27A] dark:via-[#E89BA8] dark:to-[#DFB27A] dark:text-[#230811] font-bold text-sm shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>

            <NavLink
              to="/login"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white dark:bg-[#1C060D] border border-[#E6D9CB] dark:border-[#3D1421] text-[#2D0B16] dark:text-[#FDFBF7] font-semibold text-sm hover:bg-[#F7F3EB] dark:hover:bg-[#2A0A15] transition-all flex items-center justify-center shadow-xs"
            >
              <span>Explore Demo Sign In</span>
            </NavLink>
          </div>

          {/* Quick metric chips */}
          <div className="mt-12 pt-8 border-t border-[#E6D9CB] dark:border-[#38111E] flex flex-wrap justify-center gap-6 sm:gap-12 text-xs text-[#7A666C] dark:text-[#A89299]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#DFB27A]" />
              <span>Full LocalStorage Reliability</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#DFB27A]" />
              <span>Zero External Dependencies / No Backend</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#DFB27A]" />
              <span>₹ Indian Lakh/Crore Formatting</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pb-20">
        <div className="rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-[#2D0B16] via-[#1F070F] to-[#120308] border border-[#481827] shadow-2xl relative">
          <div className="flex items-center justify-between pb-3 px-2 border-b border-[#3D1421] text-xs text-[#E89BA8]/70">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 font-mono text-[11px] text-[#A89299]">finora.dashboard.live</span>
            </div>
            <span className="text-[10px] bg-[#3D1220] text-[#DFB27A] px-2 py-0.5 rounded-full border border-[#DFB27A]/30 font-semibold">
              INR ₹ Live Mode
            </span>
          </div>

          {/* Mini Mock Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-4 text-left">
            <div className="p-4 rounded-xl bg-[#230811] border border-[#3E1421]">
              <span className="text-[10px] text-[#E89BA8]/70 uppercase font-semibold">Total Balance</span>
              <p className="font-serif text-xl font-bold text-[#FDFBF7] mt-1">₹1,95,000.00</p>
              <span className="text-[10px] text-[#34D399]">+14.8% net liquid</span>
            </div>
            <div className="p-4 rounded-xl bg-[#230811] border border-[#3E1421]">
              <span className="text-[10px] text-[#E89BA8]/70 uppercase font-semibold">Total Inflow</span>
              <p className="font-serif text-xl font-bold text-[#DFB27A] mt-1">₹3,35,300.00</p>
              <span className="text-[10px] text-[#DFB27A]">Consulting & Dividends</span>
            </div>
            <div className="p-4 rounded-xl bg-[#230811] border border-[#3E1421]">
              <span className="text-[10px] text-[#E89BA8]/70 uppercase font-semibold">Total Outflow</span>
              <p className="font-serif text-xl font-bold text-[#E89BA8] mt-1">₹1,40,300.00</p>
              <span className="text-[10px] text-[#E89BA8]/80">Rent, Dining & Travel</span>
            </div>
            <div className="p-4 rounded-xl bg-[#230811] border border-[#3E1421]">
              <span className="text-[10px] text-[#E89BA8]/70 uppercase font-semibold">Net Savings Rate</span>
              <p className="font-serif text-xl font-bold text-[#34D399] mt-1">58.2%</p>
              <span className="text-[10px] text-[#34D399]">Tier I Discipline</span>
            </div>
          </div>

          <div className="mt-4 p-6 rounded-2xl bg-[#1C060D] border border-[#38111E] text-center">
            <p className="text-sm font-serif font-bold text-[#FDFBF7]">Interactive Analytics & Unified Ledger</p>
            <p className="text-xs text-[#A89299] mt-1 max-w-lg mx-auto">
              Add income or expenses, filter by category, edit postings, and see Recharts graphs recalculate dynamically in real time.
            </p>
            <div className="mt-4">
              <NavLink
                to="/dashboard"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DFB27A] hover:underline"
              >
                <span>Launch Interactive Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <section className="py-16 sm:py-24 border-t border-[#E6D9CB] dark:border-[#38111E] bg-[#F7F3EB]/60 dark:bg-[#14040A]/50 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#8A2D43] dark:text-[#DFB27A] uppercase tracking-wider">
              Engineered For Precision
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-[#230811] dark:text-[#FDFBF7]">
              Financial Analytics Designed to Empower
            </h2>
            <p className="text-xs sm:text-sm text-[#6E5A60] dark:text-[#E89BA8]/80 mt-2">
              Every card, chart, and transaction row works together in an integrated personal wealth ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div 
                  key={f.title}
                  className="p-6 rounded-2xl bg-white dark:bg-[#230811] border border-[#E6D9CB] dark:border-[#3E1421] shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#2D0B16] text-[#DFB27A] flex items-center justify-center mb-4 shadow-md">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#230811] dark:text-[#FDFBF7] mb-2">
                    {f.title}
                  </h3>
                  <p className="text-xs text-[#6E5A60] dark:text-[#A89299] leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#EADDCD] dark:border-[#38111E] py-10 px-4 sm:px-8 bg-[#FDFBF7] dark:bg-[#0F0307] transition-colors">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#230811] text-[#DFB27A] flex items-center justify-center font-serif font-bold text-sm">
              F
            </div>
            <div>
              <p className="font-serif font-bold text-sm text-[#230811] dark:text-[#FDFBF7]">FINORA</p>
              <p className="text-[10px] text-[#8C7A80] dark:text-[#A89299]">Personal Wealth & Financial Architecture</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#6E5A60] dark:text-[#A89299]">
            <NavLink to="/dashboard" className="hover:text-[#230811] dark:hover:text-[#FDFBF7]">Dashboard</NavLink>
            <NavLink to="/transactions" className="hover:text-[#230811] dark:hover:text-[#FDFBF7]">Ledger</NavLink>
            <NavLink to="/analytics" className="hover:text-[#230811] dark:hover:text-[#FDFBF7]">Analytics</NavLink>
            <NavLink to="/login" className="hover:text-[#230811] dark:hover:text-[#FDFBF7]">Member Access</NavLink>
          </div>

          <p className="text-[11px] text-[#8C7A80] dark:text-[#A89299]">
            © 2026 FINORA. Frontend-Only Learning Project.
          </p>
        </div>
      </footer>
    </div>
  );
}

