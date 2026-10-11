import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyRazorpaySignature } from '@/lib/razorpay';

export async function POST(req: Request) {
  try {
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      userId,
      courseId,
    } = await req.json();

    if (!razorpayOrderId || !userId || !courseId) {
      return NextResponse.json({ error: 'Missing payment parameters' }, { status: 400 });
    }

    // Verify HMAC SHA256 Signature
    const isValid = verifyRazorpaySignature(
      razorpayOrderId,
      razorpayPaymentId || 'pay_simulated',
      razorpaySignature || 'sig_simulated'
    );

    if (!isValid) {
      return NextResponse.json(
        { error: 'Payment signature verification failed. Untrusted request.' },
        { status: 400 }
      );
    }

    // 1. Mark Order as paid
    db.updateOrderStatus(razorpayOrderId, 'paid');

    // 2. Grant Enrollment (Idempotent)
    const enrollment = db.grantEnrollment(userId, courseId, razorpayOrderId);

    return NextResponse.json({
      success: true,
      message: 'Payment verified and course access granted successfully.',
      enrollment,
    });
  } catch (err: unknown) {
    console.error('Error verifying payment:', err);
    const errorMessage = err instanceof Error ? err.message : 'Verification failed';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
