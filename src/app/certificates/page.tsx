'use client';

import React, { useState, useEffect } from 'react';
import { PayoutCertificate } from '@/lib/types';
import CertificateGrid from '@/components/CertificateGrid';
import { Award, ShieldCheck, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<PayoutCertificate[]>([]);

  useEffect(() => {
    fetch('/api/certificates')
      .then((res) => res.json())
      .then((data) => {
        if (data.certificates) setCertificates(data.certificates);
      })
      .catch((err) => console.error('Failed to load certificates:', err));
  }, []);
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 pb-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Award className="h-3.5 w-3.5" /> Social Proof & Verified Payouts
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white">
          Trading Payout Certificates Gallery
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Inspect bi-weekly payout receipts and evaluation passed certificates from prop firms including FTMO, FundedNext, Alpha Capital, and Indian broking withdrawal statements.
        </p>
      </div>

      {/* Transparency Note */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">100% Genuine Personal Account Proofs</h4>
            <p className="text-xs text-slate-400">
              Click any certificate thumbnail below to inspect the full resolution document with verification codes.
            </p>
          </div>
        </div>
        <Link
          href="/courses"
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shrink-0 transition"
        >
          Learn This Strategy
        </Link>
      </div>

      {/* Grid of All Certificates */}
      <CertificateGrid certificates={certificates} />

      {/* Mandatory Disclaimer Box */}
      <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-5 text-xs text-slate-300 space-y-2">
        <div className="flex items-center gap-2 text-amber-400 font-bold">
          <AlertTriangle className="h-4 w-4" /> Disclaimer Regarding Trading Payouts
        </div>
        <p className="leading-relaxed">
          The certificates displayed represent personal historical trading performance and funded accounts held by the founder. Individual student performance will depend on personal risk management, discipline, and execution. Past payouts are not a guarantee of future profits. Trading involves significant risk of capital loss.
        </p>
      </div>
    </div>
  );
}
