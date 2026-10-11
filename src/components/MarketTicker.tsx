'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const TICKER_ITEMS = [
  { symbol: 'NIFTY 50', price: '25,240.15', change: '+0.85%', up: true },
  { symbol: 'BANKNIFTY', price: '52,480.60', change: '+1.15%', up: true },
  { symbol: 'SENSEX', price: '82,890.90', change: '+0.72%', up: true },
  { symbol: 'XAU/USD', price: '2,654.40', change: '+1.42%', up: true },
  { symbol: 'USD/INR', price: '84.05', change: '-0.08%', up: false },
  { symbol: 'EUR/USD', price: '1.0892', change: '+0.28%', up: true },
  { symbol: 'GBP/JPY', price: '197.85', change: '-0.34%', up: false },
  { symbol: 'RELIANCE', price: '2,980.50', change: '+1.80%', up: true },
  { symbol: 'HDFCBANK', price: '1,684.20', change: '+0.95%', up: true },
  { symbol: 'FTMO ACC', price: '$200,000', change: 'PASSED 8.2%', up: true },
  { symbol: 'FUNDEDNEXT', price: '$100,000', change: 'PAYOUT RECD', up: true },
];

export default function MarketTicker() {
  return (
    <div className="w-full bg-black border-b border-[#222222] py-1.5 overflow-hidden select-none">
      <div className="animate-ticker flex items-center gap-7 text-[11px] font-mono">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 shrink-0">
            <span className="font-bold text-white">{item.symbol}</span>
            <span className="text-[#d1d4dc] font-medium">{item.price}</span>
            <span
              className={`flex items-center gap-0.5 font-bold ${
                item.up ? 'text-[#089981]' : 'text-[#f23645]'
              }`}
            >
              {item.up ? (
                <TrendingUp className="h-3 w-3 stroke-[2.5]" />
              ) : (
                <TrendingDown className="h-3 w-3 stroke-[2.5]" />
              )}
              {item.change}
            </span>
            <span className="text-[#363a45] ml-1.5">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
