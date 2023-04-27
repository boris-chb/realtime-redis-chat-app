import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { addContactValidator } from '@/lib/validation/add-contact';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new Response('Unauthorized', { status: 401 });

    const body = await request.json();
    const { email: emailToAdd } = addContactValidator.parse(body.email);

    // get ID of the user with searched email

    const idToAdd = (await fetchRedis(
      'get',
      `user:email:${emailToAdd}`
    )) as string;

    if (!idToAdd || idToAdd === session.user.id)
      return new Response('Could not find user');

    // friend request already sent
    const requestAlreadySent = (await fetchRedis(
      'sismember',
      `user:${idToAdd}:incoming_friend_request`,
      session.user.id
    )) as 0 | 1;

    // check if user is already added to contact list
    const contactAlreadyExists = (await fetchRedis(
      'sismember',
      `user:${idToAdd}:contacts`,
      session.user.id
    )) as 0 | 1;

    if (requestAlreadySent || contactAlreadyExists) {
      return new Response('Already in contact list', { status: 400 });
    }

    // send friend request
    db.sadd(`user:${idToAdd}:incoming_friend_request`, session.user.id);

    return new Response('OK', { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request payload', { status: 422 });
    }

    return new Response('Invalid request');
  }
}