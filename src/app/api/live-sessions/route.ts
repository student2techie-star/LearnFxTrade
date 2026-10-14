import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { LiveSession } from '@/lib/types';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const _nocache = searchParams.get('_t');

  try {
    // 1. Fetch from Supabase database if configured
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('live_sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const mappedSessions: LiveSession[] = data.map((row: any) => ({
          id: row.id,
          title: row.title,
          topic: row.topic || '',
          category: row.category || 'Forex SMC',
          scheduledDate: row.scheduled_date || '',
          duration: row.duration || '90 Mins',
          priceInr: Number(row.price_inr) || 0,
          advanceFeeInr: Number(row.advance_fee_inr) || 0,
          hostMentor: row.host_mentor || 'Somnath (Lead Trader)',
          platform: row.platform || 'Zoom',
          meetingUrl: row.meeting_url || '',
          totalSeats: Number(row.total_seats) || 100,
          enrolledAttendees: Array.isArray(row.enrolled_attendees) ? row.enrolled_attendees : [],
          status: row.status || 'upcoming',
          description: row.description || '',
        }));

        return NextResponse.json(
          { sessions: mappedSessions },
          { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate' } }
        );
      }
    }

    // 2. Fallback to in-memory store
    const sessions = db.getLiveSessions();
    return NextResponse.json(
      { sessions },
      { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate' } }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to fetch live sessions';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, sessionId, studentName, studentEmail, phone, title, topic, category, scheduledDate, duration, priceInr, hostMentor, platform, meetingUrl, totalSeats, description } = body;

    // Action 1: Create new live session
    if (action === 'create') {
      if (!title || !scheduledDate) {
        return NextResponse.json({ error: 'Title and scheduled date are required' }, { status: 400 });
      }

      const generatedId = `live-${Date.now()}`;
      const advanceFee = body.advanceFeeInr !== undefined ? Number(body.advanceFeeInr) : Math.round((Number(priceInr) || 0) * 0.25);

      if (isSupabaseConfigured) {
        const { error } = await supabase.from('live_sessions').insert({
          id: generatedId,
          title,
          topic: topic || '',
          category: category || 'Forex SMC',
          scheduled_date: scheduledDate,
          duration: duration || '90 Mins',
          price_inr: Number(priceInr) || 0,
          advance_fee_inr: advanceFee,
          host_mentor: hostMentor || 'Somnath (Lead Trader)',
          platform: platform || 'Zoom',
          meeting_url: meetingUrl || '',
          total_seats: Number(totalSeats) || 100,
          enrolled_attendees: [],
          status: 'upcoming',
          description: description || '',
        });
        if (error) {
          console.error('Supabase live session insert error:', error);
        }
      }

      const newSession = db.createLiveSession({
        title,
        topic: topic || '',
        category: category || 'Forex SMC',
        scheduledDate,
        duration: duration || '90 Mins',
        priceInr: Number(priceInr) || 0,
        advanceFeeInr: advanceFee,
        hostMentor: hostMentor || 'Somnath (Lead Trader)',
        platform: platform || 'Zoom',
        meetingUrl: meetingUrl || '',
        totalSeats: Number(totalSeats) || 100,
        status: 'upcoming',
        description: description || '',
      });

      return NextResponse.json({ success: true, session: newSession });
    }

    // Action 2: Update existing live session
    if (action === 'update') {
      if (!sessionId) {
        return NextResponse.json({ error: 'Session ID is required to update' }, { status: 400 });
      }

      const updates: any = {};
      const dbUpdates: any = {};

      if (title !== undefined) { updates.title = title; dbUpdates.title = title; }
      if (topic !== undefined) { updates.topic = topic; dbUpdates.topic = topic; }
      if (category !== undefined) { updates.category = category; dbUpdates.category = category; }
      if (scheduledDate !== undefined) { updates.scheduledDate = scheduledDate; dbUpdates.scheduled_date = scheduledDate; }
      if (duration !== undefined) { updates.duration = duration; dbUpdates.duration = duration; }
      if (priceInr !== undefined) { updates.priceInr = Number(priceInr); dbUpdates.price_inr = Number(priceInr); }
      if (body.advanceFeeInr !== undefined) { updates.advanceFeeInr = Number(body.advanceFeeInr); dbUpdates.advance_fee_inr = Number(body.advanceFeeInr); }
      if (hostMentor !== undefined) { updates.hostMentor = hostMentor; dbUpdates.host_mentor = hostMentor; }
      if (platform !== undefined) { updates.platform = platform; dbUpdates.platform = platform; }
      if (meetingUrl !== undefined) { updates.meetingUrl = meetingUrl; dbUpdates.meeting_url = meetingUrl; }
      if (totalSeats !== undefined) { updates.totalSeats = Number(totalSeats); dbUpdates.total_seats = Number(totalSeats); }
      if (description !== undefined) { updates.description = description; dbUpdates.description = description; }
      if (body.status !== undefined) { updates.status = body.status; dbUpdates.status = body.status; }

      if (isSupabaseConfigured) {
        await supabase.from('live_sessions').update(dbUpdates).eq('id', sessionId);
      }

      const updated = db.updateLiveSession(sessionId, updates);
      return NextResponse.json({ success: true, session: updated });
    }

    // Action 3: Delete live session (Permanently deletes from Supabase & memory)
    if (action === 'delete') {
      if (!sessionId) {
        return NextResponse.json({ error: 'Session ID is required to delete' }, { status: 400 });
      }

      if (isSupabaseConfigured) {
        const { error } = await supabase.from('live_sessions').delete().eq('id', sessionId);
        if (error) {
          console.error('Supabase live session delete error:', error);
        }
      }

      const deleted = db.deleteLiveSession(sessionId);
      return NextResponse.json({ success: true, deleted });
    }

    // Action 4: Enroll attendee for a live session
    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    const contactParts = [studentEmail, phone].filter(Boolean).join(' | ');
    const attendee = studentName
      ? `${studentName} (${contactParts || 'Enrolled'})`
      : contactParts || 'Anonymous Trader';

    if (isSupabaseConfigured) {
      const { data } = await supabase.from('live_sessions').select('enrolled_attendees, total_seats').eq('id', sessionId).maybeSingle();
      if (data) {
        const existingAttendees = Array.isArray(data.enrolled_attendees) ? data.enrolled_attendees : [];
        if (!existingAttendees.includes(attendee)) {
          const updatedAttendees = [...existingAttendees, attendee];
          await supabase.from('live_sessions').update({ enrolled_attendees: updatedAttendees }).eq('id', sessionId);
        }
      }
    }

    const result = db.enrollInLiveSession(sessionId, attendee);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully enrolled for live session! Meeting link details will be shared.',
      session: result.session,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Live session operation failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

