import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const courses = db.getCourses();
  return NextResponse.json({ courses });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const course = db.createCourse({
      slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: body.title,
      tagline: body.tagline || '',
      description: body.description || '',
      priceInr: Number(body.priceInr) || 0,
      originalPriceInr: Number(body.originalPriceInr) || Number(body.priceInr) * 2,
      thumbnailUrl: body.thumbnailUrl || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
      category: body.category || 'Forex',
      level: body.level || 'Intermediate',
      isPublished: body.isPublished ?? true,
      features: body.features || ['Complete Syllabus', 'Discord Community', 'Certificate of Completion'],
      lessonsCount: 0,
      totalDuration: '0h',
    });
    return NextResponse.json({ success: true, course });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to create course';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
