import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Package, ArrowRight, Loader2, Check } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { motion, AnimatePresence } from "motion/react";

const PASSWORD_REQUIREMENTS = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /[0-9]/.test(p) },
];

export function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const { signup, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    clearError();
    setLocalError(null);
  }, [email, password, confirmPassword, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setLocalError("Password must be at least 8 characters");
      return;
    }
    const success = await signup(email, password);
    if (success) navigate("/");
  };

  const displayError = localError || error;
  const allPasswordValid = PASSWORD_REQUIREMENTS.every(r => r.test(password));

  return (
    <div className="min-h-screen flex font-sans bg-slate-50">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-900" />

        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/3 -right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-2/3 left-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold group-hover:bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-500/25">
              <Package className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              TechSphere
            </span>
          </Link>

          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-bold tracking-tight text-white leading-tight mb-4">
                Join the<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-300">
                  future.
                </span>
              </h1>
              <p className="text-lg text-slate-400 max-w-md leading-relaxed">
                Create your TechSphere account and unlock access to cutting-edge technology at unbeatable prices.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "50K+", label: "Active Users" },
                { value: "1200+", label: "Products" },
                { value: "99.9%", label: "Uptime" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
                  className="px-4 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center"
                >
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <p className="text-sm text-slate-500">
            © 2026 TechSphere. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                <Package className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">TechSphere</span>
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
              Create account
            </h2>
            <p className="text-slate-500">
              Start your journey with TechSphere today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error */}
            <AnimatePresence>
              {displayError && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium"
                >
                  {displayError}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="signup-email" className="text-sm font-semibold text-slate-700">Email address</label>
              <div className={`relative rounded-xl border-2 transition-all duration-200 ${
                focusedField === 'email' ? 'border-blue-500 shadow-sm shadow-blue-500/10' : 'border-slate-200 hover:border-slate-300'
              }`}>
                <Mail className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  focusedField === 'email' ? 'text-blue-500' : 'text-slate-400'
                }`} />
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-11 pr-4 py-3.5 bg-transparent text-slate-900 text-sm outline-none placeholder:text-slate-400 rounded-xl"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="signup-password" className="text-sm font-semibold text-slate-700">Password</label>
              <div className={`relative rounded-xl border-2 transition-all duration-200 ${
                focusedField === 'password' ? 'border-blue-500 shadow-sm shadow-blue-500/10' : 'border-slate-200 hover:border-slate-300'
              }`}>
                <Lock className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  focusedField === 'password' ? 'text-blue-500' : 'text-slate-400'
                }`} />
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-11 pr-12 py-3.5 bg-transparent text-slate-900 text-sm outline-none placeholder:text-slate-400 rounded-xl"
                  placeholder="Create a strong password"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password strength */}
              {password.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-2 pt-1"
                >
                  {PASSWORD_REQUIREMENTS.map((req, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                        req.test(password) ? 'bg-emerald-500' : 'bg-slate-200'
                      }`}>
                        {req.test(password) && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                      <span className={`text-xs font-medium transition-colors ${
                        req.test(password) ? 'text-emerald-600' : 'text-slate-400'
                      }`}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="signup-confirm" className="text-sm font-semibold text-slate-700">Confirm password</label>
              <div className={`relative rounded-xl border-2 transition-all duration-200 ${
                focusedField === 'confirm' ? 'border-blue-500 shadow-sm shadow-blue-500/10' : 
                confirmPassword && confirmPassword !== password ? 'border-red-300' : 'border-slate-200 hover:border-slate-300'
              }`}>
                <Lock className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  focusedField === 'confirm' ? 'text-blue-500' : 'text-slate-400'
                }`} />
                <input
                  id="signup-confirm"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocusedField('confirm')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-11 pr-12 py-3.5 bg-transparent text-slate-900 text-sm outline-none placeholder:text-slate-400 rounded-xl"
                  placeholder="Repeat your password"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && confirmPassword !== password && (
                <p className="text-xs text-red-500 font-medium">Passwords do not match</p>
              )}
            </div>

            {/* Terms */}
            <p className="text-xs text-slate-400">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Privacy Policy</a>.
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || !email || !password || !confirmPassword || password !== confirmPassword || !allPasswordValid}
              className="w-full relative group bg-slate-900 text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center gap-2">
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Create account
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Sign in link */}
          <p className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              Sign in
              <ArrowRight className="w-3 h-3 inline ml-1" />
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
