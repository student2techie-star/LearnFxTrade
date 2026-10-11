'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Course } from '@/lib/types';
import {
  ShieldCheck,
  CreditCard,
  Lock,
  Sparkles,
  CheckCircle,
  AlertCircle,
  X,
  Zap,
} from 'lucide-react';

interface Props {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

export default function CheckoutModal({ course, isOpen, onClose }: Props) {
  const router = useRouter();
  const { user, refreshEnrollments } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePayment = async () => {
    if (!user) {
      router.push(`/login?redirect=/courses/${course.slug}`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Create Order on Backend
      const res = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: course.id,
          userId: user.id,
          userEmail: user.email,
        }),
      });

      const orderData = await res.json();
      if (!res.ok) {
        throw new Error(orderData.error || 'Failed to create payment order');
      }

      // Check if Razorpay Checkout script is loaded on window
      if (typeof window !== 'undefined' && window.Razorpay && orderData.isLive) {
        // Live Razorpay Checkout Options
        const options = {
          key: orderData.keyId,
          amount: orderData.amountPaise,
          currency: 'INR',
          name: 'LearnFxTrade Academy',
          description: `Enrollment: ${course.title}`,
          order_id: orderData.razorpayOrderId,
          handler: async function (response: {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
          }) {
            await verifyPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: user.phone || '9999999999',
          },
          theme: {
            color: '#10b981',
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        setLoading(false);
      } else {
        // Fast-path Sandbox / Test Simulation Mode for instant developer testing
        setTimeout(async () => {
          await verifyPayment({
            razorpayOrderId: orderData.razorpayOrderId,
            razorpayPaymentId: `pay_sim_${Date.now()}`,
            razorpaySignature: `sig_sandbox_valid_${Date.now()}`,
          });
        }, 800);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Checkout encountered an error';
      setError(msg);
      setLoading(false);
    }
  };

  const verifyPayment = async (data: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }) => {
    try {
      const verifyRes = await fetch('/api/checkout/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          userId: user?.id,
          courseId: course.id,
        }),
      });

      const verifyResult = await verifyRes.json();
      if (!verifyRes.ok) {
        throw new Error(verifyResult.error || 'Payment verification failed');
      }

      await refreshEnrollments();
      setSuccess(true);
      setLoading(false);

      setTimeout(() => {
        onClose();
        router.push(`/learn/${course.slug}`);
      }, 1500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Verification failed';
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="relative max-w-lg w-full rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {success ? (
          <div className="text-center py-8 space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-black text-white">Payment Successful!</h3>
            <p className="text-sm text-slate-300">
              Access to <strong className="text-emerald-400">{course.title}</strong> has been instantly unlocked. Redirecting to your student dashboard...
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Direct Razorpay Checkout
              </span>
              <h2 className="text-2xl font-black text-white mt-1">Enroll in Course</h2>
              <p className="text-xs text-slate-400 mt-1">{course.title}</p>
            </div>

            {/* Price breakdown box */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
              <div className="flex justify-between text-sm text-slate-400">
                <span>Standard Tuition</span>
                <span className="line-through">₹{course.originalPriceInr.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm text-emerald-400 font-medium">
                <span>Promotional Discount</span>
                <span>- ₹{(course.originalPriceInr - course.priceInr).toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-semibold text-white">Total Payable (INR)</span>
                  <div className="text-[11px] text-slate-400">Inclusive of all taxes & lifetime access</div>
                </div>
                <span className="text-3xl font-black text-emerald-400">
                  ₹{course.priceInr.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* User identification */}
            {user ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 text-xs text-slate-300 border border-slate-700/60">
                <div>
                  <span className="text-slate-400 block text-[10px]">ENROLLING ACCOUNT</span>
                  <span className="font-semibold text-white">{user.name}</span> ({user.email})
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  Active
                </span>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-amber-500/10 text-xs text-amber-300 border border-amber-500/30 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>You will need to sign in or create an account to access the lessons.</span>
              </div>
            )}

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                {error}
              </div>
            )}

            {/* Razorpay features */}
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Supports UPI (Google Pay, PhonePe, Paytm), NetBanking, Credit/Debit Cards</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-emerald-400" />
                <span>HMAC-SHA256 Server Signature Verification with Idempotent Webhook Backup</span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-black text-sm tracking-wide transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 active:scale-98"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 border-2 border-slate-950 border-t-transparent animate-spin rounded-full" />
                  <span>Processing Secure Order...</span>
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 fill-slate-950" />
                  <span>Pay ₹{course.priceInr.toLocaleString('en-IN')} via Razorpay</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
