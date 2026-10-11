'use client';

import React, { useState } from 'react';
import { PayoutCertificate } from '@/lib/types';
import { Award, ShieldCheck, Calendar, X, ZoomIn, ExternalLink } from 'lucide-react';

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
            className="fintech-card group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Image Preview */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#06090e]">
              <img
                src={cert.imageUrl}
                alt={cert.title}
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c121d] via-transparent to-transparent opacity-90" />

              {/* Tag */}
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#06090e]/90 px-3 py-1 text-[11px] font-mono font-bold text-[#00f2a9] backdrop-blur-md border border-[#00f2a9]/30">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {cert.accountType}
                </span>
              </div>

              {/* Amount badge on image */}
              <div className="absolute bottom-3 right-3">
                <span className="inline-flex items-center gap-1 rounded-xl bg-[#00f2a9] text-[#06090e] font-mono font-black px-3 py-1 text-sm shadow-lg">
                  {cert.amount}
                </span>
              </div>

              {/* Hover overlay hint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/60 backdrop-blur-[2px]">
                <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#00f2a9] text-[#06090e] text-xs font-black uppercase tracking-wider shadow-lg">
                  <ZoomIn className="h-4 w-4" /> Inspect Proof
                </span>
              </div>
            </div>

            {/* Info details */}
            <div className="p-4 space-y-2">
              <h4 className="text-base font-bold text-white group-hover:text-[#00f2a9] transition-colors line-clamp-1">
                {cert.title}
              </h4>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 font-medium text-slate-300">
                  <Award className="h-3.5 w-3.5 text-amber-400" />
                  {cert.firmOrBroker}
                </span>
                <span className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
                  <Calendar className="h-3 w-3" />
                  {cert.date}
                </span>
              </div>
              {cert.verifiedRef && (
                <div className="text-[11px] font-mono text-[#00f2a9]/80 pt-2 border-t border-[#172235] flex items-center justify-between">
                  <span>Ref: {cert.verifiedRef}</span>
                  <span className="text-[10px] text-slate-500 font-sans uppercase">Click to enlarge</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-3xl border border-[#172235] bg-[#0c121d] p-6 sm:p-8 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#00f2a9]/15 text-[#00f2a9] border border-[#00f2a9]/30">
                  {selectedCert.accountType}
                </span>
                <span className="text-xs text-slate-400 font-mono">Ref: {selectedCert.verifiedRef}</span>
              </div>
              <h3 className="text-2xl font-black text-white mt-1.5">
                {selectedCert.title}
              </h3>
              <p className="text-xs text-slate-400">
                Issued by: <strong className="text-slate-200">{selectedCert.firmOrBroker}</strong> on {selectedCert.date}
              </p>
            </div>

            {/* Certificate Large Image */}
            <div className="relative max-h-[60vh] w-full overflow-hidden rounded-2xl bg-[#06090e] border border-[#172235] flex items-center justify-center">
              <img
                src={selectedCert.imageUrl}
                alt={selectedCert.title}
                className="max-h-[60vh] w-auto object-contain"
              />
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-[#172235] text-xs text-slate-400">
              <div className="flex items-center gap-3 font-mono">
                <span className="text-base font-black text-[#00f2a9]">
                  Payout: {selectedCert.amount}
                </span>
                <span>•</span>
                <span className="text-slate-400 italic text-xs">
                  &quot;Verified transaction from personal live funded accounts.&quot;
                </span>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider"
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
