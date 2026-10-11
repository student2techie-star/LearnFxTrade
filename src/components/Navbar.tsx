'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import {
  TrendingUp,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  GraduationCap,
  User,
  ChevronDown,
  Video,
  Radio,
  MapPin,
  ArrowRight
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCoursesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setCoursesDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  const courseOptions = [
    {
      name: 'Recorded Classes',
      description: 'Self-paced on-demand HD video modules',
      href: '/courses/recorded',
      icon: Video,
      iconColor: 'text-[#10b981]',
      badge: 'Self-Paced',
    },
    {
      name: 'Offline Classes',
      description: '3-day in-person workshops & trading floor',
      href: '/offline',
      icon: MapPin,
      iconColor: 'text-amber-400',
      badge: 'In-Person',
    },
    {
      name: 'Live Sessions',
      description: 'Real-time market trading floor on Zoom/Meet',
      href: '/live',
      icon: Radio,
      iconColor: 'text-rose-400',
      badge: 'Interactive',
    },
  ];

  const standardNavLinks = [
    { name: 'Home', href: '/' },
    { name: 'Payout Proofs', href: '/certificates' },
    { name: 'About Mentor', href: '/about' },
    { name: 'Help Desk', href: '/contact' },
  ];

  // Do not render the website public navbar on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const isCoursesActive =
    pathname === '/courses' ||
    pathname.startsWith('/courses/') ||
    pathname === '/live' ||
    pathname === '/offline';

  return (
    <header className="sticky top-0 z-50 w-full transition-all bg-black">
      {/* Main Pure Black Header */}
      <div className="w-full border-b border-[#222222] bg-black/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
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
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                pathname === '/'
                  ? 'text-white bg-[#1e222d]'
                  : 'text-[#d1d4dc] hover:text-white hover:bg-[#1e222d]'
              }`}
            >
              Home
            </Link>

            {/* Courses Interactive Dropdown Menu with 3 Options */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setCoursesDropdownOpen(!coursesDropdownOpen)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  isCoursesActive || coursesDropdownOpen
                    ? 'text-white bg-[#1e222d]'
                    : 'text-[#d1d4dc] hover:text-white hover:bg-[#1e222d]'
                }`}
                aria-expanded={coursesDropdownOpen}
              >
                <span>Courses</span>
                <ChevronDown
                  className={`h-4 w-4 text-[#a1a1aa] transition-transform duration-200 ${
                    coursesDropdownOpen ? 'rotate-180 text-white' : ''
                  }`}
                />
              </button>

              {/* The 3 Options Dropdown Panel */}
              {coursesDropdownOpen && (
                <div className="absolute left-0 mt-2 w-80 rounded-2xl bg-[#0c0c0e] border border-[#27272a] p-3 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 z-50 space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#a1a1aa] border-b border-[#1c1c1f] flex items-center justify-between">
                    <span>Select Learning Mode</span>
                    <Link
                      href="/courses"
                      onClick={() => setCoursesDropdownOpen(false)}
                      className="text-[#10b981] hover:underline text-[10px]"
                    >
                      Compare All →
                    </Link>
                  </div>

                  {courseOptions.map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <Link
                        key={opt.href}
                        href={opt.href}
                        onClick={() => setCoursesDropdownOpen(false)}
                        className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#161619] transition"
                      >
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#141416] border border-[#27272a] group-hover:border-[#10b981]/50 group-hover:bg-[#10b981]/10 transition">
                          <Icon className={`h-4 w-4 ${opt.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white group-hover:text-[#10b981] transition">
                              {opt.name}
                            </span>
                            <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-[#1c1c20] text-[#a1a1aa]">
                              {opt.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#a1a1aa] mt-0.5 line-clamp-1">
                            {opt.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Remaining standard links */}
            {standardNavLinks.slice(1).map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
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
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-[#111111] text-white border border-[#222222] hover:bg-[#1c1c1c] transition"
                >
                  <GraduationCap className="h-3.5 w-3.5 text-[#10b981]" />
                  <span>My Classroom</span>
                </Link>

                <Link
                  href="/profile"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-[#111111] text-white/90 border border-[#222222] hover:bg-[#1c1c1c] hover:text-emerald-400 transition"
                  title="Profile & Settings"
                >
                  <User className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Profile</span>
                </Link>

                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-2 text-[#a1a1aa] hover:text-rose-400 hover:bg-[#1c1c1c] rounded-full transition cursor-pointer"
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
              className="p-2 text-white/80 hover:text-white cursor-pointer"
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
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold rounded-lg text-white/80 hover:bg-[#1c1c1c] hover:text-white"
            >
              Home
            </Link>

            {/* Mobile Accordion for Courses */}
            <div className="rounded-xl border border-[#222222] bg-[#0c0c0e] p-2 space-y-2">
              <button
                type="button"
                onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
                className="w-full flex items-center justify-between px-2 py-1.5 text-sm font-bold text-white"
              >
                <span className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-[#10b981]" />
                  <span>Courses (Select Mode)</span>
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-[#a1a1aa] transition-transform ${
                    mobileCoursesOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {mobileCoursesOpen && (
                <div className="pl-2 pt-1 border-t border-[#1e1e22] space-y-1">
                  {courseOptions.map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <Link
                        key={opt.href}
                        href={opt.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold text-white/90 hover:bg-[#18181b]"
                      >
                        <Icon className={`h-4 w-4 ${opt.iconColor}`} />
                        <span>{opt.name}</span>
                      </Link>
                    );
                  })}
                  <Link
                    href="/courses"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-2.5 py-1.5 text-[11px] font-bold text-[#10b981] hover:underline"
                  >
                    <span>View All 3 Options (Overview)</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              )}
            </div>

            {standardNavLinks.slice(1).map((link) => (
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
                  <GraduationCap className="h-4 w-4 text-[#10b981]" /> My Classroom
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-bold rounded-lg bg-[#111111] text-white hover:text-emerald-400"
                >
                  <User className="h-4 w-4 text-emerald-400" /> Profile & Settings
                </Link>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-rose-400 hover:bg-[#1c1c1c] rounded-lg text-left cursor-pointer"
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
