'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Zap,
  DollarSign,
  Layers,
  ChevronDown,
  Info,
  Check,
} from 'lucide-react';

interface PairInfo {
  name: string;
  category: 'Majors' | 'Minors' | 'Metals' | 'Crypto';
  pipDecimalPlaces: number;
  pipSize: number;
  pipValuePerLotUsd: number; // For 100,000 standard lot
  contractSize: number;
  defaultPrice: number;
}

const POPULAR_PAIRS: Record<string, PairInfo> = {
  'EURUSD': { name: 'EUR/USD', category: 'Majors', pipDecimalPlaces: 4, pipSize: 0.0001, pipValuePerLotUsd: 10.00, contractSize: 100000, defaultPrice: 1.0850 },
  'GBPUSD': { name: 'GBP/USD', category: 'Majors', pipDecimalPlaces: 4, pipSize: 0.0001, pipValuePerLotUsd: 10.00, contractSize: 100000, defaultPrice: 1.2950 },
  'USDJPY': { name: 'USD/JPY', category: 'Majors', pipDecimalPlaces: 2, pipSize: 0.01, pipValuePerLotUsd: 6.65, contractSize: 100000, defaultPrice: 152.40 },
  'USDCHF': { name: 'USD/CHF', category: 'Majors', pipDecimalPlaces: 4, pipSize: 0.0001, pipValuePerLotUsd: 11.20, contractSize: 100000, defaultPrice: 0.8920 },
  'USDCAD': { name: 'USD/CAD', category: 'Majors', pipDecimalPlaces: 4, pipSize: 0.0001, pipValuePerLotUsd: 7.25, contractSize: 100000, defaultPrice: 1.3820 },
  'AUDUSD': { name: 'AUD/USD', category: 'Majors', pipDecimalPlaces: 4, pipSize: 0.0001, pipValuePerLotUsd: 10.00, contractSize: 100000, defaultPrice: 0.6550 },
  'NZDUSD': { name: 'NZD/USD', category: 'Majors', pipDecimalPlaces: 4, pipSize: 0.0001, pipValuePerLotUsd: 10.00, contractSize: 100000, defaultPrice: 0.5980 },
  'GBPJPY': { name: 'GBP/JPY', category: 'Minors', pipDecimalPlaces: 2, pipSize: 0.01, pipValuePerLotUsd: 6.65, contractSize: 100000, defaultPrice: 197.50 },
  'EURJPY': { name: 'EUR/JPY', category: 'Minors', pipDecimalPlaces: 2, pipSize: 0.01, pipValuePerLotUsd: 6.65, contractSize: 100000, defaultPrice: 165.20 },
  'EURGBP': { name: 'EUR/GBP', category: 'Minors', pipDecimalPlaces: 4, pipSize: 0.0001, pipValuePerLotUsd: 12.95, contractSize: 100000, defaultPrice: 0.8380 },
  'XAUUSD': { name: 'XAU/USD (Gold)', category: 'Metals', pipDecimalPlaces: 2, pipSize: 0.01, pipValuePerLotUsd: 10.00, contractSize: 100, defaultPrice: 2735.50 },
  'BTCUSD': { name: 'BTC/USD (Bitcoin)', category: 'Crypto', pipDecimalPlaces: 2, pipSize: 1.00, pipValuePerLotUsd: 1.00, contractSize: 1, defaultPrice: 68500.00 },
};

const ACCOUNT_CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD'];

export default function ForexLotCalculatorPage() {
  // Inputs matching https://forex-lot-size-calculator.com/
  const [accountCurrency, setAccountCurrency] = useState<string>('USD');
  const [currencyPair, setCurrencyPair] = useState<string>('EURUSD');
  const [accountBalance, setAccountBalance] = useState<number>(10000);
  
  // Toggle: Risk in % vs Risk in USD ($)
  const [riskType, setRiskType] = useState<'percent' | 'cash'>('percent');
  const [riskPercent, setRiskPercent] = useState<number>(1);
  const [riskCash, setRiskCash] = useState<number>(100);

  // Toggle: Stop Loss in Pips vs Open Price / SL Price
  const [stopLossType, setStopLossType] = useState<'pips' | 'price'>('pips');
  const [stopLossPips, setStopLossPips] = useState<number>(20);
  const [openPrice, setOpenPrice] = useState<number>(1.0850);
  const [stopLossPrice, setStopLossPrice] = useState<number>(1.0830);

  // Take Profit (Optional Target)
  const [takeProfitPips, setTakeProfitPips] = useState<number>(60);

  // Selected pair config
  const pair = POPULAR_PAIRS[currencyPair] || POPULAR_PAIRS['EURUSD'];

  // 1. Calculate Risk Amount ($ USD / Base)
  const effectiveRiskAmount = riskType === 'percent'
    ? (accountBalance * (riskPercent / 100))
    : riskCash;

  // 2. Calculate Effective SL in Pips
  let effectivePips = stopLossPips;
  if (stopLossType === 'price') {
    const diff = Math.abs(openPrice - stopLossPrice);
    effectivePips = pair.pipSize > 0 ? Number((diff / pair.pipSize).toFixed(1)) : 20;
  }

  // 3. Pip Value per Standard Lot
  const pipValuePerStandardLot = pair.pipValuePerLotUsd;

  // 4. Position Sizing
  // Standard Lots = Risk ($) / (SL Pips * Pip Value per Lot)
  const standardLots = (effectivePips > 0 && pipValuePerStandardLot > 0)
    ? (effectiveRiskAmount / (effectivePips * pipValuePerStandardLot))
    : 0;

  const miniLots = standardLots * 10;
  const microLots = standardLots * 100;
  const units = Math.round(standardLots * pair.contractSize);

  // Pip value of this resulting position
  const positionPipValue = standardLots * pipValuePerStandardLot;

  // Take Profit potential gain
  const potentialReward = positionPipValue * takeProfitPips;
  const riskRewardRatio = effectivePips > 0 ? (takeProfitPips / effectivePips).toFixed(2) : '0.00';

  // Handle Preset balance
  const setPresetBalance = (bal: number) => {
    setAccountBalance(bal);
    if (riskType === 'cash') {
      setRiskCash(bal * (riskPercent / 100));
    }
  };

  const handlePercentChange = (val: number) => {
    setRiskPercent(val);
    setRiskCash(Number((accountBalance * (val / 100)).toFixed(2)));
  };

  const handleCashChange = (val: number) => {
    setRiskCash(val);
    if (accountBalance > 0) {
      setRiskPercent(Number(((val / accountBalance) * 100).toFixed(2)));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#10b981] selection:text-black pb-24">
      {/* 1. TOP HERO */}
      <section className="relative overflow-hidden border-b border-[#222222] bg-gradient-to-b from-[#0a0a0a] to-black py-14 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 px-4 py-1.5 text-xs font-bold text-[#10b981]">
            <Calculator className="h-4 w-4" />
            <span>Forex Lot Size & Risk Calculator</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Calculate Optimal <span className="text-[#10b981]">Forex Lot Sizes</span>
          </h1>

          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
            Determine your exact position size in Standard, Mini, and Micro lots based on your account currency, risk amount in USD or %, and stop-loss level in pips or price.
          </p>
        </div>
      </section>

      {/* 2. DUAL CARD CALCULATOR WORKSPACE */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: INPUTS FORM (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-[#222222] bg-[#0c0c0e] p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1c1c1f] pb-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#10b981]" /> Trade Parameters
              </h2>
              <span className="text-xs font-mono font-bold text-emerald-400">
                Live Lot Calculator
              </span>
            </div>

            {/* Currency Pair & Account Currency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#d1d4dc]">
                  Instrument / Currency Pair
                </label>
                <div className="relative">
                  <select
                    value={currencyPair}
                    onChange={(e) => setCurrencyPair(e.target.value)}
                    className="w-full bg-[#141416] border border-[#27272a] rounded-xl px-4 py-3 text-sm font-bold text-white focus:border-[#10b981] focus:outline-none appearance-none"
                  >
                    {Object.entries(POPULAR_PAIRS).map(([key, item]) => (
                      <option key={key} value={key} className="bg-[#141416] text-white">
                        {item.name} ({item.category})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-3.5 h-4 w-4 text-[#71717a] pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#d1d4dc]">
                  Account Base Currency
                </label>
                <div className="relative">
                  <select
                    value={accountCurrency}
                    onChange={(e) => setAccountCurrency(e.target.value)}
                    className="w-full bg-[#141416] border border-[#27272a] rounded-xl px-4 py-3 text-sm font-bold text-white focus:border-[#10b981] focus:outline-none appearance-none"
                  >
                    {ACCOUNT_CURRENCIES.map((curr) => (
                      <option key={curr} value={curr} className="bg-[#141416] text-white">
                        {curr} ({curr === 'USD' ? 'US Dollar' : curr === 'INR' ? 'Indian Rupee' : curr === 'EUR' ? 'Euro' : curr})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-3.5 h-4 w-4 text-[#71717a] pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Account Balance */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#d1d4dc]">
                  Account Balance ({accountCurrency})
                </label>
                {/* Prop Firm Presets */}
                <div className="flex items-center gap-1 text-[10px] font-bold">
                  {[5000, 10000, 25000, 50000, 100000, 200000].map((bal) => (
                    <button
                      key={bal}
                      type="button"
                      onClick={() => setPresetBalance(bal)}
                      className={`px-2 py-0.5 rounded transition ${
                        accountBalance === bal
                          ? 'bg-[#10b981] text-black font-extrabold'
                          : 'bg-[#18181a] text-[#a1a1aa] hover:text-white'
                      }`}
                    >
                      ${bal >= 1000 ? `${bal / 1000}k` : bal}
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-sm font-bold text-[#71717a]">
                  {accountCurrency === 'INR' ? '₹' : '$'}
                </span>
                <input
                  type="number"
                  min="1"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(Number(e.target.value) || 0)}
                  className="w-full bg-[#141416] border border-[#27272a] rounded-xl pl-9 pr-4 py-3 text-sm font-mono text-white focus:border-[#10b981] focus:outline-none transition"
                />
              </div>
            </div>

            {/* RISK SECTION (TOGGLE BETWEEN % AND FIXED AMOUNT IN USD) */}
            <div className="space-y-3 rounded-2xl bg-black/60 p-4 border border-[#222222]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5 text-[#10b981]" /> Risk Preference
                </label>
                <div className="inline-flex rounded-lg bg-[#141416] p-1 border border-[#27272a]">
                  <button
                    type="button"
                    onClick={() => setRiskType('percent')}
                    className={`px-3 py-1 rounded text-[11px] font-bold transition ${
                      riskType === 'percent'
                        ? 'bg-[#10b981] text-black shadow'
                        : 'text-[#a1a1aa] hover:text-white'
                    }`}
                  >
                    Risk Ratio (%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRiskType('cash')}
                    className={`px-3 py-1 rounded text-[11px] font-bold transition ${
                      riskType === 'cash'
                        ? 'bg-[#10b981] text-black shadow'
                        : 'text-[#a1a1aa] hover:text-white'
                    }`}
                  >
                    Risk Money ({accountCurrency})
                  </button>
                </div>
              </div>

              {riskType === 'percent' ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#a1a1aa]">Account Risk Percentage (%):</span>
                    <span className="font-mono font-bold text-white">
                      = {accountCurrency === 'INR' ? '₹' : '$'}{(accountBalance * (riskPercent / 100)).toFixed(2)} {accountCurrency}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        step="0.1"
                        min="0.1"
                        max="100"
                        value={riskPercent}
                        onChange={(e) => handlePercentChange(Number(e.target.value) || 0)}
                        className="w-full bg-[#141416] border border-[#27272a] rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:border-[#10b981] focus:outline-none"
                      />
                      <span className="absolute right-4 top-2.5 text-sm font-bold text-[#71717a]">%</span>
                    </div>
                    <div className="flex gap-1">
                      {[0.5, 1.0, 1.5, 2.0].map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => handlePercentChange(r)}
                          className={`px-2.5 py-2 rounded-xl text-xs font-bold transition ${
                            riskPercent === r
                              ? 'bg-[#10b981] text-black'
                              : 'bg-[#18181a] text-[#a1a1aa] hover:text-white'
                          }`}
                        >
                          {r}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#a1a1aa]">Amount to Risk ({accountCurrency}):</span>
                    <span className="font-mono font-bold text-emerald-400">
                      = {((riskCash / (accountBalance || 1)) * 100).toFixed(2)}% of Account
                    </span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-2.5 text-sm font-bold text-[#71717a]">
                      {accountCurrency === 'INR' ? '₹' : '$'}
                    </span>
                    <input
                      type="number"
                      step="1"
                      min="1"
                      value={riskCash}
                      onChange={(e) => handleCashChange(Number(e.target.value) || 0)}
                      className="w-full bg-[#141416] border border-[#27272a] rounded-xl pl-9 pr-4 py-2.5 text-sm font-mono text-white focus:border-[#10b981] focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* STOP LOSS SECTION (TOGGLE BETWEEN PIPS AND OPEN/SL PRICE) */}
            <div className="space-y-3 rounded-2xl bg-black/60 p-4 border border-[#222222]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-[#10b981]" /> Stop Loss Specification
                </label>
                <div className="inline-flex rounded-lg bg-[#141416] p-1 border border-[#26262a]">
                  <button
                    type="button"
                    onClick={() => setStopLossType('pips')}
                    className={`px-3 py-1 rounded text-[11px] font-bold transition ${
                      stopLossType === 'pips'
                        ? 'bg-[#10b981] text-black shadow'
                        : 'text-[#a1a1aa] hover:text-white'
                    }`}
                  >
                    Pips Count
                  </button>
                  <button
                    type="button"
                    onClick={() => setStopLossType('price')}
                    className={`px-3 py-1 rounded text-[11px] font-bold transition ${
                      stopLossType === 'price'
                        ? 'bg-[#10b981] text-black shadow'
                        : 'text-[#a1a1aa] hover:text-white'
                    }`}
                  >
                    Open & SL Price
                  </button>
                </div>
              </div>

              {stopLossType === 'pips' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1">
                    <label className="text-xs text-[#d1d4dc] font-semibold">Stop Loss (in Pips)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={stopLossPips}
                      onChange={(e) => setStopLossPips(Number(e.target.value) || 0)}
                      placeholder="20"
                      className="w-full bg-[#141416] border border-[#27272a] rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:border-[#10b981] focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-[#d1d4dc] font-semibold">Take Profit Target (in Pips)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={takeProfitPips}
                      onChange={(e) => setTakeProfitPips(Number(e.target.value) || 0)}
                      placeholder="60"
                      className="w-full bg-[#141416] border border-[#27272a] rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:border-[#10b981] focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] text-[#d1d4dc] font-semibold">Open / Entry Price</label>
                      <input
                        type="number"
                        step={pair.pipSize}
                        value={openPrice}
                        onChange={(e) => setOpenPrice(Number(e.target.value) || 0)}
                        className="w-full bg-[#141416] border border-[#27272a] rounded-xl px-3 py-2 text-xs font-mono text-white focus:border-[#10b981] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-rose-400 font-semibold">Stop Loss Price</label>
                      <input
                        type="number"
                        step={pair.pipSize}
                        value={stopLossPrice}
                        onChange={(e) => setStopLossPrice(Number(e.target.value) || 0)}
                        className="w-full bg-[#141416] border border-[#27272a] rounded-xl px-3 py-2 text-xs font-mono text-rose-300 focus:border-[#10b981] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#a1a1aa] bg-[#141416] p-2.5 rounded-xl border border-[#222222]">
                    <span>Computed SL Distance:</span>
                    <strong className="text-white font-mono">{effectivePips} pips</strong>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: COMPREHENSIVE LOTS BREAKDOWN & SUMMARY (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Result Dashboard */}
            <div className="rounded-3xl border border-[#10b981]/40 bg-gradient-to-b from-[#0b1f17] to-[#0a0a0c] p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-[#10b981]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#10b981] flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4" /> Position Size Result
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    {currencyPair}
                  </span>
                </div>

                {/* Primary Standard Lots Display */}
                <div className="pt-3 flex items-baseline gap-3">
                  <span className="text-5xl sm:text-6xl font-black text-white font-mono tracking-tight">
                    {standardLots > 0 ? standardLots.toFixed(2) : '0.00'}
                  </span>
                  <span className="text-sm font-bold text-[#a1a1aa] uppercase tracking-wider">
                    Standard Lots
                  </span>
                </div>
                <p className="text-xs text-[#71717a] pt-0.5">
                  Volume: <strong className="text-slate-200">{units.toLocaleString('en-US')}</strong> Units of base currency
                </p>
              </div>

              {/* THREE LOT SIZES GRID (STANDARD, MINI, MICRO) */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#1c382b]">
                <div className="p-2.5 rounded-xl bg-black/50 border border-[#1e3c2e] text-center">
                  <span className="text-[10px] text-[#71717a] block uppercase font-bold">Standard</span>
                  <span className="text-base font-black text-white font-mono">
                    {standardLots.toFixed(2)}
                  </span>
                  <span className="text-[9px] text-[#10b981] block">100k Units</span>
                </div>

                <div className="p-2.5 rounded-xl bg-black/50 border border-[#1e3c2e] text-center">
                  <span className="text-[10px] text-[#71717a] block uppercase font-bold">Mini</span>
                  <span className="text-base font-black text-white font-mono">
                    {miniLots.toFixed(1)}
                  </span>
                  <span className="text-[9px] text-[#10b981] block">10k Units</span>
                </div>

                <div className="p-2.5 rounded-xl bg-black/50 border border-[#1e3c2e] text-center">
                  <span className="text-[10px] text-[#71717a] block uppercase font-bold">Micro</span>
                  <span className="text-base font-black text-white font-mono">
                    {microLots.toFixed(0)}
                  </span>
                  <span className="text-[9px] text-[#10b981] block">1k Units</span>
                </div>
              </div>

              {/* Detailed Financial Summary Table */}
              <div className="space-y-2.5 pt-2 border-t border-[#1c382b] text-xs">
                <div className="flex items-center justify-between py-1 border-b border-[#142920]">
                  <span className="text-[#a1a1aa]">Stop Loss Risk:</span>
                  <span className="font-mono font-bold text-rose-400">
                    -${effectiveRiskAmount.toFixed(2)} {accountCurrency} ({((effectiveRiskAmount / (accountBalance || 1)) * 100).toFixed(2)}%)
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#142920]">
                  <span className="text-[#a1a1aa]">Stop Loss Distance:</span>
                  <span className="font-mono font-bold text-white">
                    {effectivePips} Pips
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#142920]">
                  <span className="text-[#a1a1aa]">Pip Value (this position):</span>
                  <span className="font-mono font-bold text-[#10b981]">
                    ${positionPipValue.toFixed(2)} / pip
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#142920]">
                  <span className="text-[#a1a1aa]">Take Profit Gain:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    +${potentialReward.toFixed(2)} {accountCurrency}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-[#a1a1aa]">Risk / Reward Ratio:</span>
                  <span className="font-mono font-bold text-white">
                    1 : {riskRewardRatio}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-black/60 border border-[#1b3d2f] p-3 text-[11px] text-[#a1a1aa] leading-relaxed">
                🛡️ <strong>Risk Protection Rule:</strong> By taking this trade at {standardLots.toFixed(2)} lots, you risk exactly <strong className="text-white">${effectiveRiskAmount.toFixed(2)}</strong> if stopped out, fully adhering to institutional risk guidelines.
              </div>
            </div>

            {/* Explanatory FAQ Component like forex-lot-size-calculator.com */}
            <div className="rounded-2xl border border-[#222222] bg-[#0c0c0e] p-5 space-y-3 text-xs">
              <h3 className="font-bold text-white flex items-center gap-1.5 uppercase tracking-wide">
                <Info className="h-4 w-4 text-[#10b981]" /> Why Lot Sizing Matters
              </h3>
              <p className="text-[#a1a1aa] leading-relaxed">
                Lot size determines how much market movement impacts your bottom line. Trading with oversized lots is the #1 cause of blown prop firm evaluations. Always size your trades strictly according to your stop-loss distance.
              </p>
              <div className="pt-2 border-t border-[#1c1c1f]">
                <Link
                  href="/courses/forex-smart-money-concepts-mastery"
                  className="font-bold text-[#10b981] hover:underline inline-flex items-center gap-1"
                >
                  Master Institutional Risk Management <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
