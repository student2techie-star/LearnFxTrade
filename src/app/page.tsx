'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import CourseCard from '@/components/CourseCard';
import CertificateGrid from '@/components/CertificateGrid';
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Search,
  Award,
  BookOpen,
  ChevronRight,
  Flame,
  CheckCircle,
  ShieldCheck,
  Zap,
  BarChart2
} from 'lucide-react';

export default function HomePage() {
  const courses = db.getCourses();
  const certificates = db.getCertificates();

  // Active Market Tab: Indices | Forex | Commodities | Crypto
  const [activeTab, setActiveTab] = useState<'indices' | 'forex' | 'commodities' | 'crypto'>('indices');

  // Market Snapshot Data
  const marketTabs = [
    { id: 'indices', label: 'Indices India' },
    { id: 'forex', label: 'Forex Majors' },
    { id: 'commodities', label: 'Commodities' },
    { id: 'crypto', label: 'Crypto' },
  ] as const;

  const marketData = {
    indices: [
      { sym: 'NIFTY 50', name: 'Nifty 50 Index', price: '25,014.60', chg: '+142.30', pct: '+0.57%', up: true, high: '25,080.00', low: '24,910.20' },
      { sym: 'BANKNIFTY', name: 'Nifty Bank Index', price: '51,532.10', chg: '+380.45', pct: '+0.74%', up: true, high: '51,680.00', low: '51,200.50' },
      { sym: 'SENSEX', name: 'S&P BSE SENSEX', price: '81,721.24', chg: '+415.80', pct: '+0.51%', up: true, high: '81,900.10', low: '81,420.00' },
      { sym: 'FINNIFTY', name: 'Nifty Financial Services', price: '23,890.15', chg: '+112.90', pct: '+0.47%', up: true, high: '23,940.00', low: '23,780.00' },
    ],
    forex: [
      { sym: 'EUR/USD', name: 'Euro / US Dollar', price: '1.08420', chg: '+0.00140', pct: '+0.13%', up: true, high: '1.08650', low: '1.08210' },
      { sym: 'GBP/USD', name: 'British Pound / US Dollar', price: '1.29850', chg: '-0.00210', pct: '-0.16%', up: false, high: '1.30200', low: '1.29650' },
      { sym: 'USD/JPY', name: 'US Dollar / Japanese Yen', price: '152.450', chg: '+0.380', pct: '+0.25%', up: true, high: '152.800', low: '151.900' },
      { sym: 'USD/INR', name: 'US Dollar / Indian Rupee', price: '84.0750', chg: '+0.035', pct: '+0.04%', up: true, high: '84.100', low: '84.020' },
    ],
    commodities: [
      { sym: 'GOLD', name: 'Gold Spot / US Dollar', price: '$2,736.40', chg: '+14.20', pct: '+0.52%', up: true, high: '2,745.00', low: '2,720.00' },
      { sym: 'SILVER', name: 'Silver Spot / US Dollar', price: '$33.85', chg: '+0.42', pct: '+1.25%', up: true, high: '34.10', low: '33.40' },
      { sym: 'CRUDE OIL', name: 'WTI Light Sweet Crude', price: '$71.40', chg: '-0.85', pct: '-1.18%', up: false, high: '72.60', low: '70.90' },
      { sym: 'NATURAL GAS', name: 'Henry Hub Natural Gas', price: '$2.340', chg: '+0.045', pct: '+1.96%', up: true, high: '2.390', low: '2.280' },
    ],
    crypto: [
      { sym: 'BTC/USD', name: 'Bitcoin / US Dollar', price: '$67,840.00', chg: '+1,240.00', pct: '+1.86%', up: true, high: '68,200.00', low: '66,500.00' },
      { sym: 'ETH/USD', name: 'Ethereum / US Dollar', price: '$2,520.50', chg: '+48.20', pct: '+1.95%', up: true, high: '2,560.00', low: '2,460.00' },
      { sym: 'SOL/USD', name: 'Solana / US Dollar', price: '$176.40', chg: '+6.10', pct: '+3.58%', up: true, high: '179.00', low: '169.50' },
      { sym: 'BNB/USD', name: 'BNB / US Dollar', price: '$592.10', chg: '+4.50', pct: '+0.77%', up: true, high: '598.00', low: '585.00' },
    ]
  };

  const currentList = marketData[activeTab];

  // Community Trading Setups Feed
  const tradingIdeas = [
    {
      id: 'idea-1',
      title: 'BANKNIFTY 5-Min Liquidity Sweep & Bullish Order Block Target 52,200',
      author: 'Somnath (Head SMC Trader)',
      time: '2 hours ago',
      pair: 'NSE:BANKNIFTY',
      bias: 'Long',
      chartDesc: 'Clean buy-side liquidity swept during London open confluence. Mitigation in 15M FVG triggered clean 1:3.8 R:R trade.'
    },
    {
      id: 'idea-2',
      title: 'EUR/USD Institutional Breaker Block Retest Before US Core PCE',
      author: 'LearnFx Institutional Desk',
      time: '4 hours ago',
      pair: 'FX:EURUSD',
      bias: 'Short',
      chartDesc: 'Premium PD-Array reached on H4 chart. Imbalance filled at 1.0870. Targeting Asian low liquidity pool at 1.0790.'
    },
    {
      id: 'idea-3',
      title: 'XAU/USD Gold ATH Push: Managing Risk with Trailing Parabolic SL',
      author: 'Prop Challenge Desk',
      time: '6 hours ago',
      pair: 'TVC:GOLD',
      bias: 'Long',
      chartDesc: 'Multi-timeframe fractals confirm institutional accumulation above $2,720 support. Funded challenge risk capped strictly at 0.5%.'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-24 space-y-12">
      {/* 1. HERO & LIVE SEARCH COMMAND BAR */}
      <section className="relative pt-10 sm:pt-14 pb-12 border-b border-[#222222] bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-5">
            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111111] border border-[#222222] text-xs font-semibold">
              <span className="flex h-2 w-2 rounded-full bg-[#089981] animate-pulse" />
              <span className="text-[#089981] font-mono">LIVE MARKETS</span>
              <span className="text-[#a1a1aa]">•</span>
              <span className="text-white">Smart Money Concepts & Indian Options</span>
            </div>

            {/* Pure Black & White Hero Typography */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
              Look first / Then leap. <br />
              <span className="text-[#10b981]">Where India Learns & Trades with True Edge.</span>
            </h1>

            <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
              Master institutional Smart Money Concepts (SMC), Nifty/BankNifty Option buying, and funded prop firm risk frameworks with verified payout proofs and HD structured video lessons.
            </p>

            {/* Centered Search Command Bar */}
            <div className="pt-2 max-w-2xl mx-auto">
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
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-white">
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
        </div>
      </section>

      {/* 2. MARKET OVERVIEW TABS & DENSE TICKER CARDS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-[#222222] pb-1 overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0">
            {marketTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#1c1c1c] text-white border border-[#333333] shadow-sm'
                    : 'text-white/60 hover:text-white hover:bg-[#111111]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-white/70">
            <span className="flex h-2 w-2 rounded-full bg-[#089981]" />
            <span>Market Live Feed</span>
          </div>
        </div>

        {/* Ticker Cards in Pure Black Surfaces */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentList.map((item) => (
            <div
              key={item.sym}
              className="p-4 rounded-xl bg-[#111111] border border-[#222222] hover:border-[#333333] hover:bg-[#161616] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-white tracking-wide">{item.sym}</span>
                <span
                  className={`inline-flex items-center text-xs font-bold font-mono px-2 py-0.5 rounded ${
                    item.up ? 'bg-[#089981]/20 text-[#089981]' : 'bg-[#f23645]/20 text-[#f23645]'
                  }`}
                >
                  {item.up ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {item.pct}
                </span>
              </div>

              <div className="text-[11px] text-white/70 truncate mt-0.5">{item.name}</div>

              <div className="flex items-baseline justify-between mt-3">
                <div className="text-xl font-black text-white font-mono">{item.price}</div>
                <div className={`text-xs font-mono font-semibold ${item.up ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                  {item.chg}
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-[#222222] flex items-center justify-between text-[10px] text-white/60 font-mono">
                <span>H: {item.high}</span>
                <span>L: {item.low}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TRADING MASTERCLASSES (CURRICULUM IN PURE BLACK CARDS) */}
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

      {/* 5. COMMUNITY SETUPS FEED */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between pb-3 border-b border-[#222222]">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-[#10b981]" />
              <span className="text-xs font-bold uppercase text-[#10b981] tracking-wider">Trade Setups Feed</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Institutional SMC Setups & Case Studies
            </h2>
          </div>
          <Link
            href="/courses"
            className="text-xs font-bold text-[#10b981] hover:underline flex items-center gap-1"
          >
            <span>Learn these strategies</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tradingIdeas.map((idea) => (
            <div
              key={idea.id}
              className="tv-dark-card p-5 flex flex-col justify-between space-y-4 bg-[#111111] border border-[#222222]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#10b981] bg-black px-2 py-0.5 rounded border border-[#222222]">
                    {idea.pair}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      idea.bias === 'Long' ? 'bg-[#10b981]/20 text-[#10b981]' : 'bg-[#f23645]/20 text-[#f23645]'
                    }`}
                  >
                    {idea.bias} Setup
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                  {idea.title}
                </h3>

                <p className="text-xs text-white/75 line-clamp-3 leading-relaxed">
                  {idea.chartDesc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#222222] flex items-center justify-between text-xs text-white/60">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-[#10b981] text-black flex items-center justify-center font-bold text-[10px]">
                    {idea.author.charAt(0)}
                  </div>
                  <span className="truncate text-[11px] font-semibold text-white">{idea.author}</span>
                </div>
                <span className="text-[10px] shrink-0 text-white/60">{idea.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TRUST & VERIFIED STATS STRIP */}
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
