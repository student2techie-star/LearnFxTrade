import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import CourseCard from '@/components/CourseCard';
import CertificateGrid from '@/components/CertificateGrid';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Layers,
  CheckCircle,
  BarChart3,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  const courses = db.getCourses();
  const certificates = db.getCertificates();

  return (
    <div className="space-y-24 pb-24 bg-black text-[#ededed]">
      {/* Hero Section */}
      <section className="pt-16 sm:pt-24 border-b border-[#1c1c1c] pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2b2b2b] bg-[#0d0d0d] text-xs font-mono text-neutral-400">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            <span>INSTITUTIONAL SMC & INDIAN DERIVATIVES ACADEMY</span>
          </div>

          {/* Clean Main Title */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            Stop trading retail traps. <br />
            <span className="text-neutral-400">Trade pure order flow & liquidity.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            A battle-tested curriculum designed to master Forex Smart Money Concepts and Indian Index Options. Backed by verified prop firm payouts and strict mathematical risk control.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              href="/courses"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white text-black font-semibold text-xs tracking-wide hover:bg-neutral-200 transition flex items-center justify-center gap-2"
            >
              <span>Explore All Courses</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/certificates"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-white font-medium text-xs tracking-wide transition flex items-center justify-center gap-2"
            >
              <Award className="h-4 w-4 text-neutral-400" />
              <span>Inspect Payout Proofs</span>
            </Link>
          </div>

          {/* Clean Minimalist Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 border-t border-[#1c1c1c] max-w-3xl mx-auto text-left">
            <div>
              <div className="text-2xl font-bold text-white font-mono">$65,000+</div>
              <div className="text-xs text-neutral-500 mt-0.5">Prop Firm Payouts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-mono">1:3.5+</div>
              <div className="text-xs text-neutral-500 mt-0.5">Average R:R Ratio</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-mono">1,240+</div>
              <div className="text-xs text-neutral-500 mt-0.5">Trained Students</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-mono">Lifetime</div>
              <div className="text-xs text-neutral-500 mt-0.5">One-time Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#1c1c1c]">
          <div>
            <h2 className="text-2xl font-bold text-white">Curriculum & Masterclasses</h2>
            <p className="text-xs text-neutral-400 mt-1">
              Select a specialized track. Each curriculum includes free preview lessons.
            </p>
          </div>
          <Link
            href="/courses"
            className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1 group"
          >
            <span>View All</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 3).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Payout Certificates Section */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#1c1c1c]">
          <div>
            <h2 className="text-2xl font-bold text-white">Verified Payout Proofs</h2>
            <p className="text-xs text-neutral-400 mt-1">
              Transparent funded evaluation certificates and broker payouts from live accounts.
            </p>
          </div>
          <Link
            href="/certificates"
            className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1 group"
          >
            <span>Full Gallery</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <CertificateGrid certificates={certificates} limit={3} />
      </section>

      {/* Pillars Section */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 border-t border-[#1c1c1c] pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl border border-[#222222] bg-[#0a0a0a] space-y-3">
            <div className="text-xs font-mono text-neutral-500 font-bold uppercase">01 / Methodology</div>
            <h3 className="text-base font-bold text-white">Smart Money Concepts</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Trade liquidity pools, fair value gaps, and institutional accumulation rather than delayed indicators.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-[#222222] bg-[#0a0a0a] space-y-3">
            <div className="text-xs font-mono text-neutral-500 font-bold uppercase">02 / Execution</div>
            <h3 className="text-base font-bold text-white">Prop Firm Blueprint</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Pass FTMO and FundedNext phases with strict 0.5% max risk models and reproducible payout systems.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-[#222222] bg-[#0a0a0a] space-y-3">
            <div className="text-xs font-mono text-neutral-500 font-bold uppercase">03 / Security</div>
            <h3 className="text-base font-bold text-white">Instant Razorpay Checkout</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              UPI, Cards, and NetBanking with automated instant access and lifetime video stream availability.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#262626] bg-[#0a0a0a] p-10 sm:p-14 text-center space-y-5">
          <h2 className="text-3xl font-black text-white">Ready to elevate your trading execution?</h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto leading-relaxed">
            Enroll today to unlock full course lessons, execution checklists, and private community discussion.
          </p>
          <div className="pt-2">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-bold text-xs tracking-wide hover:bg-neutral-200 transition"
            >
              Get Started Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
