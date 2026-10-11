'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const TICKER_ITEMS = [
  { symbol: 'XAU/USD', price: '2,654.40', change: '+1.42%', up: true },
  { symbol: 'EUR/USD', price: '1.0892', change: '+0.28%', up: true },
  { symbol: 'GBP/JPY', price: '197.85', change: '-0.34%', up: false },
  { symbol: 'NIFTY 50', price: '25,240.15', change: '+0.85%', up: true },
  { symbol: 'BANKNIFTY', price: '52,480.60', change: '+1.15%', up: true },
  { symbol: 'USD/INR', price: '84.05', change: '-0.08%', up: false },
  { symbol: 'BTC/USD', price: '94,820.00', change: '+3.20%', up: true },
  { symbol: 'FTMO ACC', price: '$200,000', change: 'PASSED 8.2%', up: true },
  { symbol: 'FUNDEDNEXT', price: '$100,000', change: 'PAYOUT RECD', up: true },
];

export default function MarketTicker() {
  return (
    <div className="w-full bg-[#05080d] border-b border-[#131d2e] py-1.5 overflow-hidden select-none">
      <div className="animate-ticker flex items-center gap-8 text-[11px] font-mono">
        {/* Double array for seamless loop */}
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 shrink-0">
            <span className="font-bold text-slate-300 tracking-wider">{item.symbol}</span>
            <span className="text-white font-medium">{item.price}</span>
            <span
              className={`flex items-center gap-0.5 font-bold ${
                item.up ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {item.up ? (
                <TrendingUp className="h-3 w-3 stroke-[2.5]" />
              ) : (
                <TrendingDown className="h-3 w-3 stroke-[2.5]" />
              )}
              {item.change}
            </span>
            <span className="text-slate-700 ml-2">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
