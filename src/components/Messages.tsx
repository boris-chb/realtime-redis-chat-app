'use client';

import { cn } from '@/lib/utils';
import { Message } from '@/lib/validation/message';
import { FC, useRef, useState } from 'react';

interface MessagesProps {
  initialMessages: Message[];
  userId: string;
}

const Messages: FC<MessagesProps> = ({ initialMessages, userId }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const scrolldownRef = useRef<HTMLDivElement | null>(null);

  const dummyMessages = [
    {
      id: 'abc123',
      senderId: 'f0d9400a-2307-4002-8b39-e1f37f9bfe45',
      receiverId: '31bc93be-5b0a-4782-a16e-d26833a33727',
      timestamp: 1620054000,
      body: 'Hello, how are you doing today?',
    },
    {
      id: 'def456',
      senderId: '31bc93be-5b0a-4782-a16e-d26833a33727',
      receiverId: 'f0d9400a-2307-4002-8b39-e1f37f9bfe45',
      timestamp: 1620055000,
      body: "I'm doing well, thanks for asking. How about you?",
    },
    {
      id: 'ghi789',
      senderId: 'user1',
      receiverId: 'user2',
      timestamp: 1620056000,
      body: "I'm doing pretty good too. What are your plans for the weekend?",
    },
  ];

  return (
    <div
      id='messages'
      className='flex flex-col-reverse flex-1 h-full gap-4 p-3 overflow-y-auto scrolling-touch scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2'
    >
      <div ref={scrolldownRef} className='flex'></div>
      {dummyMessages.map((msg, i) => {
        const isCurrentUser = msg.senderId === userId;

        return (
          <div key={`${msg.id}-${msg.timestamp}`}>
            <div
              className={cn('flex items-end', { 'justify-end': isCurrentUser })}
            >
              <div
                className={cn(
                  'flex flex-col space-y-2 text-base max-w-xs mx-2',
                  {
                    'order-1 items-end': isCurrentUser,
                    'order-2 items-start': !isCurrentUser,
                  }
                )}
              >
                <span
                  className={cn('px-4 py-2 rounded-lg inline-block', {
                    'bg-indigo-600 text-white': isCurrentUser,
                    'bg-gray-200 text-gray-900': !isCurrentUser,
                    'rounded-br-none': isCurrentUser,
                    'rounded-bl-none': !isCurrentUser,
                  })}
                >
                  {msg.body}
                  <span className='ml-2 text-xs text-gray-400'>
                    <br />
                    {JSON.stringify(new Date(msg.timestamp))}
                  </span>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
