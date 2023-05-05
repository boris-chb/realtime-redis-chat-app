'use client';

import { chatHrefBuilder } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import MenuLinkItem from '../UI/MenuLinkItem';

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
        <MenuLinkItem
          badge={unseenMessageCount > 0 ? unseenMessageCount : undefined}
          title={contact.name}
          href={`/dashboard/chat/${chatHrefBuilder(userId, contact.id)}`}
        ></MenuLinkItem>
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
