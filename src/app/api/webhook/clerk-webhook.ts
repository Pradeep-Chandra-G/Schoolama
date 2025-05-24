// pages/api/webhooks/clerk.ts or app/api/webhooks/clerk/route.ts
import { clerkClient } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  const { data, type } = await req.json();
  
  if (type === 'user.created') {
    const { id, unsafe_metadata } = data;
    
    if (unsafe_metadata?.role) {
      await clerkClient.users.updateUser(id, {
        publicMetadata: {
          role: unsafe_metadata.role
        }
      });
    }
  }
  
  return new Response('OK', { status: 200 });
}
