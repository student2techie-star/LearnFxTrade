'use client';

import React from 'react';

export default function BearBullMorph() {
  return (
    <div className="relative w-full max-w-[480px] aspect-[3/4] mx-auto flex items-center justify-center select-none overflow-hidden">
      {/* Background Ambient Radial Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.18)_0%,transparent_75%)]" />

      {/* Seamless Bull / Bear Morphing GIF */}
      <img
        src="/bull_bear_bg.gif"
        alt="Bull and Bear Institutional Market Morph"
        className="w-full h-full object-contain filter drop-shadow-[0_0_35px_rgba(0,0,0,0.95)]"
      />

      {/* Top Status Tag */}
      <div className="absolute top-3 right-3 z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase bg-black/80 backdrop-blur-md border border-[#222222] text-[#10b981] shadow-lg">
          <span className="h-2 w-2 rounded-full bg-[#10b981] animate-ping" />
          Market Cycle Shift
        </span>
      </div>
    </div>
  );
}
