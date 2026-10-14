import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Course } from '@/lib/types';

export async function GET() {
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const mappedCourses: Course[] = data.map((row: any) => ({
          id: row.id,
          title: row.title,
          slug: row.slug,
          tagline: row.tagline || '',
          description: row.description || '',
          priceInr: Number(row.price_inr) || 0,
          originalPriceInr: Number(row.original_price_inr) || 0,
          thumbnailUrl: row.thumbnail_url || '',
          category: row.category || 'Forex',
          level: row.level || 'Intermediate',
          isPublished: row.is_published ?? true,
          features: Array.isArray(row.features) ? row.features : [],
          lessonsCount: Number(row.lessons_count) || 0,
          totalDuration: row.total_duration || '0h',
          createdAt: row.created_at || new Date().toISOString(),
        }));
        return NextResponse.json({ courses: mappedCourses });
      }
    }
  } catch (e) {
    console.warn('Supabase fetch courses failed, falling back:', e);
  }

  const courses = db.getCourses();
  return NextResponse.json({ courses });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = `course-${Date.now()}`;
    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const priceInr = Number(body.priceInr) || 0;
    const originalPriceInr = Number(body.originalPriceInr) || priceInr * 2;
    const thumbnailUrl = body.thumbnailUrl || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80';
    const features = body.features || ['Complete Syllabus', 'Community Access', 'Certificate of Completion'];

    if (isSupabaseConfigured) {
      const { error } = await supabase.from('courses').insert({
        id,
        title: body.title,
        slug,
        tagline: body.tagline || '',
        description: body.description || '',
        price_inr: priceInr,
        original_price_inr: originalPriceInr,
        thumbnail_url: thumbnailUrl,
        category: body.category || 'Forex',
        level: body.level || 'Intermediate',
        is_published: body.isPublished ?? true,
        features,
        lessons_count: 0,
        total_duration: '0h',
      });
      if (error) console.error('Supabase course insert error:', error);
    }

    const course = db.createCourse({
      slug,
      title: body.title,
      tagline: body.tagline || '',
      description: body.description || '',
      priceInr,
      originalPriceInr,
      thumbnailUrl,
      category: body.category || 'Forex',
      level: body.level || 'Intermediate',
      isPublished: body.isPublished ?? true,
      features,
      lessonsCount: 0,
      totalDuration: '0h',
    });

    return NextResponse.json({ success: true, course });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to create course';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

