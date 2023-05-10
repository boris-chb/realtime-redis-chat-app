'use client';

import { SidebarOption } from '@/app/layout';
import { pusherClient } from '@/lib/pusher';
import { toPusherKey } from '@/lib/utils';
import { User } from '@/types/next-auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import { FaTelegramPlane } from 'react-icons/fa';
import SignOutButton from '../SignOutButton';
import MenuList from '../UI/MenuList';
import ChatList from './ChatList';
import UserInfo from './UserInfo';

interface SidebarProps {
  contacts: User[];
  currentUser: User;
  options: SidebarOption[];
  initialFriendRequestCount: number;
}

const Sidebar: FC<SidebarProps> = ({
  contacts,
  currentUser,
  options,
  initialFriendRequestCount,
}) => {
  const router = useRouter();

  useEffect(() => {
    const newMessageHandler = () => {
      console.log('[sidebar] new message');
    };
    const friendRequestHandler = () => {
      console.log('[sidebar] new friend request');
    };

    pusherClient.subscribe(toPusherKey(`user:${currentUser.id}:chats`));
    pusherClient.subscribe(toPusherKey(`user:${currentUser.id}:contacts`));

    pusherClient.bind('new_message', newMessageHandler);
    pusherClient.bind('new_friend_request', friendRequestHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`user:${currentUser.id}:chats`));
      pusherClient.unsubscribe(toPusherKey(`user:${currentUser.id}:contacts`));
    };
  }, []);

  // fetch incoming friend request cound from db
  return (
    <div className='flex flex-col w-full h-full max-w-xs px-6 overflow-y-auto bg-white border-r border-gray-200 grow gap-y-5'>
      <Link className='flex items-center w-16 h-16 shrink-0' href='/dashboard'>
        <FaTelegramPlane className='w-auto h-8 text-indigo-600' />
      </Link>
      {contacts.length > 0 ? (
        <div className='font-semibold leading-6 text-gray-600 text-s'>
          Chats
        </div>
      ) : null}
      <nav className='flex flex-col flex-1'>
        <ul role='list' className='flex flex-col flex-1 gap-y-7'>
          <ChatList contacts={contacts} userId={currentUser.id} />
          <li>
            <MenuList title='Overview' options={options} />
          </li>

          <li className='flex items-center mt-auto -mx-8'>
            <UserInfo user={currentUser} />
            <SignOutButton className='h-full aspect-square' />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
