import ChatInput from '@/components/ChatInput';
import Messages from '@/components/Messages';
import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { messageArrayValidator } from '@/lib/validation/message';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
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

  const partnerUser = (await db.get(`user:${partnerId}`)) as User;
  const initialMessages = await getChatMessages(chatId);

  const chatHeader = <></>;

  return (
    <div className='flex-1 justify-between flex flex-col h-full max-h-[calc(100vh-6rem)]'>
      <div className='flex justify-between py-3 border-b-2 border-gray-200 sm:items-center'>
        <div className='relative flex items-center space-x-4'>
          <div className='relative'>
            <div className='relative w-8 h-8 sm:w-12 sm:h-12'>
              <Image
                fill
                src={partnerUser.image}
                alt={`${partnerUser.name}-avatar`}
                referrerPolicy='no-referrer'
                className='rounded-full'
              />
            </div>
          </div>

          <div className='flex flex-col leading-tight'>
            <div className='flex items-center text-xl'>
              <span className='mr-3 font-semibold text-gray-700'>
                {partnerUser.name}
              </span>
            </div>
            <span className='text-sm text-gray-600'>{partnerUser.email}</span>
          </div>
        </div>
      </div>
      <Messages initialMessages={[]} userId={userId} />
      <ChatInput chatId={chatId} />
    </div>
  );
};

export default Page;
