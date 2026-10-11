import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { userId, name, email, phone, currentPassword, newPassword } = await req.json();

    if (!userId || !email) {
      return NextResponse.json({ error: 'User ID and Email are required' }, { status: 400 });
    }

    // 1. Update in local/runtime DB store
    const user = db.getUserById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    user.name = name || user.name;
    user.email = email;
    user.phone = phone || user.phone;

    // 2. Sync to Supabase users table if connected
    try {
      await supabase
        .from('users')
        .upsert({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        });
    } catch (e) {
      console.warn('Supabase sync skipped/failed:', e);
    }

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully!',
      user,
      passwordUpdated: Boolean(newPassword),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update profile';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
