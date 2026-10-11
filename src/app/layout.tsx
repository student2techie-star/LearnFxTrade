import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/lib/auth-context';
import Script from 'next/script';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'LearnFxTrade — Master Forex & Indian Market Trading',
  description:
    'Institutional Smart Money Concepts (SMC) Forex mastery and Nifty/BankNifty Price Action blueprints. Verified funded prop firm payout certificates and complete risk framework.',
  keywords: [
    'Forex Trading Course India',
    'Smart Money Concepts',
    'BankNifty Option Buying',
    'Nifty Price Action',
    'Prop Firm Funded Payouts',
    'FTMO Pass Strategy',
    'Razorpay Trading Course',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Razorpay Standard Checkout Script */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased flex flex-col selection:bg-emerald-500 selection:text-slate-950">
        <AuthProvider>
          <Suspense fallback={<div className="h-20 bg-slate-950 border-b border-slate-800" />}>
            <Navbar />
          </Suspense>
          <main className="flex-1">
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" /></div>}>
              {children}
            </Suspense>
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
