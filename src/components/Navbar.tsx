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
    <header className="sticky top-0 z-50 w-full transition-all bg-black">
      {/* Main Pure Black Header */}
      <div className="w-full border-b border-[#222222] bg-black/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo & Search */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#10b981] text-black font-black shadow-sm group-hover:bg-[#059669] transition">
                <TrendingUp className="h-4 w-4 stroke-[3]" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold tracking-tight text-white">
                  LearnFx<span className="text-[#10b981]">Trade</span>
                </span>
                <span className="text-[11px] font-bold text-[#a1a1aa]">India</span>
              </div>
            </Link>

            {/* TradingView Search Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] text-xs text-[#a1a1aa] border border-[#222222] hover:border-[#333333] transition cursor-pointer">
              <Search className="h-3.5 w-3.5 text-[#a1a1aa]" />
              <span className="text-white">Search markets, SMC courses, strategies...</span>
              <kbd className="text-[10px] bg-black px-1.5 py-0.5 rounded border border-[#222222] text-[#a1a1aa] font-mono">⌘K</kbd>
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
                      ? 'text-white bg-[#1e222d]'
                      : 'text-[#d1d4dc] hover:text-white hover:bg-[#1e222d]'
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
                  className="px-4 py-2 text-sm font-semibold text-[#d1d4dc] hover:text-white rounded-lg transition"
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
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-[#1e222d] text-amber-400 border border-amber-500/40 hover:bg-[#2a2e39] transition"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Admin
                  </Link>
                ) : null}

                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-full bg-[#111111] text-white border border-[#222222] hover:bg-[#1c1c1c] transition"
                >
                  <GraduationCap className="h-4 w-4 text-[#10b981]" />
                  <span>My Classroom</span>
                </Link>

                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-2 text-[#a1a1aa] hover:text-rose-400 hover:bg-[#1c1c1c] rounded-full transition"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-white/80 hover:text-white rounded-lg transition"
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
              className="p-2 text-white/80 hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#222222] bg-black px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold rounded-lg text-white/80 hover:bg-[#1c1c1c] hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-[#222222] flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-bold rounded-lg bg-[#111111] text-white"
                >
                  <GraduationCap className="h-4 w-4 text-[#10b981]" /> My Dashboard
                </Link>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-rose-400 hover:bg-[#1c1c1c] rounded-lg text-left"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-semibold text-white/80 bg-[#111111] rounded-lg"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-semibold text-black bg-[#10b981] rounded-full"
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
