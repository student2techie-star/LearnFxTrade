# LearnFxTrade — Institutional Trading Academy Platform

A comprehensive, production-ready full-stack web application designed to sell Forex and Indian Market trading masterclasses, showcase verified prop firm payout certificates with high-resolution lightbox inspection, process online payments via **Razorpay**, and strictly protect course curriculum videos behind authenticated enrollment checks.

---

## 🌟 Key Features

### 1. Public Learning & Conversion Suite
- **Modern Dark UI**: Engineered with Tailwind CSS, custom glassmorphism panels, radiant emerald trading glows, and micro-animations.
- **Hero & Social Proof**: Live statistics counter ($65,000+ payouts, 1:3.5+ avg R:R, 1,200+ students, 0 hidden fees).
- **Curriculum Catalog**: Filterable course grid (Forex SMC, Indian Index Option Buying, Prop Firm Accelerator, Elite Psychology) with search and discount tags.
- **Course Detail & Free Preview**: Interactive syllabuses with immediate free preview video access.
- **Payout Certificates Lightbox**: Gallery of real prop firm (FTMO, FundedNext, Alpha Capital) and Indian broker payout statements with click-to-zoom modal and verification references.
- **Mentorship Journey & About**: Real breakdown of institutional order flow strategies and markets traded.
- **Direct Multi-Channel Support**: WhatsApp quick desk, Telegram support channel, and inquiry forms.
- **Statutory & Legal Compliance**: Risk Disclaimers, SEBI Non-Advisory Disclosures, Razorpay Terms & Refund Policies.

### 2. Student Portal & Video Protection
- **Personalized Student Dashboard**: Overview of enrolled courses, modular syllabus progression, and real-time status.
- **Classroom Video Player**: Embeds YouTube privacy-enhanced (`youtube-nocookie.com`) streams.
- **Dynamic Floating Watermark**: Renders dynamic student email & account ID across the player viewport as an active anti-piracy and screen-recording deterrent.
- **Zero Video ID Exposure**: Non-enrolled users and unauthenticated requests cannot query lesson video IDs from the API.
- **Payment Invoices & Receipts**: Downloadable order summaries and transaction IDs.

### 3. Razorpay Payments & Webhooks
- **Order Creation API** (`/api/checkout/create-order`): Creates Razorpay orders in INR paise with course metadata.
- **Signature Verification API** (`/api/checkout/verify`): Validates HMAC-SHA256 signatures server-side before activating access.
- **Idempotent Webhook Handler** (`/api/webhooks/razorpay`): Automatically captures `payment.captured` events and grants student enrollments asynchronously.
- **Sandbox Simulation Mode**: Built-in test simulation fallback for seamless developer evaluation without live keys.

### 4. Admin Management Panel (`/admin`)
- **Key Metrics Overview**: Real-time revenue counters, total registered students, published masterclasses, and verified proofs.
- **Course Publisher**: Add new courses, set INR pricing, levels, and categories.
- **Payout Certificate Uploader**: Add certificates, prop firm names, and dollar/rupee amounts to the public gallery.
- **Student Access Control**: Grant or revoke course access with 1 click for support handling or offline student onboarding.
- **Order Audit Trail**: Comprehensive ledger of all checkout orders and payment gateway statuses.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Payments**: Razorpay SDK & HMAC SHA-256 Signature Verification
- **Architecture**: Modular In-Memory Singleton Data Store (`src/lib/db.ts`) with quick pluggability for Supabase / PostgreSQL

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the project root:
```env
RAZORPAY_KEY_ID=rzp_test_yourKeyHere
RAZORPAY_KEY_SECRET=yourSecretHere
RAZORPAY_WEBHOOK_SECRET=yourWebhookSecretHere
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
*(If omitted, the platform gracefully runs in Developer Sandbox mode with mock orders).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👥 Demo Credentials

- **Student Account**: `student@example.com` (password: `password123`) — Has instant access to enrolled Forex Mastery course.
- **Admin Account**: `admin@learnfxtrade.com` (password: `password123`) — Full access to the `/admin` portal and all syllabuses.
