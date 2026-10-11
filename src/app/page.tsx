import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import CourseCard from '@/components/CourseCard';
import CertificateGrid from '@/components/CertificateGrid';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  BookOpen,
  BarChart2,
  TrendingUp,
  Activity,
  CheckCircle,
} from 'lucide-react';

export default function HomePage() {
  const courses = db.getCourses();
  const certificates = db.getCertificates();

  return (
    <div className="space-y-20 pb-24 bg-[#131722] text-[#d1d4dc]">
      {/* Hero Section */}
      <section className="pt-14 sm:pt-20 border-b border-[#2a2e39] pb-16 bg-gradient-to-b from-[#181d2a] to-[#131722]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#1e222d] border border-[#2a2e39] text-xs font-mono text-[#d1d4dc]">
            <span className="h-2 w-2 rounded-full bg-[#089981]" />
            <span>FOREX INSTITUTIONAL SMC & INDIAN MARKET TRADING ACADEMY</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Stop Trading Retail Noise. <br />
            <span className="text-[#2962ff]">Master Pure Institutional Order Flow.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#787b86] max-w-2xl mx-auto leading-relaxed">
            A structured framework designed to trade Forex liquidity pools and Indian index options (Nifty/BankNifty). Backed by verified prop firm payouts and strict mathematical risk control.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/courses"
              className="w-full sm:w-auto px-6 py-3 rounded-md bg-[#2962ff] hover:bg-[#1e53e5] text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-[#2962ff]/20"
            >
              <span>Explore All Courses</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/certificates"
              className="w-full sm:w-auto px-6 py-3 rounded-md bg-[#1e222d] hover:bg-[#2a2e39] text-white font-semibold text-xs uppercase tracking-wider border border-[#2a2e39] transition-all flex items-center justify-center gap-2"
            >
              <Award className="h-4 w-4 text-amber-400" />
              <span>Inspect Payout Proofs</span>
            </Link>
          </div>

          {/* TradingView Style Key Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-[#2a2e39] max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-md bg-[#1e222d] border border-[#2a2e39]">
              <div className="text-[11px] font-mono text-[#787b86] flex items-center gap-1">
                <Activity className="h-3.5 w-3.5 text-[#089981]" /> Payouts Verified
              </div>
              <div className="text-2xl font-bold text-white font-mono mt-1">$65,000+</div>
              <div className="text-[10px] text-[#089981] font-mono">FTMO & FundedNext</div>
            </div>

            <div className="p-4 rounded-md bg-[#1e222d] border border-[#2a2e39]">
              <div className="text-[11px] font-mono text-[#787b86] flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5 text-[#2962ff]" /> Average Setup R:R
              </div>
              <div className="text-2xl font-bold text-[#2962ff] font-mono mt-1">1:3.5+</div>
              <div className="text-[10px] text-[#787b86] font-mono">Strict Invalidation</div>
            </div>

            <div className="p-4 rounded-md bg-[#1e222d] border border-[#2a2e39]">
              <div className="text-[11px] font-mono text-[#787b86] flex items-center gap-1">
                <BarChart2 className="h-3.5 w-3.5 text-amber-400" /> Students Trained
              </div>
              <div className="text-2xl font-bold text-white font-mono mt-1">1,240+</div>
              <div className="text-[10px] text-[#787b86] font-mono">Community Members</div>
            </div>

            <div className="p-4 rounded-md bg-[#1e222d] border border-[#2a2e39]">
              <div className="text-[11px] font-mono text-[#787b86] flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-[#089981]" /> Pricing Structure
              </div>
              <div className="text-2xl font-bold text-white font-mono mt-1">1-Time</div>
              <div className="text-[10px] text-[#089981] font-mono">Lifetime Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#2a2e39]">
          <div>
            <span className="text-xs font-mono uppercase text-[#2962ff] font-semibold">
              Curriculum Tracks
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Trading Masterclasses
            </h2>
            <p className="text-xs text-[#787b86] mt-1">
              In-depth syllabuses for Forex SMC, Prop firm evaluation, and Indian index options.
            </p>
          </div>
          <Link
            href="/courses"
            className="text-xs font-semibold text-[#2962ff] hover:underline flex items-center gap-1"
          >
            <span>View All Courses</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 3).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Payout Certificates Showcase */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#2a2e39]">
          <div>
            <span className="text-xs font-mono uppercase text-[#089981] font-semibold">
              Verifiable Proofs
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Funded Account Payout Certificates
            </h2>
            <p className="text-xs text-[#787b86] mt-1">
              Click any certificate below to inspect full resolution statements and references.
            </p>
          </div>
          <Link
            href="/certificates"
            className="text-xs font-semibold text-[#2962ff] hover:underline flex items-center gap-1"
          >
            <span>View Full Lightbox Gallery</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <CertificateGrid certificates={certificates} limit={3} />
      </section>

      {/* Trading Pillars */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-t border-[#2a2e39] pt-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-[#1e222d] border border-[#2a2e39] space-y-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#2962ff]/15 text-[#2962ff]">
              <BarChart2 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Smart Money Concepts</h3>
            <p className="text-xs text-[#787b86] leading-relaxed">
              Learn institutional order blocks, liquidity sweeps, fair value gaps (FVG), and order flow dynamics without lagging indicators.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#1e222d] border border-[#2a2e39] space-y-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#089981]/15 text-[#089981]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Prop Firm Funding Strategy</h3>
            <p className="text-xs text-[#787b86] leading-relaxed">
              Step-by-step algorithms designed to pass Phase 1 & 2 on FTMO, FundedNext, and protect daily drawdown buffers.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#1e222d] border border-[#2a2e39] space-y-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-amber-500/15 text-amber-400">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Razorpay Instant Access</h3>
            <p className="text-xs text-[#787b86] leading-relaxed">
              Pay securely with UPI, NetBanking, and Cards. Video access is unlocked immediately upon transaction confirmation.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-[#2a2e39] bg-[#1e222d] p-10 sm:p-14 text-center space-y-4">
          <h2 className="text-2xl sm:text-4xl font-bold text-white">
            Ready to Build a Consistent Trading Framework?
          </h2>
          <p className="text-xs sm:text-sm text-[#787b86] max-w-xl mx-auto leading-relaxed">
            Gain immediate access to complete course videos, trade execution checklists, and free preview lessons today.
          </p>
          <div className="pt-2">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#2962ff] hover:bg-[#1e53e5] text-white font-semibold text-xs uppercase tracking-wider shadow-md transition"
            >
              Get Started Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
