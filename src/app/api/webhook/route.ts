// pages/api/webhooks/clerk.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import { Webhook } from 'svix';
import type { WebhookEvent } from '@clerk/nextjs/server'; // Optional for type safety

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || '';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const payload = (await buffer(req)).toString('utf8');

  // Normalize headers to strings (required by svix)
  const headers = {
    'svix-id': req.headers['svix-id'] as string,
    'svix-timestamp': req.headers['svix-timestamp'] as string,
    'svix-signature': req.headers['svix-signature'] as string,
  };

  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(payload, headers) as WebhookEvent;
  } catch (err) {
    console.error('❌ Webhook verification failed:', err);
    return res.status(400).json({ error: 'Invalid webhook signature' });
  }

  console.log('✅ Webhook received:', evt);

  // Handle event types
  if (evt.type === 'user.created') {
    const user = evt.data;
    console.log('🎉 New Clerk user:', user);
    // Save user to DB or trigger internal logic
  }

  return res.status(200).json({ success: true });
}
