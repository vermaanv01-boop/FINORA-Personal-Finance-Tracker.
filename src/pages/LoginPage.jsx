import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

export default function LoginPage() {
  const { login, demoUser } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState('demo@finora.io');
  const [password, setPassword] = useState('Password123!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = login(email, password, rememberMe);
      setLoading(false);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setError(res.error);
      }
    }, 250);
  };

  const fillDemo = () => {
    setEmail(demoUser.email);
    setPassword(demoUser.password);
    setError('');
  };

  return (
    <div className={`
      min-h-screen flex flex-col justify-between transition-colors duration-300 p-4 sm:p-6
      ${isDark ? 'bg-[#260814] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#260814]'}
    `}>
      {/* Header bar */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between py-2">
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className={`
            w-10 h-10 rounded-xl p-0.5 flex items-center justify-center shadow-md transition-transform group-hover:scale-105
            ${isDark ? 'bg-[#FFFFFF]' : 'bg-[#4A1025]'}
          `}>
            <div className={`
              w-full h-full rounded-[10px] flex items-center justify-center font-serif font-extrabold text-xl
              ${isDark ? 'bg-[#260814] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#4A1025]'}
            `}>
              F
            </div>
          </div>
          <span className={`font-serif font-bold text-xl tracking-wider ${isDark ? 'text-[#FFFFFF]' : 'text-[#4A1025]'}`}>
            FINORA
          </span>
        </NavLink>

        <ThemeToggle />
      </header>

      {/* Login Card */}
      <main className="max-w-md w-full mx-auto my-auto py-8">
        <div className={`
          border rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all
          ${isDark 
            ? 'bg-[#360B1C] border-[#52152C] text-[#FFFFFF]' 
            : 'bg-[#FFFFFF] border-[#E8E2E4] text-[#260814]'
          }
        `}>
          {/* Title */}
          <div className="text-center mb-6">
            <div className={`
              inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-semibold mb-3
              ${isDark ? 'bg-[#260814] border-[#52152C] text-[#FFFFFF]' : 'bg-[#F8F7F7] border-[#E8E2E4] text-[#4A1025]'}
            `}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulated Member Sign In</span>
            </div>
            <h1 className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight ${isDark ? 'text-[#FFFFFF]' : 'text-[#260814]'}`}>
              Welcome Back
            </h1>
            <p className={`text-xs mt-1 ${isDark ? 'text-[#FFFFFF]/70' : 'text-[#260814]/75'}`}>
              Access your executive wealth dashboard
            </p>
          </div>

          {/* Quick Demo Fill Pill */}
          <div className={`
            mb-5 p-3 rounded-xl border flex items-center justify-between text-xs
            ${isDark ? 'bg-[#260814] border-[#52152C]' : 'bg-[#F8F7F7] border-[#E8E2E4]'}
          `}>
            <span className={isDark ? 'text-[#FFFFFF]/70' : 'text-[#260814]/70'}>
              Pre-seeded demo user
            </span>
            <button
              type="button"
              onClick={fillDemo}
              className={`font-semibold hover:underline cursor-pointer ${isDark ? 'text-[#FFFFFF]' : 'text-[#4A1025]'}`}
            >
              Autofill Credentials
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-800 text-white text-xs font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#FFFFFF]/90' : 'text-[#4A1025]'}`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@finora.io"
                  className={`
                    w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs focus:outline-hidden transition-all
                    ${isDark 
                      ? 'bg-[#260814] border-[#52152C] text-[#FFFFFF] placeholder:text-[#FFFFFF]/30 focus:border-[#FFFFFF]' 
                      : 'bg-[#FFFFFF] border-[#E8E2E4] text-[#260814] placeholder:text-gray-400 focus:border-[#4A1025]'
                    }
                  `}
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={`text-xs font-semibold ${isDark ? 'text-[#FFFFFF]/90' : 'text-[#4A1025]'}`}>
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className={`
                    w-full pl-10 pr-10 py-2.5 rounded-xl border text-xs focus:outline-hidden transition-all
                    ${isDark 
                      ? 'bg-[#260814] border-[#52152C] text-[#FFFFFF] placeholder:text-[#FFFFFF]/30 focus:border-[#FFFFFF]' 
                      : 'bg-[#FFFFFF] border-[#E8E2E4] text-[#260814] placeholder:text-gray-400 focus:border-[#4A1025]'
                    }
                  `}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className={`flex items-center gap-2 cursor-pointer text-xs ${isDark ? 'text-[#FFFFFF]/70' : 'text-[#260814]/70'}`}>
                <input 
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 accent-[#4A1025] rounded cursor-pointer"
                />
                <span>Remember me on this session</span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`
                w-full mt-2 py-3 rounded-xl font-bold text-xs tracking-wide shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer
                ${isDark 
                  ? 'bg-[#FFFFFF] text-[#260814] hover:bg-[#F8F7F7]' 
                  : 'bg-[#4A1025] text-[#FFFFFF] hover:bg-[#5E142F]'
                }
              `}
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Finora'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Link to Sign Up */}
          <div className={`mt-6 pt-5 border-t text-center text-xs ${isDark ? 'border-[#52152C] text-[#FFFFFF]/70' : 'border-[#E8E2E4] text-[#260814]/70'}`}>
            Don't have an account yet?{' '}
            <NavLink to="/signup" className={`font-semibold hover:underline ml-1 ${isDark ? 'text-[#FFFFFF]' : 'text-[#4A1025]'}`}>
              Sign Up Free
            </NavLink>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`text-center text-xs py-4 ${isDark ? 'text-[#FFFFFF]/50' : 'text-[#260814]/60'}`}>
        © 2026 FINORA. Pure White & Burgundy Architecture.
      </footer>
    </div>
  );
}
