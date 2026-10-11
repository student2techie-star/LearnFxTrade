import React from 'react';
import { ShieldAlert, AlertTriangle } from 'lucide-react';

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-8 pb-24 text-slate-300">
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
          Statutory Compliance
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Risk & SEBI Statutory Disclaimer
        </h1>
        <p className="text-xs text-slate-400">
          Last revised: January 2026 • Mandatory disclosure for all students and visitors
        </p>
      </div>

      <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-6 space-y-4">
        <div className="flex items-center gap-3 text-amber-400 font-bold">
          <ShieldAlert className="h-6 w-6" />
          <span>Non-Advisory & Educational Disclosure (SEBI Notice)</span>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed">
          LearnFxTrade and its mentors/instructors are <strong>NOT registered with SEBI</strong> (Securities and Exchange Board of India) as Investment Advisers (IA) or Research Analysts (RA). None of the materials, webinars, recorded video lessons, case studies, or social media community channels provide personalised investment advice, portfolio management, or direct buy/sell trade recommendations.
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. High Risk Nature of Trading</h2>
          <p>
            Trading foreign exchange (Forex), contracts for difference (CFDs), commodities (Gold), and Indian index derivatives (Nifty 50 and Bank Nifty Options) involves substantial exposure to risk of capital loss. Leverage can work against you as well as for you. You may lose all or more than your initial deposit.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Prop Firm Certificates & Payouts Social Proof</h2>
          <p>
            All certificates, withdrawal invoices, prop firm funding passes (FTMO, FundedNext, Alpha Capital), and trade statements displayed on this website represent verified personal historical trading accomplishments of the mentors. Past performance does not represent or guarantee future results. No representation is made that any user or student will or is likely to achieve profits or losses similar to those discussed.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Personal Responsibility</h2>
          <p>
            By enrolling in any course or consuming our materials, you acknowledge that you are acting entirely on your own judgment and risk. Always consult a licensed and registered financial advisor before placing live market trades.
          </p>
        </section>
      </div>
    </div>
  );
}
