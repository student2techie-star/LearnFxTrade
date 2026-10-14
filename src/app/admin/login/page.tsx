'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Lock, Mail, ShieldAlert, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email.trim(), password, 'admin');
      router.push('/admin');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid admin credentials';
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070708] flex items-center justify-center p-4 antialiased selection:bg-[#10b981] selection:text-black">
      {/* Background subtle radial gradient */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,#14291f_0%,transparent_50%)]" />

      <div className="w-full max-w-md relative z-10">
        <div className="rounded-3xl border border-[#222222] bg-[#0d0d0f]/95 p-8 shadow-2xl backdrop-blur-xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#10b981] text-black shadow-lg shadow-[#10b981]/20">
              <ShieldCheck className="h-8 w-8 stroke-[2.5]" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              Admin Portal
            </h1>
            <p className="text-xs text-[#a1a1aa]">
              Secure restricted area for authorized administrators only.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-xs text-rose-300">
              <ShieldAlert className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#d1d4dc] block">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717a]" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="admin@learnfxtrade.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-xs rounded-xl bg-[#141416] border border-[#27272a] text-white placeholder-[#52525b] focus:outline-none focus:border-[#10b981] transition font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#d1d4dc] block">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717a]" />
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-xs rounded-xl bg-[#141416] border border-[#27272a] text-white placeholder-[#52525b] focus:outline-none focus:border-[#10b981] transition font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-[#10b981] hover:bg-[#0ea5e9] text-black hover:text-white font-extrabold text-xs tracking-wider transition shadow-lg shadow-[#10b981]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed uppercase"
            >
              {loading ? 'Authenticating with Database...' : 'Sign In to Admin Panel'}
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </button>
          </form>

          {/* Secure indicator */}
          <div className="pt-2 border-t border-[#1e1e22] text-center">
            <span className="text-[11px] text-[#71717a] font-medium inline-flex items-center gap-1.5">
              <Lock className="h-3 w-3 text-[#10b981]" /> End-to-end Database Authenticated Session
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
