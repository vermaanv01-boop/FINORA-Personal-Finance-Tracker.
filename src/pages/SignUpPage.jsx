import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Lock, 
  Mail, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles,
  ShieldCheck 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';

export default function SignUpPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please provide your full legal or preferred name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Password confirmation does not match.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = signup(name, email, password);
      setLoading(false);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setError(res.error);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FDFBF7] dark:bg-[#0F0307] text-[#1F2937] dark:text-[#FDFBF7] transition-colors p-4 sm:p-6">
      {/* Header bar */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between py-2">
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DFB27A] to-[#E89BA8] p-0.5 flex items-center justify-center shadow-lg shadow-[#DFB27A]/10 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#230811] rounded-[10px] flex items-center justify-center">
              <span className="font-serif font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-tr from-[#DFB27A] to-[#F7D6DC]">
                F
              </span>
            </div>
          </div>
          <span className="font-serif font-bold text-xl tracking-wider text-[#230811] dark:text-[#FDFBF7]">
            FINORA
          </span>
        </NavLink>

        <ThemeToggle />
      </header>

      {/* SignUp Card */}
      <main className="max-w-md w-full mx-auto my-auto py-8">
        <div className="bg-[#230811] border border-[#3E1421] rounded-3xl p-6 sm:p-8 shadow-2xl text-[#FDFBF7] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#DFB27A]/10 via-transparent to-transparent rounded-bl-full pointer-events-none" />

          {/* Title */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#35101E] border border-[#4E1829] text-[11px] font-semibold text-[#DFB27A] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personal Finance Management</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#FDFBF7]">
              Create Your Account
            </h1>
            <p className="text-xs text-[#E89BA8]/80 mt-1">
              Start mastering your cash flow and analytics in INR (₹)
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#E89BA8] mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C6E76]" />
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Eleanor Laurence"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1C060D] border border-[#3D1421] text-xs text-[#FDFBF7] placeholder:text-[#6E555C] focus:outline-hidden focus:border-[#E89BA8]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#E89BA8] mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C6E76]" />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1C060D] border border-[#3D1421] text-xs text-[#FDFBF7] placeholder:text-[#6E555C] focus:outline-hidden focus:border-[#E89BA8]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#E89BA8] mb-1.5">
                Password (min. 6 characters) *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C6E76]" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#1C060D] border border-[#3D1421] text-xs text-[#FDFBF7] placeholder:text-[#6E555C] focus:outline-hidden focus:border-[#E89BA8]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C6E76] hover:text-[#FDFBF7]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#E89BA8] mb-1.5">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C6E76]" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1C060D] border border-[#3D1421] text-xs text-[#FDFBF7] placeholder:text-[#6E555C] focus:outline-hidden focus:border-[#E89BA8]"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#DFB27A] via-[#E89BA8] to-[#DFB27A] text-[#230811] font-bold text-xs tracking-wide shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
            >
              <span>{loading ? 'Creating Account...' : 'Agree & Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Link to Login */}
          <div className="mt-6 pt-5 border-t border-[#3D1421] text-center text-xs text-[#A89299]">
            Already have an account?{' '}
            <NavLink to="/login" className="text-[#DFB27A] hover:underline font-semibold ml-1">
              Sign In
            </NavLink>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-[#8C7A80] py-4">
        © 2026 FINORA. LocalStorage simulation mode for educational pair programming.
      </footer>
    </div>
  );
}

