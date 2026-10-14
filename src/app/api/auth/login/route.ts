import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import crypto from 'crypto';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password.trim()).digest('hex');
}

export async function POST(req: Request) {
  try {
    const { email, password, role } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const inputHash = hashPassword(password);

    // 1. DATABASE AUTHENTICATION VIA SUPABASE
    let dbUser = null;
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .ilike('email', trimmedEmail)
          .maybeSingle();

        if (error) {
          console.warn('Supabase users query warning:', error.message);
        } else if (data) {
          dbUser = data;
        }
      } catch (dbErr) {
        console.warn('Supabase query error:', dbErr);
      }
    }

    // 2. Fallback to local memory store if Supabase user is not found
    if (!dbUser) {
      dbUser = db.getUserByEmail(trimmedEmail);
    }

    // If logging in as admin or user has admin role in DB
    const isTargetingAdmin = role === 'admin' || (dbUser && dbUser.role === 'admin');

    if (isTargetingAdmin) {
      // Must exist in Database with role === 'admin'
      if (!dbUser || dbUser.role !== 'admin') {
        return NextResponse.json(
          { error: 'Admin account does not exist in the database with admin privileges.' },
          { status: 403 }
        );
      }

      // Password verification from database
      const storedPassword = dbUser.password_hash || dbUser.password;
      const isValidPassword =
        storedPassword &&
        (storedPassword === inputHash || storedPassword === password || storedPassword === password.trim());

      // If no password column exists in Supabase yet, allow initial bootstrap password from database sync
      const fallbackEnvPassword = process.env.ADMIN_PASSWORD;
      const isEnvMatch = fallbackEnvPassword && (password === fallbackEnvPassword || inputHash === hashPassword(fallbackEnvPassword));

      if (!isValidPassword && !isEnvMatch) {
        return NextResponse.json(
          { error: 'Invalid admin credentials. Please enter the correct password from your database.' },
          { status: 401 }
        );
      }
    }

    // Sync user into active runtime memory store
    let user = db.getUserByEmail(trimmedEmail);
    if (!user) {
      user = db.createUser(
        dbUser ? dbUser.name : trimmedEmail.split('@')[0].toUpperCase(),
        trimmedEmail,
        dbUser?.phone || '+91 99999 88888',
        dbUser?.role === 'admin' ? 'admin' : (role === 'admin' ? 'admin' : 'student'),
        inputHash
      );
    } else if (dbUser && dbUser.role) {
      user.role = dbUser.role;
    }

    // Safe sanitized response without password hashes
    const sanitizedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      createdAt: user.createdAt,
    };

    return NextResponse.json({ success: true, user: sanitizedUser });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}


