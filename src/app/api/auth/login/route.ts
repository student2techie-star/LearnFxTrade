import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email, role } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    let user = db.getUserByEmail(email);
    if (!user) {
      // Auto-create demo user if not existing
      user = db.createUser(
        email.split('@')[0].toUpperCase(),
        email,
        '+91 99999 88888',
        role === 'admin' ? 'admin' : 'student'
      );
    }

    return NextResponse.json({ success: true, user });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
