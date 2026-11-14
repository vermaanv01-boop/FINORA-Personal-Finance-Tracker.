import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  ReceiptText, 
  BarChart3, 
  PieChart, 
  IndianRupee, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Lock,
  Layers,
  Activity
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const { isDark } = useTheme();

  // Reference video opening sequence:
  // Step 1: Center floating preview card appears smoothly
  // Step 2: Card scales and transitions into right-aligned product showcase
  // Step 3: Hero copy reveals from left
  // Step 4: CTAs stagger into place
  const [sequenceStep, setSequenceStep] = useState(0);

  useEffect(() => {
    // Initial mount: Step 1 (floating center preview card)
    const t1 = setTimeout(() => setSequenceStep(1), 100);
    // Step 2: Transition into showcase layout, move to right
    const t2 = setTimeout(() => setSequenceStep(2), 700);
    // Step 3: Stagger headline & CTAs
    const t3 = setTimeout(() => setSequenceStep(3), 1100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Intersection Observer for scroll-based section reveals
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true
            }));
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const registerSection = (key) => (el) => {
    if (el) sectionRefs.current[key] = el;
  };

  const features = [
    {
      icon: ReceiptText,
      title: 'Real-Time Transaction Intelligence',
      desc: 'Seamlessly capture, reconcile and organize every debit and credit across your executive accounts with zero delay.'
    },
    {
      icon: BarChart3,
      title: 'Precision Spending Analytics',
      desc: 'Deep multi-quarter cash flow analytics with dynamic budget thresholds and surplus retention tracking.'
    },
    {
      icon: PieChart,
      title: 'Disciplined Budget Allocation',
      desc: 'Maintain optimal portfolio distribution across essential living costs, discretionary luxury and automated investments.'
    },
    {
      icon: IndianRupee,
      title: 'Native INR (₹) Architecture',
      desc: 'Engineered from the ground up for Indian numbering (Lakhs & Crores), perfectly formatted for high-net-worth clarity.'
    }
  ];

  return (
    <div className={`
      min-h-screen transition-colors duration-300 selection:bg-[#4A1025] selection:text-[#FFFFFF]
      ${isDark ? 'bg-[#260814] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#260814]'}
    `}>
      {/* Sticky Header */}
      <header className={`
        sticky top-0 z-40 backdrop-blur-md px-4 sm:px-8 py-4 transition-colors border-b
        ${isDark 
          ? 'bg-[#260814]/90 border-[#360B1C]' 
          : 'bg-[#FFFFFF]/90 border-[#E8E2E4]'
        }
      `}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className={`
              w-10 h-10 rounded-xl p-0.5 flex items-center justify-center shadow-md transition-transform group-hover:scale-105
              ${isDark ? 'bg-[#FFFFFF]' : 'bg-[#4A1025]'}
            `}>
              <div className={`
                w-full h-full rounded-[10px] flex items-center justify-center font-serif font-extrabold text-xl tracking-wider
                ${isDark ? 'bg-[#260814] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#4A1025]'}
              `}>
                F
              </div>
            </div>
            <div>
              <span className={`font-serif font-bold text-xl tracking-wider ${isDark ? 'text-[#FFFFFF]' : 'text-[#4A1025]'}`}>
                FINORA
              </span>
              <p className={`text-[9px] uppercase tracking-widest font-semibold ${isDark ? 'text-[#FFFFFF]/70' : 'text-[#4A1025]/80'}`}>
                Wealth & Finance
              </p>
            </div>
          </NavLink>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <NavLink
                to="/dashboard"
                className={`
                  flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95
                  ${isDark 
                    ? 'bg-[#FFFFFF] text-[#260814] hover:bg-[#F8F7F7]' 
                    : 'bg-[#4A1025] text-[#FFFFFF] hover:bg-[#5E142F]'
                  }
                `}
              >
                <span>Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </NavLink>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={`
                    px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors
                    ${isDark 
                      ? 'text-[#FFFFFF] hover:bg-[#360B1C]' 
                      : 'text-[#4A1025] hover:bg-[#F8F7F7]'
                    }
                  `}
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/signup"
                  className={`
                    hidden sm:flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md
                    ${isDark 
                      ? 'bg-[#FFFFFF] text-[#260814] hover:bg-[#F8F7F7]' 
                      : 'bg-[#4A1025] text-[#FFFFFF] hover:bg-[#5E142F]'
                    }
                  `}
                >
                  <span>Get Started</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </NavLink>
              </>
            )}
          </div>
        </div>
      </header>

      {/* HERO SECTION WITH CINEMATIC OPENING SEQUENCE */}
      <section className="relative overflow-hidden pt-8 pb-20 sm:pt-16 sm:pb-28 px-4 sm:px-8">
        {/* Subtle background glow */}
        <div className={`
          absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-3xl pointer-events-none opacity-20
          ${isDark ? 'bg-[#4A1025]' : 'bg-[#4A1025]/10'}
        `} />

        <div className="max-w-7xl mx-auto">
          {/* Main Hero Showcase Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Headlines & CTA (Reveals smoothly) */}
            <div className={`
              lg:col-span-5 text-left transition-all duration-700 ease-out
              ${sequenceStep >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
            `}>
              <div className={`
                inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 border shadow-xs
                ${isDark 
                  ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF]' 
                  : 'bg-[#F8F7F7] border-[#E8E2E4] text-[#4A1025]'
                }
              `}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Personal Finance Intelligence</span>
              </div>

              <h1 className={`
                font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.12] mb-6
                ${isDark ? 'text-[#FFFFFF]' : 'text-[#260814]'}
              `}>
                Your Money. <br />
                <span className={isDark ? 'text-[#FFFFFF]/90' : 'text-[#4A1025]'}>
                  Your Future.
                </span> <br />
                Your Control.
              </h1>

              <p className={`
                text-sm sm:text-base leading-relaxed mb-8 max-w-lg
                ${isDark ? 'text-[#FFFFFF]/75' : 'text-[#260814]/80'}
              `}>
                Manage your finances intelligently. Track every transaction, understand your spending and take control of your financial future with FINORA.
              </p>

              {/* CTAs with staggered reveal */}
              <div className={`
                flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 transition-all duration-500 delay-200
                ${sequenceStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}>
                <NavLink
                  to="/signup"
                  className={`
                    px-7 py-3.5 rounded-xl text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95
                    ${isDark 
                      ? 'bg-[#FFFFFF] text-[#260814] hover:bg-[#F8F7F7]' 
                      : 'bg-[#4A1025] text-[#FFFFFF] hover:bg-[#5E142F]'
                    }
                  `}
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </NavLink>

                <NavLink
                  to="/dashboard"
                  className={`
                    px-7 py-3.5 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center shadow-xs
                    ${isDark 
                      ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF] hover:bg-[#4A1025]' 
                      : 'bg-[#FFFFFF] border-[#E8E2E4] text-[#4A1025] hover:bg-[#F8F7F7]'
                    }
                  `}
                >
                  <span>Explore Dashboard</span>
                </NavLink>
              </div>

              {/* Quick trust checklist */}
              <div className={`
                mt-8 pt-6 border-t flex flex-wrap gap-4 text-xs font-medium
                ${isDark ? 'border-[#360B1C] text-[#FFFFFF]/60' : 'border-[#E8E2E4] text-[#260814]/70'}
              `}>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4A1025] dark:text-[#FFFFFF]" />
                  Zero Third-Party APIs
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4A1025] dark:text-[#FFFFFF]" />
                  INR (₹) Lakh/Crore Notation
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4A1025] dark:text-[#FFFFFF]" />
                  Full Local Persistence
                </span>
              </div>
            </div>

            {/* Right Column: Floating Dashboard Product Showcase (Opening Animation Target) */}
            <div className={`
              lg:col-span-7 transition-all duration-1000 ease-out transform
              ${sequenceStep === 0 ? 'opacity-0 scale-90 translate-y-8' : ''}
              ${sequenceStep === 1 ? 'opacity-100 scale-95 translate-y-0' : ''}
              ${sequenceStep >= 2 ? 'opacity-100 scale-100 translate-x-0' : ''}
            `}>
              <div className={`
                rounded-3xl p-4 sm:p-6 border shadow-2xl relative overflow-hidden transition-all
                ${isDark 
                  ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF]' 
                  : 'bg-[#260814] border-[#4A1025] text-[#FFFFFF]'
                }
              `}>
                {/* Floating header badge */}
                <div className="flex items-center justify-between pb-4 border-b border-[#4A1025]/80 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFFFFF]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFFFFF]/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFFFFF]/30" />
                    <span className="font-mono text-[11px] text-[#FFFFFF]/70 ml-2">finora.live.preview</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFFFFF] text-[#260814]">
                    ₹ INR Base Active
                  </span>
                </div>

                {/* Dashboard Showcase Mockup */}
                <div className="pt-5 space-y-4 text-left">
                  {/* Top 3 KPI pill cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-[#260814]/90 border border-[#4A1025] text-left">
                      <span className="text-[10px] text-[#FFFFFF]/70 uppercase font-semibold">Total Balance</span>
                      <p className="font-serif text-lg font-bold text-[#FFFFFF] mt-0.5">₹1,95,000.00</p>
                      <span className="text-[10px] text-[#FFFFFF]/90 font-medium">+14.8% net liquid</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#260814]/90 border border-[#4A1025] text-left">
                      <span className="text-[10px] text-[#FFFFFF]/70 uppercase font-semibold">Total Inflow</span>
                      <p className="font-serif text-lg font-bold text-[#FFFFFF] mt-0.5">₹3,35,300.00</p>
                      <span className="text-[10px] text-[#FFFFFF]/80 font-medium">Executive Inflow</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#260814]/90 border border-[#4A1025] text-left">
                      <span className="text-[10px] text-[#FFFFFF]/70 uppercase font-semibold">Net Savings Rate</span>
                      <p className="font-serif text-lg font-bold text-[#FFFFFF] mt-0.5">58.2%</p>
                      <span className="text-[10px] text-[#FFFFFF]/90 font-medium">Optimal Margin</span>
                    </div>
                  </div>

                  {/* Mock Interactive Graph Bars */}
                  <div className="p-4 rounded-2xl bg-[#260814]/90 border border-[#4A1025]">
                    <div className="flex items-center justify-between text-xs mb-3">
                      <div>
                        <p className="font-serif font-bold text-[#FFFFFF] text-sm">Monthly Expenditure Velocity</p>
                        <p className="text-[11px] text-[#FFFFFF]/60">Comparative inflow vs outflow trajectory</p>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#4A1025] text-[#FFFFFF] font-mono">Q4 Reconciled</span>
                    </div>

                    {/* Stylized CSS Bar chart simulation */}
                    <div className="h-28 flex items-end justify-between gap-2 pt-2 px-2 border-b border-[#4A1025]">
                      {[
                        { m: 'Jun', h1: '60%', h2: '35%' },
                        { m: 'Jul', h1: '75%', h2: '45%' },
                        { m: 'Aug', h1: '80%', h2: '40%' },
                        { m: 'Sep', h1: '85%', h2: '38%' },
                        { m: 'Oct', h1: '90%', h2: '50%' },
                        { m: 'Nov', h1: '100%', h2: '55%' }
                      ].map((bar, i) => (
                        <div key={bar.m} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                          <div className="w-full flex items-end justify-center gap-1 h-full">
                            <div className="w-3 bg-[#FFFFFF] rounded-t-sm" style={{ height: bar.h1 }} title="Inflow" />
                            <div className="w-3 bg-[#4A1025] border border-[#FFFFFF]/40 rounded-t-sm" style={{ height: bar.h2 }} title="Outflow" />
                          </div>
                          <span className="text-[10px] text-[#FFFFFF]/60 font-mono">{bar.m}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 text-[11px] text-[#FFFFFF]/75">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-sm bg-[#FFFFFF]" /> Inflow
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-sm bg-[#4A1025] border border-[#FFFFFF]/50" /> Outflow
                        </span>
                      </div>
                      <span className="text-[#FFFFFF] font-mono font-semibold">+2.4x Inflow Multiple</span>
                    </div>
                  </div>

                  {/* Mock live transaction strip */}
                  <div className="p-3 rounded-xl bg-[#260814]/90 border border-[#4A1025] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#FFFFFF] text-[#260814] flex items-center justify-center font-bold">
                        <ArrowDownLeft className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#FFFFFF] text-xs leading-tight">Client Retainer Inflow</p>
                        <p className="text-[10px] text-[#FFFFFF]/60">Consulting Fee • Cleared</p>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-sm text-[#FFFFFF]">+₹1,75,000.00</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: FEATURES SHOWCASE (Scroll-triggered entrance) */}
      <section 
        ref={registerSection('features')}
        data-section="features"
        className={`
          py-20 px-4 sm:px-8 border-t transition-all duration-700
          ${visibleSections.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
          ${isDark 
            ? 'bg-[#260814] border-[#360B1C]' 
            : 'bg-[#F8F7F7] border-[#E8E2E4]'
          }
        `}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-[#FFFFFF]' : 'text-[#4A1025]'}`}>
              Comprehensive Financial Suite
            </span>
            <h2 className={`font-serif text-3xl sm:text-4xl font-bold mt-2 ${isDark ? 'text-[#FFFFFF]' : 'text-[#260814]'}`}>
              Built for Precision & Complete Discretion
            </h2>
            <p className={`text-xs sm:text-sm mt-3 ${isDark ? 'text-[#FFFFFF]/70' : 'text-[#260814]/75'}`}>
              Every module within FINORA works synchronously to maintain an accurate ledger and actionable wealth intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div 
                  key={f.title}
                  className={`
                    p-6 rounded-2xl border shadow-lg transition-all duration-300 hover:-translate-y-1 group
                    ${isDark 
                      ? 'bg-[#360B1C] border-[#52152C] hover:border-[#FFFFFF]/40' 
                      : 'bg-[#FFFFFF] border-[#E8E2E4] hover:border-[#4A1025]'
                    }
                  `}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-sm transition-transform group-hover:scale-105
                    ${isDark 
                      ? 'bg-[#FFFFFF] text-[#260814]' 
                      : 'bg-[#4A1025] text-[#FFFFFF]'
                    }
                  `}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className={`font-serif font-bold text-base mb-2 ${isDark ? 'text-[#FFFFFF]' : 'text-[#260814]'}`}>
                    {f.title}
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-[#FFFFFF]/70' : 'text-[#260814]/70'}`}>
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: PRODUCT SHOWCASE & PARALLAX FLOATING CARDS */}
      <section 
        ref={registerSection('showcase')}
        data-section="showcase"
        className={`
          py-20 px-4 sm:px-8 transition-all duration-700
          ${visibleSections.showcase ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
        `}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 text-left">
              <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-[#FFFFFF]' : 'text-[#4A1025]'}`}>
                Unified Financial Ledger
              </span>
              <h2 className={`font-serif text-3xl sm:text-4xl font-bold mt-2 mb-4 ${isDark ? 'text-[#FFFFFF]' : 'text-[#260814]'}`}>
                Every Rupee Accounted For, Instantly Reconciled
              </h2>
              <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${isDark ? 'text-[#FFFFFF]/75' : 'text-[#260814]/75'}`}>
                Record new transactions in seconds. Whether posting executive consulting retainers, index fund SIPs, or apartment leases, FINORA updates your KPIs, category charts, and burn-rate benchmarks without refreshing.
              </p>

              <div className="space-y-3 mb-6">
                <div className={`p-3.5 rounded-xl border flex items-center gap-3 ${isDark ? 'bg-[#360B1C] border-[#52152C]' : 'bg-[#F8F7F7] border-[#E8E2E4]'}`}>
                  <ShieldCheck className={`w-5 h-5 shrink-0 ${isDark ? 'text-[#FFFFFF]' : 'text-[#4A1025]'}`} />
                  <span className="text-xs font-medium">Automatic balance calculation: Total Inflow minus Total Outflow</span>
                </div>
                <div className={`p-3.5 rounded-xl border flex items-center gap-3 ${isDark ? 'bg-[#360B1C] border-[#52152C]' : 'bg-[#F8F7F7] border-[#E8E2E4]'}`}>
                  <Activity className={`w-5 h-5 shrink-0 ${isDark ? 'text-[#FFFFFF]' : 'text-[#4A1025]'}`} />
                  <span className="text-xs font-medium">Live category breakdown and percentage allocations</span>
                </div>
              </div>

              <NavLink
                to="/transactions"
                className={`
                  inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95
                  ${isDark 
                    ? 'bg-[#FFFFFF] text-[#260814] hover:bg-[#F8F7F7]' 
                    : 'bg-[#4A1025] text-[#FFFFFF] hover:bg-[#5E142F]'
                  }
                `}
              >
                <span>Open Transaction Ledger</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </NavLink>
            </div>

            {/* Visual preview */}
            <div className="lg:col-span-7">
              <div className={`
                p-6 rounded-3xl border shadow-xl space-y-4
                ${isDark 
                  ? 'bg-[#360B1C] border-[#52152C]' 
                  : 'bg-[#260814] border-[#4A1025] text-[#FFFFFF]'
                }
              `}>
                <div className="flex items-center justify-between pb-3 border-b border-[#4A1025] text-xs">
                  <span className="font-serif font-bold text-sm text-[#FFFFFF]">Recent Transaction Stream</span>
                  <span className="text-[11px] text-[#FFFFFF]/70">Auto-Audited</span>
                </div>

                <div className="space-y-2.5">
                  {[
                    { title: 'Client Retainer - Executive Advisory', cat: 'Consulting Income', amt: '+₹1,75,000.00', isInc: true },
                    { title: 'Prestige Meridian Luxury Apartment Rent', cat: 'Housing & Rent', amt: '-₹45,000.00', isInc: false },
                    { title: 'Nifty 50 Index Fund SIP', cat: 'Investments', amt: '-₹35,000.00', isInc: false },
                    { title: 'TCS & Infosys Portfolio Dividend', cat: 'Dividend & Yield', amt: '+₹24,500.00', isInc: true }
                  ].map((tx) => (
                    <div 
                      key={tx.title}
                      className="p-3 rounded-xl bg-[#260814] border border-[#4A1025] flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${tx.isInc ? 'bg-[#FFFFFF] text-[#260814]' : 'bg-[#4A1025] text-[#FFFFFF]'}`}>
                          {tx.isInc ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-[#FFFFFF] leading-tight">{tx.title}</p>
                          <p className="text-[10px] text-[#FFFFFF]/60">{tx.cat}</p>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-[#FFFFFF]">{tx.amt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: CALL TO ACTION BANNER */}
      <section 
        ref={registerSection('cta')}
        data-section="cta"
        className={`
          py-20 px-4 sm:px-8 border-t transition-all duration-700
          ${visibleSections.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
          ${isDark ? 'border-[#360B1C]' : 'border-[#E8E2E4]'}
        `}
      >
        <div className="max-w-5xl mx-auto">
          <div className={`
            rounded-3xl p-8 sm:p-14 text-center border shadow-2xl relative overflow-hidden
            ${isDark 
              ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF]' 
              : 'bg-[#4A1025] border-[#5E142F] text-[#FFFFFF]'
            }
          `}>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4 text-[#FFFFFF]">
              Master Your Financial Future Today.
            </h2>
            <p className="max-w-xl mx-auto text-xs sm:text-sm text-[#FFFFFF]/80 leading-relaxed mb-8">
              Experience the clarity of an executive personal wealth intelligence platform. Zero setup required, completely client-side.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <NavLink
                to="/signup"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#FFFFFF] text-[#260814] font-bold text-xs tracking-wide shadow-xl hover:bg-[#F8F7F7] transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Create Free Account</span>
                <ArrowRight className="w-4 h-4" />
              </NavLink>

              <NavLink
                to="/login"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-[#FFFFFF]/40 text-[#FFFFFF] font-semibold text-xs hover:bg-[#FFFFFF]/10 transition-all flex items-center justify-center"
              >
                <span>Sign In Demo</span>
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`
        border-t py-12 px-4 sm:px-8 transition-colors
        ${isDark 
          ? 'bg-[#260814] border-[#360B1C] text-[#FFFFFF]/60' 
          : 'bg-[#FFFFFF] border-[#E8E2E4] text-[#260814]/70'
        }
      `}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className={`
              w-8 h-8 rounded-lg flex items-center justify-center font-serif font-bold text-sm
              ${isDark ? 'bg-[#FFFFFF] text-[#260814]' : 'bg-[#4A1025] text-[#FFFFFF]'}
            `}>
              F
            </div>
            <div>
              <p className={`font-serif font-bold text-sm ${isDark ? 'text-[#FFFFFF]' : 'text-[#260814]'}`}>
                FINORA
              </p>
              <p className="text-[10px]">
                Personal Wealth & Financial Architecture • White & Burgundy Identity
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-medium">
            <NavLink to="/dashboard" className="hover:underline">Dashboard</NavLink>
            <NavLink to="/transactions" className="hover:underline">Transactions</NavLink>
            <NavLink to="/analytics" className="hover:underline">Analytics</NavLink>
            <NavLink to="/settings" className="hover:underline">Settings</NavLink>
          </div>

          <p className="text-[11px]">
            © 2026 FINORA. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
