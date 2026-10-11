'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const TICKER_ITEMS = [
  { symbol: 'XAUUSD', price: '2,654.40', change: '+1.42%', up: true },
  { symbol: 'EURUSD', price: '1.0892', change: '+0.28%', up: true },
  { symbol: 'GBPJPY', price: '197.85', change: '-0.34%', up: false },
  { symbol: 'NIFTY', price: '25,240.15', change: '+0.85%', up: true },
  { symbol: 'BANKNIFTY', price: '52,480.60', change: '+1.15%', up: true },
  { symbol: 'USDINR', price: '84.05', change: '-0.08%', up: false },
  { symbol: 'BTCUSD', price: '94,820.00', change: '+3.20%', up: true },
  { symbol: 'FTMO', price: '$200K FUNDED', change: '+8.2%', up: true },
  { symbol: 'FUNDEDNEXT', price: '$100K PAYOUT', change: 'VERIFIED', up: true },
];

export default function MarketTicker() {
  return (
    <div className="w-full bg-[#0d1017] border-b border-[#2a2e39] py-1.5 overflow-hidden select-none">
      <div className="animate-ticker flex items-center gap-7 text-[11px] font-mono">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 shrink-0">
            <span className="font-semibold text-white">{item.symbol}</span>
            <span className="text-[#d1d4dc]">{item.price}</span>
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
            <span className="text-[#2a2e39] ml-2">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
