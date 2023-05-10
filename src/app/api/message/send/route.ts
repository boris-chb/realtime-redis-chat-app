import { handleZodError } from '@/helpers/handlerZodError';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { pusherServer } from '@/lib/pusher';
import { toPusherKey } from '@/lib/utils';
import { Message, messageValidator } from '@/lib/validation/message';
import { nanoid } from 'nanoid';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const { text, chatId }: { text: string; chatId: string } = await req.json();
    const session = await getServerSession(authOptions);
    if (!session) return new Response('Unauthorized', { status: 401 });

    const senderId = session.user.id;
    const [userId1, userId2] = chatId.split('--');
    const receiverId = userId1 === senderId ? userId2 : userId1;

    // TODO
    // if (session.user.id !== userId1 || session.user.id !== userId2) {
    //   return new Response('Unauthorized', { status: 401 });
    // }

    const timestamp = Date.now();

    const message = messageValidator.parse({
      id: nanoid(),
      senderId,
      timestamp,
      body: text,
    });

    // notify clients
    pusherServer.trigger(toPusherKey(`chat:${chatId}`), 'new_message', message);

    await db.zadd(`chat:${chatId}:messages`, {
      score: Date.now(),
      member: JSON.stringify(message),
    });

    return new Response('OK');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleZodError(error);
    } else if (error instanceof Error) {
      return new Response(error.message, { status: 400 });
    }

    return new Response('Server error', { status: 500 });
  }
}
