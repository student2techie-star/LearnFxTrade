import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import CourseCard from '@/components/CourseCard';
import CertificateGrid from '@/components/CertificateGrid';
import {
  TrendingUp,
  ShieldCheck,
  Award,
  Zap,
  ArrowRight,
  Play,
  BarChart3,
  Layers,
  Activity,
  CheckCircle2,
  Lock,
  ChevronRight,
  Flame,
} from 'lucide-react';

export default function HomePage() {
  const courses = db.getCourses();
  const certificates = db.getCertificates();

  return (
    <div className="space-y-28 pb-28 bg-[#06090e] bg-grid-pattern relative">
      {/* Hero Glows */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[650px] h-[400px] bg-[#00f2a9]/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-36 right-4 w-[500px] h-[350px] bg-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 lg:pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            {/* Live Terminal Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#00f2a9]/40 bg-[#00f2a9]/10 backdrop-blur-xl shadow-lg shadow-[#00f2a9]/10">
              <span className="flex h-2 w-2 rounded-full bg-[#00f2a9] animate-ping" />
              <span className="text-[11px] font-mono font-bold text-[#00f2a9] tracking-wider uppercase">
                INSTITUTIONAL ORDER FLOW • SMC & NIFTY PRECISION
              </span>
            </div>

            {/* Main Punchy Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
              Trade Like The Banks. <br />
              <span className="text-gradient-emerald">Extract Consistent Prop Payouts.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Master Institutional Liquidity Grabs, Fair Value Gaps, and Indian Index (Nifty/BankNifty) Option Buying. Backed by verified funded account payout receipts and zero retail indicator noise.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="/courses"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#00f2a9] hover:bg-[#00d696] text-[#06090e] font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-[#00f2a9]/30 flex items-center justify-center gap-2.5 group active:scale-95"
              >
                <span>Browse All Masterclasses</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/certificates"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest border border-[#172235] transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
              >
                <Award className="h-4 w-4 text-amber-400" />
                <span>Inspect Payout Proofs</span>
              </Link>
            </div>

            {/* Bloomberg Style Terminal Metrics Board */}
            <div className="w-full pt-8 mt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl border border-[#172235] bg-[#090f18]/90 backdrop-blur-xl">
                <div className="text-left border-r border-[#172235]/80 pr-4">
                  <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
                    <Activity className="h-3 w-3 text-[#00f2a9]" /> Verified Payouts
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white mt-1">$65,000+</div>
                  <div className="text-[10px] text-[#00f2a9] font-mono">FTMO & FundedNext</div>
                </div>

                <div className="text-left border-r border-[#172235]/80 pr-4">
                  <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-cyan-400" /> Win Expectancy
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-cyan-400 mt-1">1:3.5+</div>
                  <div className="text-[10px] text-slate-400 font-mono">Average R:R Ratio</div>
                </div>

                <div className="text-left border-r border-[#172235]/80 pr-4">
                  <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
                    <Flame className="h-3 w-3 text-amber-400" /> Active Students
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">1,240+</div>
                  <div className="text-[10px] text-slate-400 font-mono">India & Global</div>
                </div>

                <div className="text-left">
                  <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-emerald-400" /> Fee Model
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white mt-1">1-Time</div>
                  <div className="text-[10px] text-emerald-400 font-mono">Lifetime Video Access</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#00f2a9]">
              <Layers className="h-3.5 w-3.5" /> High-Probability Syllabuses
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1.5">
              Institutional Masterclasses
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Equip yourself with institutional order blocks, liquidity sweeps, and options data interpretation.
            </p>
          </div>
          <Link
            href="/courses"
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00f2a9] hover:underline group"
          >
            <span>Explore All Syllabuses</span>
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.slice(0, 3).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Verified Payout Proofs Showcase */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#172235] bg-gradient-to-b from-[#090f18] via-[#060a10] to-[#06090e] p-6 sm:p-12 space-y-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-[120px] pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-mono font-bold uppercase">
                <Award className="h-3.5 w-3.5" /> Verifiable Trading Proofs
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">
                Real Payout Certificates & Statements
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-xl">
                We believe in extreme transparency. Click any payout certificate below to open the high-resolution lightbox with reference keys.
              </p>
            </div>
            <Link
              href="/certificates"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider border border-[#172235] transition flex items-center gap-2 self-start md:self-auto"
            >
              <span>View Full Lightbox Gallery</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <CertificateGrid certificates={certificates} limit={3} />

          <div className="rounded-xl bg-[#06090e] border border-[#172235] p-4 text-center text-xs font-mono text-slate-400">
            Note: All certificates shown are from live and funded trading accounts. Payouts reflect personal historical performance and are not a guarantee of future returns.
          </div>
        </div>
      </section>

      {/* The Edge / Pillar Cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00f2a9]">
            The Institutional Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Built for Serious Disciplined Traders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl border border-[#172235] bg-[#090f18]/60 hover:border-[#00f2a9]/50 transition-all space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00f2a9]/10 text-[#00f2a9] border border-[#00f2a9]/30">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Smart Money Concepts (SMC)</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Identify institutional order flow, liquidity pools, fair value gaps, and liquidity sweeps before retail breakout traders get trapped.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-[#172235] bg-[#090f18]/60 hover:border-cyan-500/50 transition-all space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Razorpay Secure Checkout</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Immediate enrollment via UPI (GPay/PhonePe), Credit/Debit cards, and NetBanking with HMAC-SHA256 signature verification.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-[#172235] bg-[#090f18]/60 hover:border-amber-500/50 transition-all space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Prop Firm Funding Strategy</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Step-by-step risk management protocols to pass Phase 1 & 2 on FTMO, FundedNext, and secure recurring profit share splits.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#09151e] via-[#090f18] to-[#06090e] border border-[#00f2a9]/30 p-8 sm:p-16 text-center space-y-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00f2a9] text-[#06090e] shadow-xl shadow-[#00f2a9]/30">
            <TrendingUp className="h-7 w-7 stroke-[3]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white max-w-2xl mx-auto">
            Ready to Trade with Real Edge?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Gain immediate access to full course videos, exclusive trade execution checklists, and free preview lessons today.
          </p>
          <div className="pt-2">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#00f2a9] hover:bg-[#00d696] text-[#06090e] font-black text-xs uppercase tracking-widest shadow-xl shadow-[#00f2a9]/30 transition active:scale-95"
            >
              Start Learning Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
