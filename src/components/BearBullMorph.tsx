'use client';

import React, { useEffect, useState } from 'react';

export default function BearBullMorph() {
  // State: 'bear' | 'bull'
  const [activeAnimal, setActiveAnimal] = useState<'bear' | 'bull'>('bear');
  const [isSmoking, setIsSmoking] = useState(false);

  useEffect(() => {
    // Morph every 5.5 seconds:
    // 0s: current animal active
    // 4.5s: trigger dense white smoke burst
    // 5.0s: switch activeAnimal (behind white smoke cloud)
    // 5.5s: smoke clears, revealing new animal
    const interval = setInterval(() => {
      setIsSmoking(true);

      setTimeout(() => {
        setActiveAnimal((prev) => (prev === 'bear' ? 'bull' : 'bear'));
      }, 500);

      setTimeout(() => {
        setIsSmoking(false);
      }, 1200);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[460px] aspect-square mx-auto flex items-center justify-center select-none overflow-hidden rounded-3xl bg-black border border-[#222222]/80 shadow-[0_0_50px_rgba(0,0,0,0.9)]">
      {/* Background ambient radial glow: Red for Bear, Emerald for Bull */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          activeAnimal === 'bear'
            ? 'opacity-30 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.25)_0%,transparent_70%)]'
            : 'opacity-30 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.25)_0%,transparent_70%)]'
        }`}
      />

      {/* Subtle animated background smoke particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-white/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-white/15 blur-3xl animate-pulse delay-700" />
      </div>

      {/* 1. BEAR IMAGE */}
      <div
        className={`absolute inset-0 p-4 flex items-center justify-center transition-all duration-700 ease-in-out ${
          activeAnimal === 'bear'
            ? 'opacity-100 scale-100 filter drop-shadow-[0_0_25px_rgba(239,68,68,0.3)]'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <img
          src="/bear.png"
          alt="Bear Market Force"
          className="w-full h-full object-contain"
        />
      </div>

      {/* 2. BULL IMAGE */}
      <div
        className={`absolute inset-0 p-4 flex items-center justify-center transition-all duration-700 ease-in-out ${
          activeAnimal === 'bull'
            ? 'opacity-100 scale-100 filter drop-shadow-[0_0_25px_rgba(16,185,129,0.3)]'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <img
          src="/bull.png"
          alt="Bull Market Momentum"
          className="w-full h-full object-contain"
        />
      </div>

      {/* 3. DENSE WHITE SMOKE CLOUD BURST DURING TRANSITION */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out flex items-center justify-center ${
          isSmoking ? 'opacity-100 z-20' : 'opacity-0 z-0'
        }`}
      >
        {/* Layer 1: Core dense white burst */}
        <div className="w-64 h-64 rounded-full bg-white/80 blur-2xl transform scale-125 transition-transform duration-700" />
        
        {/* Layer 2: Billowing outer cloud */}
        <div className="absolute w-80 h-80 rounded-full bg-slate-100/70 blur-3xl transform scale-110" />
        
        {/* Layer 3: Secondary mist */}
        <div className="absolute w-72 h-72 rounded-full bg-white/60 blur-xl animate-spin duration-1000" />
      </div>

      {/* Top Status Pill: Bearish vs Bullish */}
      <div className="absolute top-4 left-4 z-10">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border transition-all duration-500 ${
            activeAnimal === 'bear'
              ? 'bg-red-500/10 border-red-500/30 text-red-400'
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full animate-ping ${
              activeAnimal === 'bear' ? 'bg-red-500' : 'bg-emerald-500'
            }`}
          />
          {activeAnimal === 'bear' ? 'Bear Liquidity' : 'Bull Momentum'}
        </span>
      </div>

      {/* Bottom Subtitle Caption */}
      <div className="absolute bottom-4 inset-x-4 text-center z-10">
        <span className="text-[11px] font-mono text-white/50 tracking-wider uppercase">
          Dynamic Institutional Cycle Shift
        </span>
      </div>
    </div>
  );
}
