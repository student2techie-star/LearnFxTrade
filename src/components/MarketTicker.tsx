'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const TICKER_ITEMS = [
  { symbol: 'XAU/USD', price: '2,654.40', change: '+1.42%', up: true },
  { symbol: 'EUR/USD', price: '1.0892', change: '+0.28%', up: true },
  { symbol: 'GBP/JPY', price: '197.85', change: '-0.34%', up: false },
  { symbol: 'NIFTY 50', price: '25,240.15', change: '+0.85%', up: true },
  { symbol: 'BANKNIFTY', price: '52,480.60', change: '+1.15%', up: true },
  { symbol: 'USD/INR', price: '84.05', change: '-0.08%', up: false },
  { symbol: 'BTC/USD', price: '94,820.00', change: '+3.20%', up: true },
  { symbol: 'FTMO PASSED', price: '$200,000', change: 'VERIFIED', up: true },
  { symbol: 'FUNDEDNEXT', price: '$100,000', change: 'PAYOUT RECD', up: true },
];

export default function MarketTicker() {
  return (
    <div className="w-full bg-[#050505] border-b border-[#181818] py-1.5 overflow-hidden select-none">
      <div className="animate-ticker flex items-center gap-8 text-[11px] font-mono">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 shrink-0">
            <span className="font-medium text-neutral-400">{item.symbol}</span>
            <span className="text-white font-semibold">{item.price}</span>
            <span
              className={`flex items-center gap-0.5 text-[10px] font-medium ${
                item.up ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {item.up ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              {item.change}
            </span>
            <span className="text-neutral-800 ml-2">/</span>
          </div>
        ))}
      </div>
    </div>
  );
}
