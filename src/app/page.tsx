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
  Users,
  CheckCircle2,
  DollarSign,
  ChevronRight,
} from 'lucide-react';

export default function HomePage() {
  const courses = db.getCourses();
  const certificates = db.getCertificates();

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20 lg:pt-28">
        {/* Glow ambient lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/15 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md shadow-lg shadow-emerald-500/10">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">
                Real Payouts • Institutional Smart Money Concepts • 100% Honest
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
              Stop Trading Retail Traps. <br />
              <span className="gradient-text">Trade Like Institutions & Prop Firms.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
              Master Institutional Forex Order Flow, Gold (XAU/USD) Intraday Scalping, and Indian Index (Nifty/BankNifty) Option Buying. Backed by verified funded prop firm payout certificates.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="/courses"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm tracking-wide transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 group active:scale-95"
              >
                <span>Explore Courses & Syllabuses</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/certificates"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700/80 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
              >
                <Award className="h-4 w-4 text-amber-400" />
                <span>View Payout Certificates Proof</span>
              </Link>
            </div>

            {/* Trust Metrics Bar */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12 w-full border-t border-slate-800/80 mt-6">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">$65,000+</div>
                <div className="text-xs text-slate-400 mt-0.5">Prop Firm Payouts Verified</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">1:3.5+</div>
                <div className="text-xs text-slate-400 mt-0.5">Average Risk-to-Reward</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-cyan-400">1,200+</div>
                <div className="text-xs text-slate-400 mt-0.5">Active Students Trained</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400">₹0 Hidden</div>
                <div className="text-xs text-slate-400 mt-0.5">One-Time Fee & Lifetime Access</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Curated Curriculum
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
              Popular Trading Masterclasses
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              From prop firm evaluation passing algorithms to Indian market option buying. Each course includes free video previews.
            </p>
          </div>
          <Link
            href="/courses"
            className="flex items-center gap-1.5 text-sm font-bold text-emerald-400 hover:text-emerald-300 group"
          >
            <span>View All Courses</span>
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.slice(0, 3).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Social Proof: Payout Certificates Preview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950 p-6 sm:p-12 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
                <Award className="h-3.5 w-3.5" /> 100% Real Payout Certificates
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">
                Proven Social Proof & Payout Receipts
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-xl">
                We believe in complete transparency. Inspect real payout statements and prop firm pass certificates before you enroll.
              </p>
            </div>
            <Link
              href="/certificates"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition flex items-center gap-2 self-start md:self-auto"
            >
              <span>View Full Gallery (LightBox)</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <CertificateGrid certificates={certificates} limit={3} />

          <div className="rounded-xl bg-slate-950/60 border border-slate-800/80 p-4 text-center text-xs text-slate-400">
            Note: All certificates shown are from live and funded trading accounts. Payouts reflect personal historical performance and are not a promise of future yields.
          </div>
        </div>
      </section>

      {/* Why Choose LearnFxTrade */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            The Edge You Need
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
            Built by Traders, for Serious Traders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-emerald-500/40 transition-colors space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Smart Money Concepts (SMC)</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Learn institutional order blocks, liquidity sweeps, fair value gaps (FVG), and liquidity pools that drive price before news hits.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-emerald-500/40 transition-colors space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Razorpay Secure Checkout</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Instant access via UPI, Cards, and NetBanking. Backed by bank-grade encryption, instant signature verification, and automated receipts.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-emerald-500/40 transition-colors space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Prop Firm Funding Strategy</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Step-by-step algorithms designed to pass Phase 1 & 2 on FTMO, FundedNext, and earn consistent bi-weekly payouts without emotional tilt.
            </p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-500/30 p-8 sm:p-16 text-center space-y-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-slate-950 shadow-xl shadow-emerald-500/30">
            <TrendingUp className="h-7 w-7 stroke-[2.5]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white max-w-2xl mx-auto">
            Ready to Transform Your Trading Journey?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Gain immediate access to full course videos, exclusive trade execution checklists, and free preview lessons today.
          </p>
          <div className="pt-2">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-emerald-500/25 transition active:scale-95"
            >
              Start Learning Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
