import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { PayoutCertificate } from '@/lib/types';

export async function GET() {
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('order_no', { ascending: true });

      if (!error && data && data.length > 0) {
        const mappedCerts: PayoutCertificate[] = data.map((row: any) => ({
          id: row.id,
          title: row.title,
          firmOrBroker: row.firm_or_broker,
          amount: row.amount,
          date: row.date || '',
          imageUrl: row.image_url,
          accountType: row.account_type || 'Prop Firm Funded',
          verifiedRef: row.verified_ref || '',
          orderNo: Number(row.order_no) || 1,
          isVisible: row.is_visible ?? true,
          createdAt: row.created_at || new Date().toISOString(),
        }));
        return NextResponse.json({ certificates: mappedCerts });
      }
    }
  } catch (e) {
    console.warn('Supabase fetch certificates failed, falling back:', e);
  }

  const certificates = db.getCertificates();
  return NextResponse.json({ certificates });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = `cert-${Date.now()}`;
    const date = body.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const verifiedRef = body.verifiedRef || `CERT-${Date.now().toString().slice(-6)}`;
    const orderNo = Number(body.orderNo) || 1;

    if (isSupabaseConfigured) {
      const { error } = await supabase.from('certificates').insert({
        id,
        title: body.title,
        firm_or_broker: body.firmOrBroker,
        amount: body.amount,
        date,
        image_url: body.imageUrl,
        account_type: body.accountType || 'Prop Firm Funded',
        verified_ref: verifiedRef,
        order_no: orderNo,
        is_visible: true,
      });
      if (error) console.error('Supabase certificate insert error:', error);
    }

    const certificate = db.createCertificate({
      title: body.title,
      firmOrBroker: body.firmOrBroker,
      amount: body.amount,
      date,
      imageUrl: body.imageUrl,
      accountType: body.accountType || 'Prop Firm Funded',
      verifiedRef,
      orderNo,
      isVisible: true,
    });

    return NextResponse.json({ success: true, certificate });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to create certificate';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

