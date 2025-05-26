import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';
import type { WebhookEvent } from '@clerk/nextjs/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const payload = await req.text(); // raw body as string

  const svixHeaders = {
    'svix-id': req.headers.get('svix-id') ?? '',
    'svix-timestamp': req.headers.get('svix-timestamp') ?? '',
    'svix-signature': req.headers.get('svix-signature') ?? '',
  };

  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || '';
  const webhook = new Webhook(webhookSecret);

  let evt: WebhookEvent;

  try {
    evt = webhook.verify(payload, svixHeaders) as WebhookEvent;
  } catch (err) {
    console.error('❌ Webhook verification failed:', err);
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
  }

  console.log('✅ Clerk Webhook event received:', evt);

  // Handle specific events
  if (evt.type === 'user.created') {
    const user = evt.data;
    console.log('🎉 New Clerk user created:', user);
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
