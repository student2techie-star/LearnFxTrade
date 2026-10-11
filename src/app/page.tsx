'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import CourseCard from '@/components/CourseCard';
import CertificateGrid from '@/components/CertificateGrid';
import TradingViewChartWidget from '@/components/TradingViewChartWidget';
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  BarChart2,
  Activity,
  Layers,
  Search,
  CheckCircle,
  Award,
  BookOpen,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  SlidersHorizontal,
  Flame,
  Globe,
  DollarSign
} from 'lucide-react';

export default function HomePage() {
  const courses = db.getCourses();
  const certificates = db.getCertificates();

  // Active Market Tab: Indices | Forex | Crypto | Commodities
  const [activeTab, setActiveTab] = useState<'indices' | 'forex' | 'commodities' | 'crypto'>('indices');
  const [activeSymbol, setActiveSymbol] = useState<string>('BSE:SENSEX');

  // TradingView Style Market Overview Data
  const marketTabs = [
    { id: 'indices', label: 'Indices India' },
    { id: 'forex', label: 'Forex Majors' },
    { id: 'commodities', label: 'Commodities' },
    { id: 'crypto', label: 'Crypto' },
  ] as const;

  const marketData = {
    indices: [
      { sym: 'NIFTY 50', tvSymbol: 'NSE:NIFTY', name: 'Nifty 50 Index', price: '25,014.60', chg: '+142.30', pct: '+0.57%', up: true, high: '25,080.00', low: '24,910.20' },
      { sym: 'BANKNIFTY', tvSymbol: 'NSE:BANKNIFTY', name: 'Nifty Bank Index', price: '51,532.10', chg: '+380.45', pct: '+0.74%', up: true, high: '51,680.00', low: '51,200.50' },
      { sym: 'SENSEX', tvSymbol: 'BSE:SENSEX', name: 'S&P BSE SENSEX', price: '81,721.24', chg: '+415.80', pct: '+0.51%', up: true, high: '81,900.10', low: '81,420.00' },
      { sym: 'FINNIFTY', tvSymbol: 'NSE:FINNIFTY', name: 'Nifty Financial Services', price: '23,890.15', chg: '+112.90', pct: '+0.47%', up: true, high: '23,940.00', low: '23,780.00' },
    ],
    forex: [
      { sym: 'EUR/USD', tvSymbol: 'FX:EURUSD', name: 'Euro / US Dollar', price: '1.08420', chg: '+0.00140', pct: '+0.13%', up: true, high: '1.08650', low: '1.08210' },
      { sym: 'GBP/USD', tvSymbol: 'FX:GBPUSD', name: 'British Pound / US Dollar', price: '1.29850', chg: '-0.00210', pct: '-0.16%', up: false, high: '1.30200', low: '1.29650' },
      { sym: 'USD/JPY', tvSymbol: 'FX:USDJPY', name: 'US Dollar / Japanese Yen', price: '152.450', chg: '+0.380', pct: '+0.25%', up: true, high: '152.800', low: '151.900' },
      { sym: 'USD/INR', tvSymbol: 'FX_IDC:USDINR', name: 'US Dollar / Indian Rupee', price: '84.0750', chg: '+0.035', pct: '+0.04%', up: true, high: '84.100', low: '84.020' },
    ],
    commodities: [
      { sym: 'GOLD', tvSymbol: 'TVC:GOLD', name: 'Gold Spot / US Dollar', price: '$2,736.40', chg: '+14.20', pct: '+0.52%', up: true, high: '2,745.00', low: '2,720.00' },
      { sym: 'SILVER', tvSymbol: 'TVC:SILVER', name: 'Silver Spot / US Dollar', price: '$33.85', chg: '+0.42', pct: '+1.25%', up: true, high: '34.10', low: '33.40' },
      { sym: 'CRUDE OIL', tvSymbol: 'TVC:USOIL', name: 'WTI Light Sweet Crude', price: '$71.40', chg: '-0.85', pct: '-1.18%', up: false, high: '72.60', low: '70.90' },
      { sym: 'NATURAL GAS', tvSymbol: 'TVC:NATGAS', name: 'Henry Hub Natural Gas', price: '$2.340', chg: '+0.045', pct: '+1.96%', up: true, high: '2.390', low: '2.280' },
    ],
    crypto: [
      { sym: 'BTC/USD', tvSymbol: 'BITSTAMP:BTCUSD', name: 'Bitcoin / US Dollar', price: '$67,840.00', chg: '+1,240.00', pct: '+1.86%', up: true, high: '68,200.00', low: '66,500.00' },
      { sym: 'ETH/USD', tvSymbol: 'BITSTAMP:ETHUSD', name: 'Ethereum / US Dollar', price: '$2,520.50', chg: '+48.20', pct: '+1.95%', up: true, high: '2,560.00', low: '2,460.00' },
      { sym: 'SOL/USD', tvSymbol: 'BINANCE:SOLUSD', name: 'Solana / US Dollar', price: '$176.40', chg: '+6.10', pct: '+3.58%', up: true, high: '179.00', low: '169.50' },
      { sym: 'BNB/USD', tvSymbol: 'BINANCE:BNBUSD', name: 'BNB / US Dollar', price: '$592.10', chg: '+4.50', pct: '+0.77%', up: true, high: '598.00', low: '585.00' },
    ]
  };

  const currentList = marketData[activeTab];

  // Community Trading Ideas (like TradingView Ideas Feed)
  const tradingIdeas = [
    {
      id: 'idea-1',
      title: 'BANKNIFTY 5-Min Liquidity Sweep & Bullish Order Block Target 52,200',
      author: 'Somnath (Head SMC Trader)',
      time: '2 hours ago',
      pair: 'NSE:BANKNIFTY',
      bias: 'Long',
      likes: 142,
      comments: 28,
      chartDesc: 'Clean buy-side liquidity (BSL) swept during the 9:45 AM London open confluence. Mitigation in 15M FVG triggered clean 1:3.8 R:R execution.'
    },
    {
      id: 'idea-2',
      title: 'EUR/USD Institutional Breaker Block Retest Before US Core PCE',
      author: 'LearnFx Institutional Desk',
      time: '4 hours ago',
      pair: 'FX:EURUSD',
      bias: 'Short',
      likes: 98,
      comments: 19,
      chartDesc: 'Premium PD-Array reached on H4 chart. Imbalance filled at 1.0870. Targeting Asian low liquidity pool at 1.0790.'
    },
    {
      id: 'idea-3',
      title: 'XAU/USD Gold ATH Push: Managing Risk with Trailing Parabolic SL',
      author: 'Prop Challenge Desk',
      time: '6 hours ago',
      pair: 'TVC:GOLD',
      bias: 'Long',
      likes: 215,
      comments: 42,
      chartDesc: 'Multi-timeframe fractals confirm institutional accumulation above $2,720 support. Funded challenge risk capped strictly at 0.5%.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#131722] text-[#d1d4dc] pb-24 space-y-12">
      {/* 1. TRADINGVIEW EXACT HERO & LIVE SEARCH COMMAND BAR */}
      <section className="relative pt-8 sm:pt-12 pb-10 border-b border-[#2a2e39] bg-gradient-to-b from-[#181d2a]/80 via-[#131722] to-[#131722]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-5">
            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1e222d] border border-[#2a2e39] text-xs font-semibold">
              <span className="flex h-2 w-2 rounded-full bg-[#089981] animate-pulse" />
              <span className="text-[#089981] font-mono">MARKETS LIVE</span>
              <span className="text-[#787b86]">•</span>
              <span className="text-[#d1d4dc]">Institutional SMC & Indian Price Action Hub</span>
            </div>

            {/* TradingView Heading typography */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
              Look first / Then leap. <br />
              <span className="text-[#2962ff]">Where India Charts & Trades with Edge.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#787b86] max-w-2xl mx-auto leading-relaxed">
              Master institutional Smart Money Concepts (SMC), Nifty/BankNifty Option buying, and funded prop firm risk rules with live charting, verified certificates, and structured video lessons.
            </p>

            {/* TradingView Centered Search Command Bar */}
            <div className="pt-2 max-w-2xl mx-auto">
              <div className="relative flex items-center w-full rounded-2xl bg-[#1e222d] border border-[#2a2e39] hover:border-[#2962ff] focus-within:border-[#2962ff] focus-within:ring-2 focus-within:ring-[#2962ff]/20 transition shadow-xl p-2">
                <Search className="h-5 w-5 text-[#787b86] ml-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Search symbols (NIFTY, BANKNIFTY, EURUSD) or SMC masterclasses..."
                  className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-[#787b86] focus:outline-none"
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

            {/* Popular quick ticker filters */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-[#787b86]">
              <span className="font-semibold text-[#d1d4dc]">Trending:</span>
              {[
                { name: 'NIFTY 50', tv: 'NSE:NIFTY' },
                { name: 'BANKNIFTY', tv: 'NSE:BANKNIFTY' },
                { name: 'GOLD', tv: 'TVC:GOLD' },
                { name: 'EUR/USD', tv: 'FX:EURUSD' },
                { name: 'FTMO Passed', tv: 'BSE:SENSEX' }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSymbol(item.tv)}
                  className="px-2.5 py-1 rounded-lg bg-[#1e222d] hover:bg-[#2a2e39] border border-[#2a2e39] text-[#d1d4dc] hover:text-[#2962ff] transition font-mono text-[11px]"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRADINGVIEW MARKET OVERVIEW TABS & LIVE TICKER CARDS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Navigation Tabs (Indices India, Forex Majors, Commodities, Crypto) */}
        <div className="flex items-center justify-between border-b border-[#2a2e39] pb-1 overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0">
            {marketTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#1e222d] text-white border border-[#2a2e39] shadow-sm'
                    : 'text-[#787b86] hover:text-white hover:bg-[#1e222d]/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-[#787b86]">
            <span className="flex h-2 w-2 rounded-full bg-[#089981]" />
            <span>Interactive Chart Sync</span>
          </div>
        </div>

        {/* Dense Market Ticker Grid (TradingView Style Snapshot Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentList.map((item) => {
            const isSelected = activeSymbol === item.tvSymbol;
            return (
              <div
                key={item.sym}
                onClick={() => setActiveSymbol(item.tvSymbol)}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-[#1e222d] border-[#2962ff] shadow-lg shadow-[#2962ff]/10'
                    : 'bg-[#1e222d] border-[#2a2e39] hover:border-[#363a45] hover:bg-[#242835]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm text-white tracking-wide">{item.sym}</span>
                  <span
                    className={`inline-flex items-center text-xs font-bold font-mono px-2 py-0.5 rounded ${
                      item.up ? 'bg-[#089981]/15 text-[#089981]' : 'bg-[#f23645]/15 text-[#f23645]'
                    }`}
                  >
                    {item.up ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {item.pct}
                  </span>
                </div>

                <div className="text-[11px] text-[#787b86] truncate mt-0.5">{item.name}</div>

                <div className="flex items-baseline justify-between mt-3">
                  <div className="text-xl font-black text-white font-mono">{item.price}</div>
                  <div className={`text-xs font-mono font-semibold ${item.up ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                    {item.chg}
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-[#2a2e39] flex items-center justify-between text-[10px] text-[#787b86] font-mono">
                  <span>H: {item.high}</span>
                  <span>L: {item.low}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. TRADINGVIEW REAL ADVANCED DARK CHART EMBED */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs px-1">
            <div className="flex items-center gap-2 text-[#d1d4dc]">
              <span className="font-bold text-white uppercase tracking-wider">Active Analysis:</span>
              <span className="font-mono text-[#2962ff] font-bold bg-[#1e222d] px-2.5 py-0.5 rounded border border-[#2a2e39]">
                {activeSymbol}
              </span>
            </div>
            <span className="text-[#787b86] text-[11px]">Powered by TradingView Technology</span>
          </div>

          <TradingViewChartWidget symbol={activeSymbol} height={520} />
        </div>
      </section>

      {/* 4. TRADINGVIEW COMMUNITY IDEAS & SMC SETUP BREAKDOWNS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between pb-3 border-b border-[#2a2e39]">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-[#2962ff]" />
              <span className="text-xs font-bold uppercase text-[#2962ff] tracking-wider">TradingView Community Ideas</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Top Institutional Market Breakdowns
            </h2>
          </div>
          <Link
            href="/courses"
            className="text-xs font-bold text-[#2962ff] hover:underline flex items-center gap-1"
          >
            <span>Learn these setups</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tradingIdeas.map((idea) => (
            <div
              key={idea.id}
              className="tv-dark-card p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#2962ff] bg-[#1e222d] px-2 py-0.5 rounded border border-[#2a2e39]">
                    {idea.pair}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      idea.bias === 'Long' ? 'bg-[#089981]/15 text-[#089981]' : 'bg-[#f23645]/15 text-[#f23645]'
                    }`}
                  >
                    {idea.bias} Setup
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                  {idea.title}
                </h3>

                <p className="text-xs text-[#787b86] line-clamp-3 leading-relaxed">
                  {idea.chartDesc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#2a2e39] flex items-center justify-between text-xs text-[#787b86]">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-[#2962ff] text-white flex items-center justify-center font-bold text-[10px]">
                    {idea.author.charAt(0)}
                  </div>
                  <span className="truncate text-[11px] font-semibold text-[#d1d4dc]">{idea.author}</span>
                </div>
                <span className="text-[10px] shrink-0">{idea.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. POPULAR TRADING MASTERCLASSES (CURRICULUM IN TRADINGVIEW DARK CARDS) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between pb-3 border-b border-[#2a2e39]">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#2962ff]" />
              <span className="text-xs font-bold uppercase text-[#2962ff] tracking-wider">Trading Masterclasses</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Institutional Courses & Syllabi
            </h2>
          </div>
          <Link
            href="/courses"
            className="text-xs font-bold text-[#2962ff] hover:underline flex items-center gap-1"
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

      {/* 6. SOCIAL PROOF & VERIFIED PAYOUT CERTIFICATES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between pb-3 border-b border-[#2a2e39]">
          <div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-[#089981]" />
              <span className="text-xs font-bold uppercase text-[#089981] tracking-wider">Verified Proof</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Prop Firm Payouts & Funded Statements
            </h2>
          </div>
          <Link
            href="/certificates"
            className="text-xs font-bold text-[#2962ff] hover:underline flex items-center gap-1"
          >
            <span>Inspect All Proofs</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <CertificateGrid certificates={certificates} limit={3} />
      </section>

      {/* 7. TRADINGVIEW BOTTOM STATS & TRUST STRIP */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#1e222d] border border-[#2a2e39]">
          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#787b86]">Total Payouts</div>
            <div className="text-2xl font-black text-white font-mono">$65,000+</div>
            <div className="text-xs text-[#089981] font-semibold">FTMO & FundedNext</div>
          </div>
          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#787b86]">Trade Execution R:R</div>
            <div className="text-2xl font-black text-[#2962ff] font-mono">1:3.5+</div>
            <div className="text-xs text-[#787b86]">Smart Money Confluence</div>
          </div>
          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#787b86]">Active Students</div>
            <div className="text-2xl font-black text-white font-mono">1,240+</div>
            <div className="text-xs text-[#787b86]">Pan-India & Overseas</div>
          </div>
          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#787b86]">Razorpay Payments</div>
            <div className="text-2xl font-black text-[#089981] font-mono">Instant</div>
            <div className="text-xs text-[#787b86]">UPI & Card Access</div>
          </div>
        </div>
      </section>
    </div>
  );
}
