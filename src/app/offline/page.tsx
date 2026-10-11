'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  X,
  Phone,
  Mail,
  User,
} from 'lucide-react';

interface OfflineBatch {
  id: string;
  title: string;
  city: string;
  venue: string;
  startDate: string;
  endDate: string;
  timing: string;
  priceInr: number;
  totalSeats: number;
  bookedSeats: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'sold_out';
  notes?: string;
  enrolledStudents?: string[];
}

export default function OfflineClassesPage() {
  const [batches, setBatches] = useState<OfflineBatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState<string>('all');

  // Booking Modal
  const [bookingModalBatch, setBookingModalBatch] = useState<OfflineBatch | null>(null);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const fetchBatches = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/offline-batches');
      if (res.ok) {
        const data = await res.json();
        setBatches(data.batches || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const cities = ['all', ...Array.from(new Set(batches.map((b) => b.city)))];

  const filteredBatches = batches.filter((b) => {
    if (selectedCity === 'all') return true;
    return b.city.toLowerCase() === selectedCity.toLowerCase();
  });

  const handleBookSeat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingModalBatch) return;

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/offline-batches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          batchId: bookingModalBatch.id,
          studentName: bookingForm.name,
          studentEmail: bookingForm.email,
          phone: bookingForm.phone,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setBookingSuccess(true);
        // Refresh batches list so booked seats immediately update on page
        fetchBatches();
      } else {
        alert(data.error || 'Failed to book seat');
      }
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#10b981] selection:text-black pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-[#222222] bg-gradient-to-b from-[#0a0a0a] to-black py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 px-4 py-1.5 text-xs font-bold text-[#10b981]">
            <Sparkles className="h-4 w-4" />
            <span>Classroom Training • Live Floor Execution • Chennai Hub</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Learn In-Person in Chennai. <br />
            <span className="text-[#10b981]">Institutional Offline Boot Camps</span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm sm:text-base text-[#a1a1aa] leading-relaxed">
            Held exclusively at our premier Chennai trading floor venue. Choose your preferred batch date to master Institutional Forex SMC & Nifty/BankNifty options with live mentor supervision.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-white/80">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-[#10b981]" /> ITC Grand Chola / Guindy, Chennai
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#10b981]" /> Live Market Hours Execution
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#10b981]" /> Strictly Limited Seats Per Batch
            </span>
          </div>
        </div>
      </section>


      {/* 2. BATCHES CONTAINER */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
        {/* City Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222222] pb-6">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#10b981]" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Select City:</span>
            <div className="flex flex-wrap gap-1.5">
              {cities.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCity(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition cursor-pointer ${
                    selectedCity === c
                      ? 'bg-[#10b981] text-black font-extrabold'
                      : 'bg-[#111111] text-[#a1a1aa] hover:text-white border border-[#222222]'
                  }`}
                >
                  {c === 'all' ? 'All Cities' : c}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-[#a1a1aa]">
            Showing <strong className="text-white">{filteredBatches.length}</strong> upcoming batches
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#10b981] border-t-transparent mx-auto" />
            <p className="text-xs text-[#a1a1aa]">Loading offline classroom batches...</p>
          </div>
        ) : filteredBatches.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-[#222222] bg-[#111111] space-y-3">
            <MapPin className="h-10 w-10 text-[#71717a] mx-auto" />
            <h3 className="text-base font-bold text-white">No Batches in {selectedCity} Right Now</h3>
            <p className="text-xs text-[#a1a1aa] max-w-md mx-auto">
              New classroom dates for this city will be published soon from the admin console. Check back shortly or view other cities!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBatches.map((b) => {
              const remainingSeats = Math.max(0, b.totalSeats - b.bookedSeats);
              const percentFilled = Math.min(100, Math.round((b.bookedSeats / b.totalSeats) * 100));
              const isSoldOut = remainingSeats === 0 || b.status === 'sold_out';

              return (
                <div
                  key={b.id}
                  className="rounded-3xl border border-[#222222] bg-[#111111] p-6 sm:p-8 space-y-6 flex flex-col justify-between transition hover:border-[#333333] shadow-xl"
                >
                  <div className="space-y-4">
                    {/* Top City Badge & Price */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981] text-xs font-bold uppercase mb-2">
                          <MapPin className="h-3.5 w-3.5" /> {b.city} Classroom
                        </div>
                        <h3 className="text-xl font-black text-white">{b.title}</h3>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-2xl font-black text-white font-mono">
                          ₹{b.priceInr.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[11px] text-[#a1a1aa]">All-Inclusive</span>
                      </div>
                    </div>

                    {/* Venue & Timing Details */}
                    <div className="space-y-2 rounded-2xl bg-black p-4 border border-[#222222] text-xs">
                      <div className="flex items-start gap-2 text-white/90">
                        <MapPin className="h-4 w-4 text-[#10b981] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] text-[#71717a] block uppercase font-bold">Venue Address</span>
                          <span className="font-semibold text-white">{b.venue}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-[#1a1a1a] text-[#a1a1aa]">
                        <Calendar className="h-4 w-4 text-[#10b981] shrink-0" />
                        <span>Dates: <strong className="text-white">{b.startDate} to {b.endDate}</strong></span>
                      </div>

                      <div className="flex items-center gap-2 text-[#a1a1aa]">
                        <Clock className="h-4 w-4 text-[#10b981] shrink-0" />
                        <span>Daily Hours: <strong className="text-white">{b.timing}</strong></span>
                      </div>
                    </div>

                    {/* Mentor Notes */}
                    {b.notes && (
                      <p className="text-xs text-white/80 italic bg-[#161618] p-3 rounded-xl border border-[#222222]">
                        &quot;{b.notes}&quot;
                      </p>
                    )}

                    {/* Live Seat Capacity Bar */}
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-[#a1a1aa] flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5 text-[#10b981]" />
                          Capacity: <span className="text-white">{b.bookedSeats} booked</span> / {b.totalSeats} seats
                        </span>

                        <span className={remainingSeats <= 5 ? 'text-amber-400 font-extrabold' : 'text-[#10b981]'}>
                          {isSoldOut ? 'Sold Out' : `Only ${remainingSeats} Seats Left!`}
                        </span>
                      </div>

                      <div className="h-2.5 w-full bg-black rounded-full overflow-hidden border border-[#222222]">
                        <div
                          style={{ width: `${percentFilled}%` }}
                          className={`h-full rounded-full transition-all duration-500 ${
                            isSoldOut
                              ? 'bg-rose-500'
                              : 'bg-gradient-to-r from-[#059669] to-[#10b981]'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Reserve Seat CTA */}
                  <div className="pt-4 border-t border-[#1f1f23]">
                    <button
                      disabled={isSoldOut}
                      onClick={() => {
                        setBookingModalBatch(b);
                        setBookingSuccess(false);
                      }}
                      className={`w-full py-3.5 rounded-2xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-2 ${
                        isSoldOut
                          ? 'bg-[#18181a] text-[#71717a] border border-[#27272a] cursor-not-allowed'
                          : 'bg-[#10b981] hover:bg-[#059669] text-black shadow-lg shadow-[#10b981]/20'
                      }`}
                    >
                      {isSoldOut ? (
                        'Batch Sold Out'
                      ) : (
                        <>
                          Reserve In-Person Seat <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 3. BOOKING MODAL */}
      {bookingModalBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl border border-[#222222] bg-[#111111] p-6 sm:p-8 shadow-2xl space-y-5">
            <button
              onClick={() => setBookingModalBatch(null)}
              className="absolute top-5 right-5 text-[#a1a1aa] hover:text-white cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {bookingSuccess ? (
              <div className="py-6 text-center space-y-4">
                <div className="h-14 w-14 rounded-full bg-[#10b981]/20 border border-[#10b981]/40 flex items-center justify-center mx-auto text-[#10b981]">
                  <CheckCircle2 className="h-8 w-8 stroke-[2.5]" />
                </div>
                <h3 className="text-xl font-black text-white">Seat Reserved Successfully!</h3>
                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  Thank you, <strong className="text-white">{bookingForm.name}</strong>. Your seat for the{' '}
                  <strong className="text-[#10b981]">{bookingModalBatch.city}</strong> offline workshop has been reserved and the live seat counter has been reduced by 1.
                </p>
                <div className="p-3 rounded-xl bg-black border border-[#222222] text-xs text-white/80">
                  Venue: {bookingModalBatch.venue} <br />
                  Dates: {bookingModalBatch.startDate} to {bookingModalBatch.endDate}
                </div>
                <button
                  onClick={() => setBookingModalBatch(null)}
                  className="w-full py-3 rounded-xl bg-[#10b981] text-black font-extrabold text-xs cursor-pointer hover:bg-[#059669] transition"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookSeat} className="space-y-4 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-[#10b981] uppercase tracking-wider">
                    Reserve Your Seat
                  </span>
                  <h3 className="text-lg font-black text-white mt-0.5">{bookingModalBatch.title}</h3>
                  <p className="text-xs text-[#a1a1aa]">
                    {bookingModalBatch.city} • {bookingModalBatch.startDate} (₹{bookingModalBatch.priceInr})
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-white font-semibold flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-[#10b981]" /> Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black border border-[#222222] text-white focus:border-[#10b981] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-white font-semibold flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-[#10b981]" /> Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black border border-[#222222] text-white focus:border-[#10b981] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-white font-semibold flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-[#10b981]" /> WhatsApp / Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black border border-[#222222] text-white focus:border-[#10b981] focus:outline-none font-mono"
                  />
                </div>

                <div className="p-3 rounded-xl bg-black/60 border border-[#222222] text-[11px] text-[#a1a1aa] space-y-1">
                  <div className="flex justify-between">
                    <span>Batch Fee:</span>
                    <strong className="text-white font-mono">₹{bookingModalBatch.priceInr}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Seats Remaining:</span>
                    <strong className="text-[#10b981]">
                      {bookingModalBatch.totalSeats - bookingModalBatch.bookedSeats} seats
                    </strong>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-black font-black text-xs transition cursor-pointer shadow-lg shadow-[#10b981]/20"
                >
                  {isSubmitting ? 'Reserving Seat...' : 'Confirm Seat Booking'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
