'use client';

import { chatHrefBuilder } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

interface SidebarChatListProps {
  contacts: User[];
  userId: string;
}

const SidebarChatList: FC<SidebarChatListProps> = ({ contacts, userId }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (pathname.includes('chat')) {
      setUnseenMessages((prev) =>
        prev.filter((msg) => pathname.includes(msg.senderId))
      );
    }
  }, [pathname]);

  const chatList = contacts.map((contact) => {
    const unseenMessageCount = unseenMessages.filter(
      (msg) => msg.senderId === contact.id
    ).length;

    return (
      <li key={contact.id}>
        <a
          className='flex items-center p-2 text-sm font-semibold leading-6 text-gray-700 rounded-md hover:text-indigo-600 hover:bg-gray-50 group gap-x-3'
          href={`/dashboard/chat/${chatHrefBuilder(userId, contact.id)}`}
        >
          {contact.name}
          {unseenMessageCount && (
            <div className='flex items-center justify-center w-4 h-4 text-sm font-medium text-white bg-indigo-600 rounded-full'>
              {unseenMessageCount}
            </div>
          )}
        </a>
      </li>
    );
  });

  return (
    <ul role='list' className='max-h-[25rem] overflow-y-auto -mx-2 space-y-1'>
      {chatList}
    </ul>
  );
};

export default SidebarChatList;
