'use client';

import React, { useState } from 'react';
import { PayoutCertificate } from '@/lib/types';
import { Award, Calendar, X, ZoomIn } from 'lucide-react';

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
            className="clean-card group relative cursor-pointer overflow-hidden rounded-xl"
          >
            {/* Image Preview */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950">
              <img
                src={cert.imageUrl}
                alt={cert.title}
                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

              {/* Tag */}
              <div className="absolute top-2.5 left-2.5">
                <span className="inline-flex items-center gap-1 rounded-md bg-black/80 px-2 py-0.5 text-[10px] font-mono text-neutral-300 border border-neutral-800">
                  {cert.accountType}
                </span>
              </div>

              {/* Amount badge on image */}
              <div className="absolute bottom-2.5 right-2.5">
                <span className="inline-flex items-center rounded-md bg-white text-black font-mono font-bold px-2 py-0.5 text-xs">
                  {cert.amount}
                </span>
              </div>
            </div>

            {/* Info details */}
            <div className="p-3.5 space-y-1.5">
              <h4 className="text-sm font-semibold text-white group-hover:text-neutral-200 transition-colors line-clamp-1">
                {cert.title}
              </h4>
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span className="font-medium text-neutral-300 truncate">
                  {cert.firmOrBroker}
                </span>
                <span className="font-mono text-[11px] text-neutral-500 shrink-0">
                  {cert.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl border border-neutral-800 bg-[#0a0a0a] p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-white rounded-full bg-neutral-900 border border-neutral-800 transition"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-900 text-neutral-300 border border-neutral-800">
                {selectedCert.accountType}
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                {selectedCert.title}
              </h3>
              <p className="text-xs text-neutral-400">
                Issued by: <strong className="text-neutral-200">{selectedCert.firmOrBroker}</strong> on {selectedCert.date}
              </p>
            </div>

            {/* Image */}
            <div className="relative max-h-[60vh] w-full overflow-hidden rounded-xl bg-black border border-neutral-800 flex items-center justify-center">
              <img
                src={selectedCert.imageUrl}
                alt={selectedCert.title}
                className="max-h-[60vh] w-auto object-contain"
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-800 text-xs text-neutral-400">
              <span className="font-mono text-sm font-bold text-white">
                Payout: {selectedCert.amount}
              </span>
              <button
                onClick={() => setSelectedCert(null)}
                className="px-4 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-lg text-xs border border-neutral-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
