import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/lib/auth-context';
import Script from 'next/script';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'LearnFxTrade — Track All Markets & Trading Masterclasses (India)',
  description:
    'Institutional Smart Money Concepts (SMC) Forex mastery and Nifty/BankNifty Price Action blueprints. Verified funded prop firm payout certificates and complete risk framework.',
  keywords: [
    'Forex Trading Course India',
    'TradingView India Course',
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
    <html lang="en" className="dark theme-dark">
      <head>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </head>
      <body className="min-h-screen bg-black text-white antialiased flex flex-col selection:bg-[#10b981] selection:text-black">
        <AuthProvider>
          <Suspense fallback={<div className="h-20 bg-black border-b border-[#222222]" />}>
            <Navbar />
          </Suspense>
          <main className="flex-1">
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-[#10b981] border-t-transparent" /></div>}>
              {children}
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}
