import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { messageArrayValidator } from '@/lib/validation/message';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { FC } from 'react';

interface PageProps {
  params: {
    chatId: string;
  };
}

const getChatMessages = async (chatId: string) => {
  try {
    const results: string[] = await fetchRedis(
      'zrange',
      `chat:${chatId}:messages`,
      0,
      -1
    );

    const dbMessages = results.map((message) => JSON.parse(message) as Message);

    const reversedMessages = dbMessages.reverse();

    const messages = messageArrayValidator.parse(reversedMessages);

    return messages;
  } catch (error) {
    notFound();
  }
};

const Page = async ({ params }: PageProps) => {
  const { chatId } = params;
  const session = await getServerSession(authOptions);
  if (!session) return;
  const user = session.user;
  const [userId1, userId2] = chatId.split('--');

  const partnerId = userId1 === user.id ? userId2 : userId1;
  const userId = userId1 === user.id ? userId2 : userId1;

  if (user.id !== userId) {
    // is not part of this chat!
    // notFound();
  }

  const partnerUser = JSON.parse(
    (await db.get(`user:${partnerId}`)) as string
  ) as User;

  return <div>{123}</div>;
};

export default Page;
