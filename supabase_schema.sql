-- ==============================================================================
-- LearnFxTrade — Supabase PostgreSQL Database Setup Script
-- ==============================================================================
-- Run this script in your Supabase Dashboard -> "SQL Editor" -> "New Query"
-- It creates all 7 tables and sets up standard policies and sample data.

-- 1. Courses Table
CREATE TABLE IF NOT EXISTS public.courses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT DEFAULT '',
  description TEXT DEFAULT '',
  price_inr NUMERIC NOT NULL DEFAULT 4999,
  original_price_inr NUMERIC DEFAULT 14999,
  thumbnail_url TEXT DEFAULT '',
  category TEXT DEFAULT 'Forex',
  level TEXT DEFAULT 'Masterclass',
  is_published BOOLEAN DEFAULT true,
  features TEXT[] DEFAULT ARRAY[]::TEXT[],
  lessons_count INTEGER DEFAULT 0,
  total_duration TEXT DEFAULT '0h',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Lessons Table
CREATE TABLE IF NOT EXISTS public.lessons (
  id TEXT PRIMARY KEY,
  course_id TEXT REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  video_id TEXT NOT NULL,
  duration TEXT DEFAULT '15:00',
  order_no INTEGER DEFAULT 1,
  is_free_preview BOOLEAN DEFAULT false,
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Users / Students Table
CREATE TABLE IF NOT EXISTS public.users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'student',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enrollments Table (Access Control)
CREATE TABLE IF NOT EXISTS public.enrollments (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  course_id TEXT REFERENCES public.courses(id) ON DELETE CASCADE,
  order_id TEXT,
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  UNIQUE(user_id, course_id)
);

-- 5. Payout Certificates Table
CREATE TABLE IF NOT EXISTS public.certificates (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  firm_or_broker TEXT NOT NULL,
  amount TEXT NOT NULL,
  date TEXT DEFAULT '',
  image_url TEXT NOT NULL,
  account_type TEXT DEFAULT 'Prop Firm Funded',
  verified_ref TEXT,
  order_no INTEGER DEFAULT 1,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Offline Classroom Batches Table
CREATE TABLE IF NOT EXISTS public.offline_batches (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  city TEXT DEFAULT 'Chennai',
  venue TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  timing TEXT DEFAULT '9:30 AM - 5:30 PM IST',
  price_inr NUMERIC DEFAULT 14999,
  total_seats INTEGER DEFAULT 25,
  booked_seats INTEGER DEFAULT 0,
  status TEXT DEFAULT 'upcoming',
  notes TEXT DEFAULT '',
  enrolled_students TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Razorpay Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  user_email TEXT NOT NULL,
  course_id TEXT,
  course_title TEXT NOT NULL,
  razorpay_order_id TEXT UNIQUE NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT DEFAULT 'created',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- Row Level Security (RLS) Setup
-- ==============================================================================
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offline_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Drop any previous policies to allow clean re-runs
DROP POLICY IF EXISTS "Public read courses" ON public.courses;
DROP POLICY IF EXISTS "Admin write courses" ON public.courses;
DROP POLICY IF EXISTS "Public read lessons" ON public.lessons;
DROP POLICY IF EXISTS "Admin write lessons" ON public.lessons;
DROP POLICY IF EXISTS "Public read certificates" ON public.certificates;
DROP POLICY IF EXISTS "Admin write certificates" ON public.certificates;
DROP POLICY IF EXISTS "Public read offline batches" ON public.offline_batches;
DROP POLICY IF EXISTS "Public update offline batches" ON public.offline_batches;
DROP POLICY IF EXISTS "Admin write offline batches" ON public.offline_batches;
DROP POLICY IF EXISTS "Public read users" ON public.users;
DROP POLICY IF EXISTS "Public insert users" ON public.users;
DROP POLICY IF EXISTS "Admin write users" ON public.users;
DROP POLICY IF EXISTS "Public read enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Admin write enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Public read orders" ON public.orders;
DROP POLICY IF EXISTS "Public insert orders" ON public.orders;
DROP POLICY IF EXISTS "Admin write orders" ON public.orders;

-- 1. Courses & Lessons: Everyone can view; Full modifications allowed
CREATE POLICY "Public read courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Admin write courses" ON public.courses FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public read lessons" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Admin write lessons" ON public.lessons FOR ALL USING (true) WITH CHECK (true);

-- 2. Certificates: Everyone can view; Admin can add/edit
CREATE POLICY "Public read certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Admin write certificates" ON public.certificates FOR ALL USING (true) WITH CHECK (true);

-- 3. Offline Batches: Everyone can view & book seats (update seat count)
CREATE POLICY "Public read offline batches" ON public.offline_batches FOR SELECT USING (true);
CREATE POLICY "Public update offline batches" ON public.offline_batches FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Admin write offline batches" ON public.offline_batches FOR ALL USING (true) WITH CHECK (true);

-- 4. Users, Enrollments & Orders: Read & Insert allowed
CREATE POLICY "Public read users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Public insert users" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin write users" ON public.users FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public read enrollments" ON public.enrollments FOR SELECT USING (true);
CREATE POLICY "Admin write enrollments" ON public.enrollments FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public read orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Public insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin write orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- Sample Chennai Batches Initial Seed
-- ==============================================================================
INSERT INTO public.offline_batches (id, title, city, venue, start_date, end_date, timing, price_inr, total_seats, booked_seats, status, notes)
VALUES
  ('batch-chn-nov', 'Chennai 3-Day SMC & Prop Firm Classroom Bootcamp', 'Chennai', 'ITC Grand Chola / Guindy Tech Trading Hub, Anna Salai, Chennai', 'Nov 14, 2026', 'Nov 16, 2026', '9:30 AM - 5:30 PM IST', 14999, 25, 14, 'upcoming', 'Includes live trading market session on Friday, 1-on-1 desk review, lunch & course manual.'),
  ('batch-chn-dec', 'Chennai SMC Advanced Options & Forex Live Lab', 'Chennai', 'ITC Grand Chola / Guindy Tech Trading Hub, Anna Salai, Chennai', 'Dec 05, 2026', 'Dec 07, 2026', '9:30 AM - 5:30 PM IST', 14999, 20, 9, 'upcoming', 'Intensive live chart analysis with institutional order blocks & risk management.')
ON CONFLICT (id) DO NOTHING;
