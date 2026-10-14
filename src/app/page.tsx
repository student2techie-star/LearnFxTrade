'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CourseCard from '@/components/CourseCard';
import CertificateGrid from '@/components/CertificateGrid';
import BearBullMorph from '@/components/BearBullMorph';
import { Course, PayoutCertificate } from '@/lib/types';
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Search,
  Award,
  BookOpen,
  ChevronRight,
  CheckCircle,
  ShieldCheck,
  Zap,
  BarChart2
} from 'lucide-react';

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [certificates, setCertificates] = useState<PayoutCertificate[]>([]);

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data.courses || []))
      .catch(err => console.error('Failed to load courses from DB:', err));

    fetch('/api/certificates')
      .then(res => res.json())
      .then(data => setCertificates(data.certificates || []))
      .catch(err => console.error('Failed to load certificates from DB:', err));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pb-24 space-y-12">
      {/* 1. HERO WITH BEAR TO BULL WHITE SMOKE TRANSITION */}
      <section className="relative pt-10 sm:pt-14 pb-14 border-b border-[#222222] bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Heading, Copy, Search */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Top Eyebrow Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111111] border border-[#222222] text-xs font-semibold">
                <span className="flex h-2 w-2 rounded-full bg-[#089981] animate-pulse" />
                <span className="text-[#089981] font-mono">CYCLE SHIFT</span>
                <span className="text-[#a1a1aa]">•</span>
                <span className="text-white">Bear Market Liquidity to Bullish Momentum</span>
              </div>

              {/* Hero Typography */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
                Master Institutional Trading <br />
                <span className="text-[#10b981]">Forex SMC & Indian Market Edge.</span>
              </h1>

              <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Learn how institutional order flow transitions from bear sweeps to bull expansions. Complete curriculum covering Smart Money Concepts, Nifty/BankNifty options, and funded prop firm risk rules.
              </p>

              {/* Centered Search Command Bar */}
              <div className="pt-2 max-w-xl mx-auto lg:mx-0">
                <div className="relative flex items-center w-full rounded-2xl bg-[#111111] border border-[#222222] hover:border-[#10b981] focus-within:border-[#10b981] transition shadow-xl p-2">
                  <Search className="h-5 w-5 text-white/60 ml-3 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search SMC courses, NIFTY strategies, syllabus..."
                    className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-white/50 focus:outline-none"
                    readOnly
                    onClick={() => window.location.href = '/courses'}
                  />
                  <Link
                    href="/courses"
                    className="tv-btn-primary px-5 py-2 text-xs font-bold shrink-0 flex items-center gap-1 shadow-sm"
                  >
                    <span>Explore</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Quick Filter Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-white">
                <span className="font-semibold text-white/70">Popular:</span>
                {['NIFTY 50 Options', 'BankNifty Scalping', 'Forex EUR/USD SMC', 'Gold XAU/USD', 'FTMO Prop Passed'].map((item, idx) => (
                  <Link
                    key={idx}
                    href="/courses"
                    className="px-2.5 py-1 rounded-lg bg-[#111111] hover:bg-[#1c1c1c] border border-[#222222] text-white hover:text-[#10b981] transition font-mono text-[11px]"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Column: Dynamic Bear to Bull Smoke Morphing Display */}
            <div className="lg:col-span-5 flex justify-center">
              <BearBullMorph />
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRADING MASTERCLASSES (CURRICULUM IN PURE BLACK CARDS) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between pb-3 border-b border-[#222222]">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#10b981]" />
              <span className="text-xs font-bold uppercase text-[#10b981] tracking-wider">Trading Masterclasses</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Institutional Courses & Syllabi
            </h2>
          </div>
          <Link
            href="/courses"
            className="text-xs font-bold text-[#10b981] hover:underline flex items-center gap-1"
          >
            <span>View All Masterclasses</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 3).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* 4. VERIFIED PAYOUT CERTIFICATES & SOCIAL PROOF */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between pb-3 border-b border-[#222222]">
          <div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-[#10b981]" />
              <span className="text-xs font-bold uppercase text-[#10b981] tracking-wider">Verified Proof</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Prop Firm Payouts & Funded Statements
            </h2>
          </div>
          <Link
            href="/certificates"
            className="text-xs font-bold text-[#10b981] hover:underline flex items-center gap-1"
          >
            <span>Inspect All Proofs</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <CertificateGrid certificates={certificates} limit={3} />
      </section>

      {/* 4.5 OFFLINE CLASSROOM BATCHES CALLOUT */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-[#222222] bg-gradient-to-r from-[#0d1612] via-[#111111] to-[#0c0c0e] p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10b981]/15 text-[#10b981] text-xs font-bold uppercase tracking-wider border border-[#10b981]/30">
              <span className="h-2 w-2 rounded-full bg-[#10b981] animate-ping" />
              In-Person Classroom Workshops
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Prefer Offline Classes? Join Us in Bengaluru, Mumbai & Delhi.
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
              Experience institutional live trading on big screens with the mentor during market hours. Limited seats per batch with real-time seat tracking.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/offline"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#10b981] hover:bg-[#059669] text-black font-extrabold text-xs transition shadow-lg shadow-[#10b981]/20 cursor-pointer"
            >
              <span>Explore Offline Batches & Reserve Seat</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>


      {/* 5. TRUST & VERIFIED STATS STRIP */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#111111] border border-[#222222]">
          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-white/60">Total Payouts</div>
            <div className="text-2xl font-black text-white font-mono">$65,000+</div>
            <div className="text-xs text-[#10b981] font-semibold">FTMO & FundedNext</div>
          </div>
          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-white/60">Trade Execution R:R</div>
            <div className="text-2xl font-black text-[#10b981] font-mono">1:3.5+</div>
            <div className="text-xs text-white/80">Smart Money Confluence</div>
          </div>
          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-white/60">Active Students</div>
            <div className="text-2xl font-black text-white font-mono">1,240+</div>
            <div className="text-xs text-white/80">Pan-India & Overseas</div>
          </div>
          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-white/60">Razorpay Payments</div>
            <div className="text-2xl font-black text-[#10b981] font-mono">Instant</div>
            <div className="text-xs text-white/80">UPI & Card Access</div>
          </div>
        </div>
      </section>
    </div>
  );
}
