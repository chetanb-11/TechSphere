import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Package, ArrowRight, Loader2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { motion, AnimatePresence } from "motion/react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { signin, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    clearError();
  }, [email, password, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signin(email, password);
    if (success) navigate("/");
  };

  return (
    <div className="min-h-screen flex font-sans bg-slate-50">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />

        {/* Animated mesh background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
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
              CartFodge
            </span>
          </Link>

          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-bold tracking-tight text-white leading-tight mb-4">
                Welcome<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300">
                  back.
                </span>
              </h1>
              <p className="text-lg text-slate-400 max-w-md leading-relaxed">
                Sign in to access your account, track orders, and discover the latest in precision technology.
              </p>
            </div>

            {/* Feature cards */}
            <div className="space-y-3">
              {[
                { label: "Track your orders in real-time", icon: "📦" },
                { label: "Exclusive member-only deals", icon: "⚡" },
                { label: "Personalized recommendations", icon: "✨" },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <span className="text-lg">{feature.icon}</span>
                  <span className="text-sm text-slate-300 font-medium">{feature.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <p className="text-sm text-slate-500">
            © 2026 CartFodge. All rights reserved.
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
              Sign in
            </h2>
            <p className="text-slate-500">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="login-email" className="text-sm font-semibold text-slate-700">Email address</label>
              <div className={`relative rounded-xl border-2 transition-all duration-200 ${
                focusedField === 'email' ? 'border-blue-500 shadow-sm shadow-blue-500/10' : 'border-slate-200 hover:border-slate-300'
              }`}>
                <Mail className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  focusedField === 'email' ? 'text-blue-500' : 'text-slate-400'
                }`} />
                <input
                  id="login-email"
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
              <div className="flex items-center justify-between">
                <label htmlFor="login-password" className="text-sm font-semibold text-slate-700">Password</label>
                <button type="button" className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className={`relative rounded-xl border-2 transition-all duration-200 ${
                focusedField === 'password' ? 'border-blue-500 shadow-sm shadow-blue-500/10' : 'border-slate-200 hover:border-slate-300'
              }`}>
                <Lock className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  focusedField === 'password' ? 'text-blue-500' : 'text-slate-400'
                }`} />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-11 pr-12 py-3.5 bg-transparent text-slate-900 text-sm outline-none placeholder:text-slate-400 rounded-xl"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full relative group bg-slate-900 text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center gap-2">
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-50 px-4 text-slate-400 font-semibold tracking-wider">or</span>
            </div>
          </div>

          {/* Social buttons placeholder */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-slate-200 hover:border-slate-300 hover:bg-white text-sm font-semibold text-slate-700 transition-all duration-200">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-slate-200 hover:border-slate-300 hover:bg-white text-sm font-semibold text-slate-700 transition-all duration-200">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </button>
          </div>

          {/* Sign up link */}
          <p className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              Create account
              <ArrowRight className="w-3 h-3 inline ml-1" />
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
