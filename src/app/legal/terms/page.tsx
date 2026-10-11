import React from 'react';

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-8 pb-24 text-slate-300">
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
          User Agreement
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Terms & Conditions
        </h1>
        <p className="text-xs text-slate-400">Effective Date: January 2026</p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Intellectual Property & Anti-Piracy</h2>
          <p>
            All video lectures, syllabus materials, and proprietary risk frameworks are the sole intellectual property of LearnFxTrade. Any screen-recording, ripping, redistribution, group-buying, or sharing of course logins will result in immediate termination of account access without refund and possible legal action.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. User Accounts</h2>
          <p>
            Each license is strictly for single-user personal education. Dynamic watermarking containing student email and account identifiers is continuously rendered on video streams for security audit purposes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Governing Jurisdiction</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of India. Any legal disputes arising out of services will be subject to the exclusive jurisdiction of the competent courts in India.
          </p>
        </section>
      </div>
    </div>
  );
}
