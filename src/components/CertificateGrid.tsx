'use client';

import React, { useState } from 'react';
import { PayoutCertificate } from '@/lib/types';
import { Award, Calendar, X, ZoomIn, ShieldCheck } from 'lucide-react';

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
            className="tv-card group relative cursor-pointer overflow-hidden"
          >
            {/* Image Preview */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#131722]">
              <img
                src={cert.imageUrl}
                alt={cert.title}
                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e222d] via-transparent to-transparent opacity-85" />

              {/* Tag */}
              <div className="absolute top-2.5 left-2.5">
                <span className="inline-flex items-center gap-1 rounded bg-[#131722]/90 px-2 py-0.5 text-[10px] font-mono text-[#089981] border border-[#2a2e39]">
                  <ShieldCheck className="h-3 w-3" />
                  {cert.accountType}
                </span>
              </div>

              {/* Amount badge on image */}
              <div className="absolute bottom-2.5 right-2.5">
                <span className="inline-flex items-center rounded bg-[#2962ff] text-white font-mono font-bold px-2 py-0.5 text-xs shadow">
                  {cert.amount}
                </span>
              </div>

              {/* Hover overlay hint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-[2px]">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#2962ff] text-white text-xs font-semibold uppercase tracking-wider shadow-lg">
                  <ZoomIn className="h-4 w-4" /> Inspect Proof
                </span>
              </div>
            </div>

            {/* Info details */}
            <div className="p-3.5 space-y-1.5">
              <h4 className="text-sm font-bold text-white group-hover:text-[#2962ff] transition-colors line-clamp-1">
                {cert.title}
              </h4>
              <div className="flex items-center justify-between text-xs text-[#787b86]">
                <span className="font-medium text-[#d1d4dc] truncate">
                  {cert.firmOrBroker}
                </span>
                <span className="font-mono text-[11px] shrink-0">
                  {cert.date}
                </span>
              </div>
              {cert.verifiedRef && (
                <div className="text-[11px] font-mono text-[#089981] pt-2 border-t border-[#2a2e39] flex items-center justify-between">
                  <span>Ref: {cert.verifiedRef}</span>
                  <span className="text-[10px] text-[#787b86] uppercase font-sans">Verified</span>
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
            className="relative max-w-4xl w-full rounded-lg border border-[#2a2e39] bg-[#1e222d] p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-1.5 text-[#787b86] hover:text-white rounded-md bg-[#2a2e39] hover:bg-[#363a45] transition"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#131722] text-[#089981] border border-[#2a2e39]">
                {selectedCert.accountType}
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                {selectedCert.title}
              </h3>
              <p className="text-xs text-[#787b86]">
                Issued by: <strong className="text-white">{selectedCert.firmOrBroker}</strong> on {selectedCert.date}
              </p>
            </div>

            {/* Image */}
            <div className="relative max-h-[60vh] w-full overflow-hidden rounded-md bg-[#131722] border border-[#2a2e39] flex items-center justify-center">
              <img
                src={selectedCert.imageUrl}
                alt={selectedCert.title}
                className="max-h-[60vh] w-auto object-contain"
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-[#2a2e39] text-xs text-[#787b86]">
              <span className="font-mono text-sm font-bold text-[#2962ff]">
                Payout: {selectedCert.amount}
              </span>
              <button
                onClick={() => setSelectedCert(null)}
                className="px-4 py-1.5 bg-[#2a2e39] hover:bg-[#363a45] text-white font-medium rounded text-xs"
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
