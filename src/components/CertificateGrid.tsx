'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PayoutCertificate } from '@/lib/types';
import { Award, ShieldCheck, Calendar, DollarSign, X, ExternalLink, ZoomIn } from 'lucide-react';

interface Props {
  certificates: PayoutCertificate[];
  limit?: number;
}

export default function CertificateGrid({ certificates, limit }: Props) {
  const [selectedCert, setSelectedCert] = useState<PayoutCertificate | null>(null);

  const displayList = limit ? certificates.slice(0, limit) : certificates;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayList.map((cert) => (
          <div
            key={cert.id}
            onClick={() => setSelectedCert(cert)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1"
          >
            {/* Image Preview Container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
              <img
                src={cert.imageUrl}
                alt={cert.title}
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

              {/* Tag / Badge */}
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-950/80 px-2.5 py-1 text-xs font-semibold text-emerald-400 backdrop-blur-md border border-emerald-500/30">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {cert.accountType}
                </span>
              </div>

              {/* Amount badge on image */}
              <div className="absolute bottom-3 right-3">
                <span className="inline-flex items-center gap-1 rounded-xl bg-emerald-500/90 text-slate-950 font-black px-3 py-1 text-sm shadow-lg">
                  {cert.amount}
                </span>
              </div>

              {/* Hover overlay hint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-[2px]">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold shadow-lg">
                  <ZoomIn className="h-4 w-4" /> View Verified Proof
                </span>
              </div>
            </div>

            {/* Info details */}
            <div className="p-4 space-y-2">
              <h4 className="text-base font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                {cert.title}
              </h4>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 font-medium text-slate-300">
                  <Award className="h-3.5 w-3.5 text-amber-400" />
                  {cert.firmOrBroker}
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Calendar className="h-3 w-3" />
                  {cert.date}
                </span>
              </div>
              {cert.verifiedRef && (
                <div className="text-[11px] font-mono text-emerald-500/80 pt-1 border-t border-slate-800/60 flex items-center justify-between">
                  <span>Ref: {cert.verifiedRef}</span>
                  <span className="text-[10px] text-slate-400 font-sans">Click to inspect</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl border border-slate-700 bg-slate-900 p-4 sm:p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {selectedCert.accountType}
                </span>
                <span className="text-xs text-slate-400">Ref: {selectedCert.verifiedRef}</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                {selectedCert.title}
              </h3>
              <p className="text-sm text-slate-400">
                Issued by: <strong className="text-slate-200">{selectedCert.firmOrBroker}</strong> on {selectedCert.date}
              </p>
            </div>

            {/* Main Certificate Large Image */}
            <div className="relative max-h-[65vh] w-full overflow-hidden rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
              <img
                src={selectedCert.imageUrl}
                alt={selectedCert.title}
                className="max-h-[65vh] w-auto object-contain"
              />
            </div>

            {/* Modal Footer / Verification details */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-emerald-400">
                  Payout Amount: {selectedCert.amount}
                </span>
                <span>•</span>
                <span className="text-slate-400 italic">
                  &quot;Verified transaction from personal live funded accounts.&quot;
                </span>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg text-xs"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
