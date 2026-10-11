import React from 'react';
import { CreditCard, RefreshCw } from 'lucide-react';

export default function RefundPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-8 pb-24 text-slate-300">
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
          Payment Terms
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Refund & Cancellation Policy
        </h1>
        <p className="text-xs text-slate-400">
          Compliant with Razorpay Merchant Guidelines • Last updated: January 2026
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Digital Products Policy</h2>
          <p>
            Due to the immediate digital nature and irrevocable intellectual property delivery of online video courses, downloadables, and private community links, all sales completed through our website via Razorpay are strictly <strong>non-refundable</strong> once course classroom access is activated.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Free Preview Policy</h2>
          <p>
            To ensure students can evaluate curriculum quality and teaching style prior to committing funds, we provide multiple <strong>Free Preview Video Lessons</strong> on every course page. We strongly encourage prospective students to watch these sample lectures before proceeding to checkout.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Accidental Duplicate Payments</h2>
          <p>
            In the event of a double transaction or duplicate payment caused by network latency or gateway timeouts during Razorpay processing, the duplicate amount will be verified and refunded back to your original source account (UPI/bank/card) within 5–7 business days. Please email our helpdesk at <strong>support@learnfxtrade.com</strong> with your Razorpay Payment IDs.
          </p>
        </section>
      </div>
    </div>
  );
}
