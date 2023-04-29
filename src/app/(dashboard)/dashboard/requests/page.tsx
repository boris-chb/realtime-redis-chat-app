import FriendRequests from '@/components/FriendRequests';
import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { FC, use } from 'react';

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const userId = session.user.id;

  // users who sent incoming friend requests
  const incomingRequestUserId = (await fetchRedis(
    'smembers',
    `user:${userId}:incoming_friend_requests`
  )) as string[];

  const incomingFriendRequests: IncomingFriendRequest[] = await Promise.all(
    incomingRequestUserId.map(async (senderId) => {
      const senderData = (await fetchRedis('get', `user:${senderId}`)) as
        | string;

      const sender = JSON.parse(senderData);

      return {
        senderId,
        senderEmail: sender.email,
      };
    })
  );

  return (
    <main className='pt-8'>
      <h1 className='mb-8 text-5xl font-bold'>Friend requests</h1>
      <div className='flex flex-col gap-4'>
        <FriendRequests
          sessionId={userId}
          incomingFriendRequests={incomingFriendRequests}
        />
      </div>
    </main>
  );
};

export default Page;