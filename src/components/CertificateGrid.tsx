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
            className="tv-dark-card group relative cursor-pointer overflow-hidden"
          >
            {/* Image Preview */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
              <img
                src={cert.imageUrl}
                alt={cert.title}
                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

              {/* Tag */}
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-black/90 border border-[#222222] px-2.5 py-0.5 text-[10px] font-semibold text-[#089981] shadow-xs">
                  <ShieldCheck className="h-3 w-3" />
                  {cert.accountType}
                </span>
              </div>

              {/* Amount badge on image */}
              <div className="absolute bottom-3 right-3">
                <span className="inline-flex items-center rounded-lg bg-[#2962ff] text-white font-mono font-bold px-3 py-1 text-xs shadow-md">
                  {cert.amount}
                </span>
              </div>

              {/* Hover overlay hint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-[2px]">
                <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#2962ff] text-white text-xs font-bold shadow-lg">
                  <ZoomIn className="h-4 w-4" /> Inspect Proof
                </span>
              </div>
            </div>

            {/* Info details */}
            <div className="p-4 space-y-2">
              <h4 className="text-base font-bold text-white group-hover:text-[#2962ff] transition-colors line-clamp-1">
                {cert.title}
              </h4>
              <div className="flex items-center justify-between text-xs text-[#787b86]">
                <span className="font-semibold text-[#d1d4dc] truncate">
                  {cert.firmOrBroker}
                </span>
                <span className="font-mono text-[11px] shrink-0 text-[#787b86]">
                  {cert.date}
                </span>
              </div>
              {cert.verifiedRef && (
                <div className="text-[11px] font-mono text-[#089981] pt-2 border-t border-[#2a2e39] flex items-center justify-between">
                  <span>Ref: {cert.verifiedRef}</span>
                  <span className="text-[10px] text-[#787b86] font-sans font-semibold">Verified</span>
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
            className="relative max-w-4xl w-full rounded-2xl bg-[#111111] border border-[#222222] p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 text-[#a1a1aa] hover:text-white rounded-full bg-[#1c1c1c] hover:bg-[#252525] transition"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#2962ff]/15 text-[#2962ff] border border-[#2962ff]/30">
                {selectedCert.accountType}
              </span>
              <h3 className="text-xl font-bold text-white mt-2">
                {selectedCert.title}
              </h3>
              <p className="text-xs text-[#a1a1aa] mt-1">
                Issued by: <strong className="text-white">{selectedCert.firmOrBroker}</strong> on {selectedCert.date}
              </p>
            </div>

            {/* Image */}
            <div className="relative max-h-[60vh] w-full overflow-hidden rounded-xl bg-black border border-[#222222] flex items-center justify-center">
              <img
                src={selectedCert.imageUrl}
                alt={selectedCert.title}
                className="max-h-[60vh] w-auto object-contain"
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-[#2a2e39] text-xs text-[#787b86]">
              <span className="font-mono text-base font-bold text-[#089981]">
                Payout: {selectedCert.amount}
              </span>
              <button
                onClick={() => setSelectedCert(null)}
                className="tv-btn-secondary px-5 py-2 text-xs font-semibold"
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
