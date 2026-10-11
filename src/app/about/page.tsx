import React from 'react';
import { Award, TrendingUp, CheckCircle, ShieldCheck, BarChart2, Globe } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 space-y-16 pb-24">
      {/* Bio Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
          The Trader Behind LearnFxTrade
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white">
          Meet Your Mentor & Lead Trader
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          From retail indicators to systematic institutional order flow and prop firm funded payouts. Here is the real story and the vision behind LearnFxTrade.
        </p>
      </div>

      {/* Main Story & Approach */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <h2 className="text-2xl font-bold text-white">
            The Journey: From Blowing Accounts to Consistent Payouts
          </h2>
          <p>
            Like most retail traders, I started trading with standard retail indicators — MACD crossovers, RSI overbought/oversold levels, and chart patterns. After losing multiple accounts, I realized that retail indicators are lagging and designed to lure liquidity for institutional algorithms.
          </p>
          <p>
            The turning point came when I dissected <strong className="text-emerald-400">Institutional Order Flow</strong>, liquidity manipulation, and Fair Value Gaps (FVG). Applying strict 1:3 risk-to-reward parameters allowed me to pass multiple 6-figure funded challenges across FTMO, FundedNext, and Alpha Capital.
          </p>
          <p>
            LearnFxTrade was founded to eliminate the fluff and provide Indian and global traders with real, no-BS trading education backed by verifiable payout statements.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-emerald-400" /> Markets Traded Actively
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-emerald-400 uppercase">1. Global Forex & Commodities</span>
              <p className="text-xs text-slate-400">
                EUR/USD, GBP/JPY, and Gold (XAU/USD). Specializing in London & New York session liquidity sweeps.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-cyan-400 uppercase">2. Indian Index Derivatives</span>
              <p className="text-xs text-slate-400">
                Nifty 50 and BankNifty intraday options trading using CPR, CPR virgin tests, and institutional Open Interest (OI) divergence.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase">3. Prop Firm Scaling</span>
              <p className="text-xs text-slate-400">
                Managing funded capital using dynamic 0.5% lot sizing and mathematical drawdown preservation buffers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Philosophies */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-800">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 font-bold">
            1
          </div>
          <h4 className="text-base font-bold text-white">Risk Before Reward</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Profits are a byproduct of capital preservation. We never risk more than 0.5% to 1% per setup.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 font-bold">
            2
          </div>
          <h4 className="text-base font-bold text-white">No False Promises</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            We never promise get-rich-quick returns. Trading is an intellectual profession requiring rigorous backtesting and emotional control.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 font-bold">
            3
          </div>
          <h4 className="text-base font-bold text-white">Pure Education</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            We do not sell tips or advisory calls. We empower you to read naked charts independently without relying on anyone.
          </p>
        </div>
      </div>

      {/* Action CTA */}
      <div className="text-center pt-8">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-emerald-500/25 transition"
        >
          View Masterclass Syllabus
        </Link>
      </div>
    </div>
  );
}
