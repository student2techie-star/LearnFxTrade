import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import CourseCard from '@/components/CourseCard';
import CertificateGrid from '@/components/CertificateGrid';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Search,
  TrendingUp,
  BarChart2,
  CheckCircle2,
  Globe,
  SlidersHorizontal,
  Zap,
} from 'lucide-react';

export default function HomePage() {
  const courses = db.getCourses();
  const certificates = db.getCertificates();

  return (
    <div className="space-y-20 pb-24 bg-white text-[#131722]">
      {/* TradingView India Hero Section */}
      <section className="pt-14 sm:pt-20 border-b border-[#e0e3eb] pb-20 bg-gradient-to-b from-[#f8f9fd] to-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8eefd] text-[#2962ff] text-xs font-semibold">
            <span className="flex h-2 w-2 rounded-full bg-[#2962ff] animate-pulse" />
            <span>TradingView Powered Smart Money & Indian Market Academy</span>
          </div>

          {/* Main Title inspired by TradingView India */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#131722] leading-[1.12]">
            Where India Charts, Learns & <br className="hidden sm:inline" />
            <span className="text-[#2962ff]">Trades With True Edge.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#787b86] max-w-2xl mx-auto leading-relaxed">
            Stop guessing support & resistance. Master institutional liquidity pools, Fair Value Gaps (FVG), and Nifty/BankNifty Option buying with verified prop firm payout proofs.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="/courses"
              className="tv-btn-primary w-full sm:w-auto px-8 py-3.5 text-sm font-semibold shadow-md flex items-center justify-center gap-2"
            >
              <span>Explore Masterclasses</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/certificates"
              className="tv-btn-secondary w-full sm:w-auto px-8 py-3.5 text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Award className="h-4 w-4 text-amber-500" />
              <span>Inspect Payout Proofs</span>
            </Link>
          </div>

          {/* Market Chips (TradingView Style Quick Tabs) */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {['Nifty 50 Options', 'BankNifty Scalping', 'Forex EUR/USD SMC', 'Gold XAU/USD', 'FTMO Prop Passed', 'FundedNext Payouts'].map((chip, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-full bg-white border border-[#e0e3eb] text-xs font-semibold text-[#131722] shadow-xs hover:border-[#2962ff] hover:text-[#2962ff] transition cursor-pointer"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Key Stats Strip */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8 rounded-2xl bg-[#f8f9fd] border border-[#e0e3eb]">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#787b86]">Total Payouts Passed</div>
            <div className="text-3xl font-black text-[#131722] mt-1">$65,000+</div>
            <div className="text-xs text-[#089981] font-semibold mt-0.5">Verified Prop Receipts</div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#787b86]">Average Setup R:R</div>
            <div className="text-3xl font-black text-[#2962ff] mt-1">1:3.5+</div>
            <div className="text-xs text-[#787b86] mt-0.5">Institutional Confluence</div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#787b86]">Students Enrolled</div>
            <div className="text-3xl font-black text-[#131722] mt-1">1,240+</div>
            <div className="text-xs text-[#787b86] mt-0.5">Pan-India & Overseas</div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#787b86]">Pricing Model</div>
            <div className="text-3xl font-black text-[#089981] mt-1">1-Time</div>
            <div className="text-xs text-[#787b86] mt-0.5">Lifetime Video Access</div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#e0e3eb]">
          <div>
            <span className="text-xs font-bold uppercase text-[#2962ff] tracking-wider">Curriculum</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#131722] mt-1">
              Popular Trading Masterclasses
            </h2>
            <p className="text-sm text-[#787b86] mt-1">
              Select your market track. Each curriculum includes free preview lectures.
            </p>
          </div>
          <Link
            href="/courses"
            className="text-sm font-bold text-[#2962ff] hover:underline flex items-center gap-1 group"
          >
            <span>See all courses</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.slice(0, 3).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Social Proof: Payout Certificates */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#e0e3eb]">
          <div>
            <span className="text-xs font-bold uppercase text-[#089981] tracking-wider">Social Proof</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#131722] mt-1">
              Verified Payout Certificates & Statements
            </h2>
            <p className="text-sm text-[#787b86] mt-1">
              Click any certificate below to view the high-resolution statement with verification references.
            </p>
          </div>
          <Link
            href="/certificates"
            className="text-sm font-bold text-[#2962ff] hover:underline flex items-center gap-1 group"
          >
            <span>View all payout proofs</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <CertificateGrid certificates={certificates} limit={3} />
      </section>

      {/* Why Choose LearnFxTrade Pillars */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-t border-[#e0e3eb] pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-[#f8f9fd] border border-[#e0e3eb] space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#2962ff] shadow-sm font-bold border border-[#e0e3eb]">
              <BarChart2 className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-[#131722]">Institutional Smart Money</h3>
            <p className="text-sm text-[#787b86] leading-relaxed">
              Understand where real market volume enters. Identify order blocks, fair value gaps, and stop runs before retail indicators trigger.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#f8f9fd] border border-[#e0e3eb] space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#089981] shadow-sm font-bold border border-[#e0e3eb]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-[#131722]">Prop Firm Funding Blueprint</h3>
            <p className="text-sm text-[#787b86] leading-relaxed">
              Learn the exact 0.5% risk management formula used to pass FTMO and FundedNext evaluations without touching max drawdown.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#f8f9fd] border border-[#e0e3eb] space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-amber-500 shadow-sm font-bold border border-[#e0e3eb]">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-[#131722]">Instant Razorpay Access</h3>
            <p className="text-sm text-[#787b86] leading-relaxed">
              Pay with any Indian UPI app (GPay, PhonePe, Paytm), debit/credit cards, or netbanking. Access unlocks immediately.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#131722] text-white p-10 sm:p-16 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black max-w-2xl mx-auto leading-tight">
            Ready to trade with true institutional discipline?
          </h2>
          <p className="text-sm sm:text-base text-[#d1d4dc] max-w-xl mx-auto leading-relaxed">
            Gain immediate access to all video lessons, execution checklists, and free preview lectures.
          </p>
          <div className="pt-2">
            <Link
              href="/courses"
              className="tv-btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold shadow-lg hover:scale-105 transition"
            >
              Get Started Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
