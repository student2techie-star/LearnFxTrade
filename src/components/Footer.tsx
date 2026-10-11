'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, ShieldAlert, Award, Phone, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400">
      {/* Top Footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 shadow-md">
                <TrendingUp className="h-5 w-5 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                LearnFx<span className="text-emerald-400">Trade</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering aspiring traders to master Institutional Forex Order Flow, Smart Money Concepts (SMC), and Indian Market Nifty/BankNifty Price Action with proven risk management.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <Award className="h-4 w-4" /> Verified Funded Prop Trader
              </span>
              <span>•</span>
              <span>100% Educational</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Education
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/courses" className="hover:text-emerald-400 transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/courses/forex-smart-money-concepts-mastery" className="hover:text-emerald-400 transition-colors">
                  Forex SMC Mastery
                </Link>
              </li>
              <li>
                <Link href="/courses/indian-market-options-price-action-pro" className="hover:text-emerald-400 transition-colors">
                  Nifty & BankNifty Pro
                </Link>
              </li>
              <li>
                <Link href="/certificates" className="hover:text-emerald-400 transition-colors">
                  Payout Proofs & Gallery
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">
                  Student Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Community */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Support & Community
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Help Desk & Contact
                </Link>
              </li>
              <li>
                <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1">
                  Telegram Channel <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1">
                  WhatsApp Support <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  Trading Track Record
                </Link>
              </li>
            </ul>
          </div>

          {/* Mandatory Legal & Razorpay Policy Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Legal & Compliance
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/legal/terms" className="hover:text-emerald-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/refund" className="hover:text-emerald-400 transition-colors font-medium text-slate-300">
                  Refund & Cancellation
                </Link>
              </li>
              <li>
                <Link href="/legal/disclaimer" className="hover:text-amber-400 transition-colors text-amber-400/90 font-medium">
                  Risk & SEBI Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Razorpay & SEBI Compliance Banner */}
        <div className="mt-12 rounded-2xl border border-amber-500/20 bg-amber-950/20 p-5 sm:p-6 backdrop-blur">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div className="text-xs leading-relaxed text-slate-300 space-y-1.5">
              <p className="font-semibold text-amber-400 uppercase tracking-wide">
                Regulatory Compliance & High-Risk Warning (SEBI & RBI Guidelines)
              </p>
              <p>
                Trading Foreign Exchange (Forex), CFD instruments, and Indian derivatives (Futures & Options) involves substantial risk of financial loss and is not suitable for all investors. Leveraged products carry high degree of risk to your capital. Past payout certificates and simulated performances are strictly for illustrative and educational proof and are NOT guarantees of future profits.
              </p>
              <p>
                <strong>Important Notice:</strong> We are NOT registered SEBI Investment Advisers (IA) or Research Analysts (RA). None of the content, video lessons, mentorship sessions, or Telegram posts constitute financial, legal, or investment advice or buy/sell recommendations. You trade solely at your own discretion.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between border-t border-slate-800/80 pt-8 text-xs text-slate-400">
          <p>© 2026 LearnFxTrade Academy. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              Razorpay Secured Gateway 256-Bit SSL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
