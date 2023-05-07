'use client';

import { pusherClient } from '@/lib/pusher';
import { toPusherKey } from '@/lib/utils';
import axios from 'axios';
import { Check, UserPlus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequest[];
  currentUserId: string;
}

const FriendRequests: FC<FriendRequestsProps> = ({
  incomingFriendRequests,
  currentUserId,
}) => {
  const router = useRouter();
  const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(
    incomingFriendRequests
  );

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${currentUserId}:incoming_friend_requests`)
    );

    const friendRequestHandler = () => {
      console.log('new friend request');
    };

    pusherClient.bind('incoming_friend_requests', friendRequestHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${currentUserId}:incoming_friend_requests`)
      );
      pusherClient.unbind('incoming_friend_requests', friendRequestHandler);
    };
  }, []);

  const handleFriendRequest = async (
    senderId: string,
    action: 'ACCEPT' | 'REJECT'
  ) => {
    await axios.post('/api/contacts/request', { senderId, action });

    setFriendRequests((prev) =>
      prev.filter((req) => req.senderId !== senderId)
    );

    router.refresh();
  };

  return (
    <>
      {friendRequests.length === 0 ? (
        <p className='text-sm'>No requests :( Perhaps add a friend yourself?</p>
      ) : (
        friendRequests.map(({ senderEmail, senderId }) => (
          <div key={senderId} className='flex items-center gap-4'>
            <UserPlus className='text-black' />
            <p className='text-lg font-medium'>{senderEmail}</p>
            <button
              aria-label='accept friend request'
              onClick={() => handleFriendRequest(senderId, 'ACCEPT')}
              className='grid w-8 h-8 transition bg-indigo-600 rounded-full hover:bg-indigo-700 place-items-center hover:shadow-md'
            >
              <Check className='w-3/4 font-semibold text-white h-3/4' />
            </button>

            <button
              aria-label='reject friend request'
              onClick={() => handleFriendRequest(senderId, 'REJECT')}
              className='grid w-8 h-8 transition bg-red-600 rounded-full hover:bg-red-700 place-items-center hover:shadow-md'
            >
              <X className='w-3/4 font-semibold text-white h-3/4' />
            </button>
          </div>
        ))
      )}
    </>
  );
};

export default FriendRequests;
