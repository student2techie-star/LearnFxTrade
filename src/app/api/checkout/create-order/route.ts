import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { razorpayInstance, isLiveRazorpay, RAZORPAY_KEY_ID } from '@/lib/razorpay';

export async function POST(req: Request) {
  try {
    const { courseId, userId, userEmail } = await req.json();

    if (!courseId || !userId) {
      return NextResponse.json({ error: 'Missing courseId or userId' }, { status: 400 });
    }

    let course: any = null;
    if (isSupabaseConfigured) {
      const { data } = await supabase
        .from('courses')
        .select('*')
        .or(`id.eq.${courseId},slug.eq.${courseId}`)
        .maybeSingle();

      if (data) {
        course = {
          id: data.id,
          title: data.title,
          priceInr: Number(data.price_inr) || 0,
        };
      }
    }

    if (!course) {
      course = db.getCourseById(courseId) || db.getCourseBySlug(courseId);
    }

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Amount in paise (1 INR = 100 paise)
    const amountInPaise = Math.round(course.priceInr * 100);
    let razorpayOrderId = `order_sim_${Date.now()}`;

    if (isLiveRazorpay && razorpayInstance) {
      const order = await razorpayInstance.orders.create({
        amount: amountInPaise,
        currency: 'INR',
        receipt: `rcpt_${Date.now()}`,
        notes: {
          courseId: course.id,
          userId,
          courseTitle: course.title,
        },
      });
      razorpayOrderId = order.id;
    }

    // Save order in Supabase DB
    const orderId = `order-${Date.now()}`;
    if (isSupabaseConfigured) {
      await supabase.from('orders').insert({
        id: orderId,
        user_id: userId,
        user_email: userEmail || 'student@example.com',
        course_id: course.id,
        course_title: course.title,
        razorpay_order_id: razorpayOrderId,
        amount: course.priceInr,
        currency: 'INR',
        status: 'created',
      });
    }

    const savedOrder = db.createOrder({
      userId,
      userEmail: userEmail || 'student@example.com',
      courseId: course.id,
      courseTitle: course.title,
      razorpayOrderId,
      amount: course.priceInr,
      currency: 'INR',
      status: 'created',
    });

    return NextResponse.json({
      success: true,
      orderId: savedOrder.id,
      razorpayOrderId,
      amount: course.priceInr,
      amountInPaise,
      currency: 'INR',
      courseTitle: course.title,
      keyId: RAZORPAY_KEY_ID,
      isLive: isLiveRazorpay,
    });
  } catch (err: unknown) {
    console.error('Error creating checkout order:', err);
    const errorMessage = err instanceof Error ? err.message : 'Checkout order creation failed';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
