'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import MarketTicker from './MarketTicker';
import {
  TrendingUp,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  Search,
  User,
  GraduationCap
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
    { name: 'Courses', href: '/courses' },
    { name: 'Payout Proofs', href: '/certificates' },
    { name: 'About Mentor', href: '/about' },
    { name: 'Help Desk', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all bg-white">
      {/* Top Real-time Market Data Ticker */}
      <MarketTicker />

      {/* Main TradingView India Header */}
      <div className="w-full border-b border-[#e0e3eb] bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo & Search like in.tradingview.com */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              {/* TradingView Icon Geometry */}
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2962ff] text-white font-black shadow-sm group-hover:bg-[#1e53e5] transition">
                <TrendingUp className="h-4 w-4 stroke-[3]" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold tracking-tight text-[#131722]">
                  LearnFx<span className="text-[#2962ff]">Trade</span>
                </span>
                <span className="text-[11px] font-bold text-[#787b86]">India</span>
              </div>
            </Link>

            {/* Quick Symbol Search Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0f3fa] text-xs text-[#787b86] border border-transparent hover:border-[#d1d4dc] transition cursor-pointer">
              <Search className="h-3.5 w-3.5" />
              <span>Search markets, SMC courses, strategies...</span>
              <kbd className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-[#e0e3eb] text-[#787b86] font-mono">⌘K</kbd>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    isActive
                      ? 'text-[#2962ff] bg-[#f0f3fa]'
                      : 'text-[#131722] hover:text-[#2962ff] hover:bg-[#f0f3fa]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* User Auth Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            {!mounted ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-[#131722] hover:text-[#2962ff] rounded-lg transition"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="tv-btn-primary px-5 py-2 text-sm shadow-sm"
                >
                  Get started
                </Link>
              </div>
            ) : user ? (
              <div className="flex items-center gap-2">
                {user.role === 'admin' ? (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Admin
                  </Link>
                ) : null}

                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-full bg-[#f0f3fa] text-[#131722] border border-[#e0e3eb] hover:bg-[#e0e3eb] transition"
                >
                  <GraduationCap className="h-4 w-4 text-[#2962ff]" />
                  <span>My Classroom</span>
                </Link>

                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-2 text-[#787b86] hover:text-rose-600 hover:bg-[#f0f3fa] rounded-full transition"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-[#131722] hover:text-[#2962ff] rounded-lg transition"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="tv-btn-primary px-5 py-2 text-sm shadow-sm"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#131722] hover:text-[#2962ff]"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#e0e3eb] bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold rounded-lg text-[#131722] hover:bg-[#f0f3fa]"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-[#e0e3eb] flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-bold rounded-lg bg-[#f0f3fa] text-[#131722]"
                >
                  <GraduationCap className="h-4 w-4 text-[#2962ff]" /> My Dashboard
                </Link>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-[#f0f3fa] rounded-lg text-left"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-semibold text-[#131722] bg-[#f0f3fa] rounded-lg"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-semibold text-white bg-[#2962ff] rounded-full"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
