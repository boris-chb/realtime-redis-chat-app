import { chatHrefBuilder } from '@/lib/utils';
import { User } from '@/types/next-auth';
import { usePathname } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import MenuLink from '../UI/MenuLink';

interface ChatListProps {
  contacts: User[];
  userId: string;
}

const ChatList: FC<ChatListProps> = ({ contacts, userId }) => {
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes('chat')) {
      setUnseenMessages((prev) =>
        prev.filter((msg) => pathname.includes(msg.senderId))
      );
    }
  }, [pathname]);

  return (
    <>
      {contacts.map((contact) => {
        const unseenMessageCount = unseenMessages.filter(
          (msg) => msg.senderId === contact.id
        ).length;

        return (
          <li key={contact.id}>
            <MenuLink
              badge={unseenMessageCount > 0 ? unseenMessageCount : undefined}
              title={contact.name!}
              href={`/chat/${chatHrefBuilder(userId, contact.id)}`}
            />
          </li>
        );
      })}
    </>
  );
};

export default ChatList;
