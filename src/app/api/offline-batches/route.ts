import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { OfflineBatch } from '@/lib/types';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get('reset') === 'true') {
    db.resetOfflineBatches();
  }

  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('offline_batches')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const mappedBatches: OfflineBatch[] = data.map((row: any) => ({
          id: row.id,
          title: row.title,
          city: row.city || 'Chennai',
          venue: row.venue,
          startDate: row.start_date,
          endDate: row.end_date,
          timing: row.timing || '9:30 AM - 5:30 PM IST',
          priceInr: Number(row.price_inr) || 14999,
          advanceFeeInr: Number(row.advance_fee_inr) || 2999,
          totalSeats: Number(row.total_seats) || 25,
          bookedSeats: Number(row.booked_seats) || 0,
          status: row.status || 'upcoming',
          notes: row.notes || '',
          enrolledStudents: Array.isArray(row.enrolled_students) ? row.enrolled_students : [],
        }));
        return NextResponse.json({ batches: mappedBatches });
      }
    }
  } catch (e) {
    console.warn('Supabase fetch offline_batches failed:', e);
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

    if (isSupabaseConfigured) {
      const { data: batchData } = await supabase
        .from('offline_batches')
        .select('*')
        .eq('id', batchId)
        .maybeSingle();

      if (batchData) {
        const enrolledStudents: string[] = Array.isArray(batchData.enrolled_students) ? batchData.enrolled_students : [];
        const bookedSeats = (Number(batchData.booked_seats) || 0) + 1;
        const totalSeats = Number(batchData.total_seats) || 25;
        const status = bookedSeats >= totalSeats ? 'sold_out' : (batchData.status || 'upcoming');
        const updatedList = [...enrolledStudents, attendee];

        await supabase
          .from('offline_batches')
          .update({
            booked_seats: bookedSeats,
            enrolled_students: updatedList,
            status,
          })
          .eq('id', batchId);

        return NextResponse.json({
          success: true,
          message: 'Seat booked successfully! Remaining seats updated.',
          batch: {
            ...batchData,
            bookedSeats,
            enrolledStudents: updatedList,
            status,
          },
        });
      }
    }

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

