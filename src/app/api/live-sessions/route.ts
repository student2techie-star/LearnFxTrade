import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  // Reading req.url automatically marks the route dynamic without conflicting with cacheComponents
  const { searchParams } = new URL(req.url);
  const _nocache = searchParams.get('_t');
  try {
    const sessions = db.getLiveSessions();
    return NextResponse.json(
      { sessions },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to fetch live sessions';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, sessionId, studentName, studentEmail, phone, title, topic, category, scheduledDate, duration, priceInr, hostMentor, platform, totalSeats, description } = body;

    // Action 1: Create new live session (admin or mentor)
    if (action === 'create') {
      if (!title || !scheduledDate) {
        return NextResponse.json({ error: 'Title and scheduled date are required' }, { status: 400 });
      }
      const newSession = db.createLiveSession({
        title,
        topic: topic || '',
        category: category || 'Forex SMC',
        scheduledDate,
        duration: duration || '60 Mins',
        priceInr: Number(priceInr) || 0,
        advanceFeeInr: body.advanceFeeInr !== undefined ? Number(body.advanceFeeInr) : Math.round((Number(priceInr) || 0) * 0.25),
        hostMentor: hostMentor || 'Somnath (Lead Trader)',
        platform: platform || 'Zoom',
        meetingUrl: body.meetingUrl || '',
        totalSeats: Number(totalSeats) || 100,
        status: 'upcoming',
        description: description || '',
      });
      return NextResponse.json({ success: true, session: newSession });
    }

    // Action 1.5: Delete live session
    if (action === 'delete') {
      if (!sessionId) {
        return NextResponse.json({ error: 'Session ID is required to delete' }, { status: 400 });
      }
      const deleted = db.deleteLiveSession(sessionId);
      return NextResponse.json({ success: true, deleted });
    }

    // Action 2: Enroll attendee for a live session
    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    const contactParts = [studentEmail, phone].filter(Boolean).join(' | ');
    const attendee = studentName
      ? `${studentName} (${contactParts || 'Enrolled'})`
      : contactParts || 'Anonymous Trader';

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
