'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import MarketTicker from './MarketTicker';
import {
  TrendingUp,
  Award,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  GraduationCap,
  Sparkles,
  Zap
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Curriculum', href: '/courses' },
    { name: 'Payout Proofs', href: '/certificates' },
    { name: 'Mentor Bio', href: '/about' },
    { name: 'Help Desk', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all">
      {/* Top Real-time Market Data Bar */}
      <MarketTicker />

      {/* Main Glass Navigation Bar */}
      <div className="w-full border-b border-[#172235]/90 bg-[#06090e]/85 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-[#00f2a9] via-emerald-500 to-cyan-500 shadow-lg shadow-[#00f2a9]/20 group-hover:scale-105 transition-transform">
              <TrendingUp className="h-6 w-6 text-[#06090e] stroke-[3]" />
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-white">
                  LearnFx<span className="text-[#00f2a9]">Trade</span>
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#00f2a9]/15 text-[#00f2a9] border border-[#00f2a9]/30 tracking-wider">
                  TERMINAL
                </span>
              </div>
              <span className="text-[11px] font-mono font-medium text-slate-400 tracking-wider">
                INSTITUTIONAL SMC ACADEMY
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                    isActive
                      ? 'text-[#00f2a9] bg-[#00f2a9]/10 border border-[#00f2a9]/20 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* User Auth & Actions */}
          <div className="hidden md:flex items-center gap-3">
            {!mounted ? (
              <div className="flex items-center gap-2.5">
                <Link
                  href="/login"
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl bg-[#00f2a9] hover:bg-[#00d696] text-[#06090e] transition-all shadow-lg shadow-[#00f2a9]/25 active:scale-95"
                >
                  <Zap className="h-3.5 w-3.5 fill-[#06090e]" />
                  <span>Start Free</span>
                </Link>
              </div>
            ) : user ? (
              <div className="flex items-center gap-2.5">
                {user.role === 'admin' ? (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25 transition-all"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Admin
                  </Link>
                ) : null}

                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-slate-900 border border-slate-700/80 hover:border-[#00f2a9]/60 text-white transition-all shadow-sm"
                >
                  <GraduationCap className="h-4 w-4 text-[#00f2a9]" />
                  <span>Dashboard</span>
                </Link>

                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 rounded-xl transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  href="/login"
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl bg-[#00f2a9] hover:bg-[#00d696] text-[#06090e] transition-all shadow-lg shadow-[#00f2a9]/25 active:scale-95"
                >
                  <Zap className="h-3.5 w-3.5 fill-[#06090e]" />
                  <span>Start Free</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#172235] bg-[#06090e]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold rounded-lg text-slate-300 hover:text-white hover:bg-slate-900"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-[#172235] flex flex-col gap-2">
            {user ? (
              <>
                <div className="text-xs text-slate-400 px-3">
                  Account: <span className="text-[#00f2a9] font-semibold">{user.name}</span>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-bold rounded-lg bg-[#00f2a9]/10 text-[#00f2a9]"
                >
                  <GraduationCap className="h-4 w-4" /> Student Portal
                </Link>
                {user.role === 'admin' && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-bold rounded-lg bg-amber-500/10 text-amber-400"
                  >
                    <ShieldCheck className="h-4 w-4" /> Admin Console
                  </Link>
                )}
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-rose-400 hover:bg-slate-900 rounded-lg text-left"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-bold text-slate-200 bg-slate-900 rounded-xl"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-black text-[#06090e] bg-[#00f2a9] rounded-xl"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
