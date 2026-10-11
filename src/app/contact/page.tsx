'use client';

import React, { useState } from 'react';
import { Mail, Phone, Send, MessageCircle, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Course Enrollment Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 space-y-12 pb-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
          Support & Inquiries
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white">
          Get in Touch
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Have questions regarding syllabus contents, Razorpay payment receipts, or prop firm roadmap? Our support desk responds within 2-4 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Info & Channels */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
            <h3 className="text-lg font-bold text-white">Direct Support Channels</h3>

            <div className="space-y-4">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 transition"
              >
                <div className="p-2 rounded-xl bg-emerald-500 text-slate-950 font-bold shrink-0">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">WhatsApp Fast Support</div>
                  <div className="text-xs text-emerald-400 font-mono">+91 98765 43210</div>
                </div>
              </a>

              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-400 transition"
              >
                <div className="p-2 rounded-xl bg-cyan-500 text-slate-950 font-bold shrink-0">
                  <Send className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Official Telegram Desk</div>
                  <div className="text-xs text-cyan-400">@LearnFxTradeSupport</div>
                </div>
              </a>

              <a
                href="https://discord.gg/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#5865F2]/10 hover:bg-[#5865F2]/20 border border-[#5865F2]/25 text-[#5865F2] transition"
              >
                <div className="p-2 rounded-xl bg-[#5865F2] text-white font-bold shrink-0">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Discord Student Lounge</div>
                  <div className="text-xs text-[#5865F2] font-mono">discord.gg/learnfxtrade</div>
                </div>
              </a>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 text-slate-300">
                <div className="p-2 rounded-xl bg-slate-700 text-white shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Official Email</div>
                  <div className="text-xs text-slate-400 font-mono">support@learnfxtrade.com</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-400" />
                <span>Trading Desk Hours: Mon - Sat (9:00 AM - 9:00 PM IST)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Verified Razorpay Merchant Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Received!</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Thank you for reaching out. A team member or lead mentor will respond to your registered email ({formData.email}) promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-white">Send Us a Direct Message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Topic / Inquiry</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option>Course Enrollment Inquiry</option>
                      <option>Payment & Razorpay Receipt</option>
                      <option>Prop Firm Strategy Consultation</option>
                      <option>Technical Access Issue</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Your Message / Question</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your trading experience or questions about the syllabus..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs tracking-wide transition shadow-lg shadow-emerald-500/20 active:scale-98"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
