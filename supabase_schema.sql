# ==============================================================================
# LearnFxTrade — Supabase PostgreSQL Database Setup Script
# ==============================================================================
# Copy and run this script in your Supabase Dashboard -> "SQL Editor" -> "New Query"
# It creates all 6 core tables with Row Level Security (RLS) policies.

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

-- Enable Row Level Security (RLS)
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offline_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Public Read Policies (Allow anyone to view published courses, certificates, and offline batches)
CREATE POLICY "Allow public read courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Allow public read certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Allow public read offline batches" ON public.offline_batches FOR SELECT USING (true);
CREATE POLICY "Allow public read preview lessons" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Allow authenticated read users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow authenticated read enrollments" ON public.enrollments FOR SELECT USING (true);
CREATE POLICY "Allow public insert users" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert orders" ON public.orders FOR INSERT WITH CHECK (true);
