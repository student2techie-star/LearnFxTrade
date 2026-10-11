import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-8 pb-24 text-slate-300">
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
          Data Protection
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">Effective Date: January 2026</p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Information We Collect</h2>
          <p>
            We collect basic account details including your name, email address, and contact number during registration and checkout. This data is strictly used for order fulfillment, account authentication, and communication regarding curriculum updates.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Payment Processing (Razorpay)</h2>
          <p>
            All online transactions are processed through Razorpay Payment Gateway. We do NOT store or process your sensitive credit/debit card numbers, CVVs, UPI PINs, or banking passwords on our servers. Razorpay adheres to the highest PCI-DSS Level 1 compliance standards.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Third-Party Sharing</h2>
          <p>
            We strictly do NOT sell, rent, or trade your personal contact details to third-party telemarketers or external vendors.
          </p>
        </section>
      </div>
    </div>
  );
}
