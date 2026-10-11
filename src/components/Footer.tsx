import React from 'react';
import Link from 'next/link';
import { TrendingUp, ShieldAlert, Award, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#222222] bg-black text-[#a1a1aa]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2962ff] text-white font-black shadow-sm">
                <TrendingUp className="h-4 w-4 stroke-[3]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                LearnFx<span className="text-[#2962ff]">Trade</span> India
              </span>
            </Link>
            <p className="text-sm text-[#787b86] leading-relaxed max-w-sm">
              Empowering Indian and global traders to master Institutional Forex Order Flow, Smart Money Concepts (SMC), and Nifty/BankNifty Price Action with proven risk management.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#d1d4dc]">
              <span className="text-[#089981]">● Verified Funded Prop Trader</span>
              <span>•</span>
              <span>100% Educational</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Curriculum
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/courses" className="hover:text-[#2962ff] transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/courses/forex-smart-money-concepts-mastery" className="hover:text-[#2962ff] transition-colors">
                  Forex SMC Mastery
                </Link>
              </li>
              <li>
                <Link href="/courses/indian-market-options-price-action-pro" className="hover:text-[#2962ff] transition-colors">
                  Nifty & BankNifty Pro
                </Link>
              </li>
              <li>
                <Link href="/certificates" className="hover:text-[#2962ff] transition-colors">
                  Payout Proofs Gallery
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#2962ff] transition-colors">
                  Student Classroom
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Support & Community
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/contact" className="hover:text-[#2962ff] transition-colors">
                  Help Desk & Contact
                </Link>
              </li>
              <li>
                <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="hover:text-[#2962ff] transition-colors inline-flex items-center gap-1">
                  Telegram Channel <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="hover:text-[#2962ff] transition-colors inline-flex items-center gap-1">
                  WhatsApp Support <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#2962ff] transition-colors">
                  Trading Track Record
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Legal & Compliance
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/legal/terms" className="hover:text-[#2962ff] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="hover:text-[#2962ff] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/refund" className="hover:text-[#2962ff] transition-colors">
                  Refund & Cancellation
                </Link>
              </li>
              <li>
                <Link href="/legal/disclaimer" className="hover:text-amber-400 transition-colors font-medium">
                  Risk & SEBI Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimer Box */}
        <div className="mt-12 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div className="text-xs leading-relaxed text-[#787b86] space-y-1">
              <p className="font-bold text-amber-400 uppercase tracking-wide">
                Regulatory Compliance Notice (SEBI & RBI Guidelines)
              </p>
              <p>
                Trading Foreign Exchange (Forex), CFD instruments, and Indian derivatives (Futures & Options) involves substantial risk of loss and is not suitable for all investors. Past payout certificates and simulated performances are strictly for illustrative and educational proof and are NOT guarantees of future profits.
              </p>
              <p>
                We are <strong>NOT registered SEBI Investment Advisers (IA) or Research Analysts (RA)</strong>. None of the content, video lessons, mentorship sessions, or Telegram posts constitute financial advice or trade calls.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between border-t border-[#2a2e39] pt-8 text-xs text-[#787b86]">
          <p>© 2026 LearnFxTrade India. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#089981]"></span>
              Razorpay Secured Gateway 256-Bit SSL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
