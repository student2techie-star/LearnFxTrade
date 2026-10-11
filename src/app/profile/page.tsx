'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import {
  User as UserIcon,
  Mail,
  Phone,
  Lock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Save,
  ArrowLeft,
  KeyRound,
  GraduationCap,
  Eye,
  EyeOff
} from 'lucide-react';

export default function UserProfilePage() {
  const { user, updateUser, isLoading } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md py-24 text-center px-4 space-y-4">
        <UserIcon className="h-12 w-12 text-[#a1a1aa] mx-auto" />
        <h2 className="text-2xl font-bold text-white">Sign In Required</h2>
        <p className="text-xs text-[#a1a1aa]">
          Please sign in to manage your profile, mobile number, and security settings.
        </p>
        <Link
          href="/login"
          className="inline-block px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!name.trim()) {
      setStatusMessage({ type: 'error', text: 'Full Name cannot be empty.' });
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    if (newPassword) {
      if (newPassword.length < 6) {
        setStatusMessage({ type: 'error', text: 'New password must be at least 6 characters long.' });
        return;
      }
      if (newPassword !== confirmPassword) {
        setStatusMessage({ type: 'error', text: 'New password and Confirm password do not match.' });
        return;
      }
    }

    setSaving(true);
    try {
      await updateUser({
        name,
        email,
        phone,
        newPassword: newPassword || undefined,
      });

      setStatusMessage({ type: 'success', text: 'Profile updated successfully!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update profile';
      setStatusMessage({ type: 'error', text: msg });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 pb-24">
      {/* Top Breadcrumb Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#a1a1aa] hover:text-emerald-400 transition mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to My Classroom
          </Link>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <UserIcon className="h-8 w-8 text-emerald-400" /> Account & Profile Settings
          </h1>
          <p className="text-xs sm:text-sm text-[#a1a1aa] mt-1">
            Manage your personal profile, registered phone number, email address, and account password.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#111111] text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" /> Role: {user.role.toUpperCase()}
          </span>
        </div>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-2xl border flex items-center gap-3 text-xs sm:text-sm font-semibold ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Personal Contact Details */}
        <div className="rounded-3xl border border-[#222222] bg-[#0c0c0c] p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#1c1c1c] pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-emerald-400" /> Personal Contact Details
            </h2>
            <p className="text-xs text-[#a1a1aa] mt-1">
              Your details are used for certificate issuance and offline batch communication.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-[#d1d4dc] mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-3.5 h-4 w-4 text-[#71717a]" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-[#141414] border border-[#262626] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#71717a] focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#d1d4dc] mb-1.5">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-[#71717a]" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full bg-[#141414] border border-[#262626] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#71717a] focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
              <p className="text-[11px] text-[#71717a] mt-1">
                Used for SMS updates and Chennai offline venue directions.
              </p>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#d1d4dc] mb-1.5">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[#71717a]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full bg-[#141414] border border-[#262626] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#71717a] focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
              <p className="text-[11px] text-[#71717a] mt-1">
                Your primary login email and invoice receipt destination.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Password & Security */}
        <div className="rounded-3xl border border-[#222222] bg-[#0c0c0c] p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#1c1c1c] pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <KeyRound className="h-5 w-5 text-amber-400" /> Security & Password
            </h2>
            <p className="text-xs text-[#a1a1aa] mt-1">
              Leave these fields blank if you do not want to change your current password.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-[#d1d4dc] mb-1.5">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-[#71717a]" />
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#141414] border border-[#262626] rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-[#71717a] focus:outline-none focus:border-emerald-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3.5 top-3.5 text-[#71717a] hover:text-white transition"
                  title={showNewPassword ? 'Hide password' : 'Show password'}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-[11px] text-[#71717a] mt-1">Minimum 6 characters.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#d1d4dc] mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-[#71717a]" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#141414] border border-[#262626] rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-[#71717a] focus:outline-none focus:border-emerald-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-3.5 text-[#71717a] hover:text-white transition"
                  title={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/dashboard"
            className="px-5 py-3 rounded-xl text-xs font-semibold text-[#a1a1aa] hover:text-white transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Profile Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
