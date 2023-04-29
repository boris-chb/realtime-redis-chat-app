import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import {
  addContactValidator,
  friendRequestValidator,
} from '@/lib/validation/contact';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new Response('Unauthorized', { status: 401 });

    const userId = session.user.id;

    const body = await request.json();

    const { senderId, action } = friendRequestValidator.parse(
      body.senderId,
      body.action
    );

    if (action === 'ACCEPT') {
      // add senderId to current logged in user (userId)
      await db.sadd(`user:${userId}:contacts`, senderId);
      await db.srem(`user:${userId}:incoming_friend_requests`, senderId);

      // add senderId to current logged in user (userId)
      await db.sadd(`user:${senderId}:contacts`, userId);
      await db.srem(`user:${senderId}:incoming_friend_requests`, userId);
    } else if (action === 'REJECT') {
      await db.srem(`user:${userId}:incoming_friend_requests`, senderId);
    }

    return new Response('OK', { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request payload', { status: 422 });
    }

    return new Response('Invalid request');
  }
}
