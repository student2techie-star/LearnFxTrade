import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const certificates = db.getCertificates();
  return NextResponse.json({ certificates });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const certificate = db.createCertificate({
      title: body.title,
      firmOrBroker: body.firmOrBroker,
      amount: body.amount,
      date: body.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      imageUrl: body.imageUrl,
      accountType: body.accountType || 'Prop Firm Funded',
      verifiedRef: body.verifiedRef || `CERT-${Date.now().toString().slice(-6)}`,
      orderNo: Number(body.orderNo) || 1,
      isVisible: true,
    });
    return NextResponse.json({ success: true, certificate });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to create certificate';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
