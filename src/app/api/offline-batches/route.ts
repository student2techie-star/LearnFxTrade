import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get('reset') === 'true') {
    db.resetOfflineBatches();
  }
  const batches = db.getOfflineBatches();
  return NextResponse.json({ batches });
}


export async function POST(req: Request) {
  try {
    const { batchId, studentName, studentEmail, phone } = await req.json();

    if (!batchId) {
      return NextResponse.json({ error: 'Batch ID is required' }, { status: 400 });
    }

    const attendee = studentName ? `${studentName} (${studentEmail || phone || 'Registered'})` : 'Student Attendee';
    const result = db.bookOfflineSeat(batchId, attendee);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Seat booked successfully! Remaining seats updated.',
      batch: result.batch,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Booking failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
