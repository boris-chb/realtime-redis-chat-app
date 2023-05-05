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

  return (
    <div
      id='messages'
      className='flex flex-col-reverse flex-1 h-full gap-4 p-3 overflow-y-auto scrolling-touch scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2'
    >
      <div ref={scrolldownRef} className='flex'></div>
      {initialMessages.map((msg, i) => {
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
