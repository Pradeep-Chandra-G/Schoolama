// app/api/clerk-webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { clerkClient } from '@clerk/nextjs/server';
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

  console.log('✅ Clerk Webhook event received:', evt.type);

  // Handle specific events
  if (evt.type === 'user.created') {
    const user = evt.data;
    console.log('🎉 New Clerk user created:', user.id);
  }

  // Handle role updates
  if (evt.type === 'user.updated') {
    const user = evt.data;
    console.log('👤 User updated:', user.id);

    // Check if role was set in unsafeMetadata
    const role = user.unsafe_metadata?.role;

    if (role && typeof role === 'string') {
      console.log('🔄 Moving role from unsafe to public metadata:', role);

      try {
        // Update the user's public metadata with the role
        await clerkClient.users.updateUser(user.id, {
          publicMetadata: {
            ...user.public_metadata,
            role: role
          },
          // Clear the role from unsafe metadata
          unsafeMetadata: {
            ...user.unsafe_metadata,
            role: undefined
          }
        });

        console.log('✅ Role successfully moved to public metadata');
      } catch (error) {
        console.error('❌ Failed to update user metadata:', error);
        return NextResponse.json({ error: 'Failed to update user metadata' }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ success: true }, { status: 200 });
}