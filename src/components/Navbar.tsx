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
  GraduationCap,
  ArrowRight
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
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all">
      <MarketTicker />

      <div className="w-full border-b border-[#1c1c1c] bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black font-black text-sm group-hover:bg-neutral-200 transition">
              <TrendingUp className="h-4 w-4 stroke-[2.5]" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold tracking-tight text-white">
                LearnFxTrade
              </span>
              <span className="text-[10px] font-mono uppercase text-neutral-500 font-semibold">
                PRO
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    isActive
                      ? 'text-white bg-neutral-900'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* User Auth & Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            {!mounted ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3 py-1.5 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white text-black hover:bg-neutral-200 transition-all"
                >
                  Get Started
                </Link>
              </div>
            ) : user ? (
              <div className="flex items-center gap-2">
                {user.role === 'admin' ? (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Admin
                  </Link>
                ) : null}

                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-900 border border-neutral-800 text-white hover:border-neutral-700 transition"
                >
                  <GraduationCap className="h-3.5 w-3.5" />
                  <span>Dashboard</span>
                </Link>

                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-md transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3 py-1.5 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white text-black hover:bg-neutral-200 transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-neutral-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#1c1c1c] bg-black px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium rounded-md text-neutral-300 hover:text-white hover:bg-neutral-900"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md bg-neutral-900 text-white"
                >
                  <GraduationCap className="h-4 w-4" /> Dashboard
                </Link>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-400 hover:bg-neutral-900 rounded-md text-left"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-xs font-medium text-neutral-300 bg-neutral-900 rounded-lg"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-xs font-bold text-black bg-white rounded-lg"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
