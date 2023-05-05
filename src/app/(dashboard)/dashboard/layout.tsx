import FriendRequestSidebarOption from '@/components/FriendRequestSidebarOption';
import SidebarChatList from '@/components/Sidebar/Sidebar';
import SignOutButton from '@/components/SignOutButton';
import Logo from '@/components/UI/Icons/Logo';
import MenuLinkItem from '@/components/UI/MenuLinkItem';
import { getContactsByUserId } from '@/helpers/getContactsByUserId';
import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { FaTelegramPlane } from 'react-icons/fa';

interface LayoutProps {
  children: ReactNode;
}

interface SidebarOption {
  id: number;
  title: string;
  href: string;
  Icon: IconType;
}

const sidebarOptions: SidebarOption[] = [
  {
    id: 1,
    title: 'Add contact',
    href: '/dashboard/add-contact',
    Icon: AiOutlineUserAdd,
  },
];

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  if (!session) return;

  const userId = session.user.id;

  // get contacts in sorted order
  const contacts = (await getContactsByUserId(userId)).sort();

  // fetch incoming friend request cound from db
  const initialRequestCount = (
    (await fetchRedis(
      'smembers',
      `user:${userId}:incoming_friend_requests`
    )) as User[]
  ).length;

  const userInfoTab = (
    <div className='flex items-center flex-1 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 gap-x-4'>
      <div className='relative w-8 h-8 bg-gray-50'>
        <Image
          fill
          referrerPolicy='no-referrer'
          sizes='auto'
          className='rounded-full'
          src={session.user.image || ''}
          alt='Your profile picture'
        />
      </div>

      <span className='sr-only'>Your profile</span>
      <div className='flex flex-col'>
        <span aria-hidden='true'>{session.user.name}</span>
        <span className='text-xs text-zinc-400' aria-hidden='true'>
          {session.user.email}
        </span>
      </div>
    </div>
  );

  const overviewList = (
    <>
      <div className='text-xs font-semibold leading-6 text-gray-600'>
        Overview
      </div>
      <ul role='list' className='mt-2 -mx-2 space-y-1'>
        {sidebarOptions.map(({ id, href, title, Icon }) => (
          <li key={id}>
            <MenuLinkItem href={href} title={title} />
          </li>
        ))}
        <li>
          <FriendRequestSidebarOption
            userId={userId}
            initialRequestCount={initialRequestCount}
          />
        </li>
      </ul>
    </>
  );

  const chatList = (
    <nav className='flex flex-col flex-1'>
      <ul role='list' className='flex flex-col flex-1 gap-y-7'>
        <SidebarChatList contacts={contacts} userId={userId} />

        <li>{overviewList}</li>

        <li className='flex items-center mt-auto -mx-8'>
          {userInfoTab}
          <SignOutButton className='h-full aspect-square' />
        </li>
      </ul>
    </nav>
  );

  const sidebar = (
    <div className='flex flex-col w-full h-full max-w-xs px-6 overflow-y-auto bg-white border-r border-gray-200 grow gap-y-5'>
      <Link className='flex items-center w-16 h-16 shrink-0' href='/dashboard'>
        <FaTelegramPlane className='w-auto h-8 text-indigo-600' />
      </Link>

      {contacts.length > 0 ? (
        <div className='font-semibold leading-6 text-gray-600 text-s'>
          Chats
        </div>
      ) : null}
      {chatList}
    </div>
  );

  return (
    <div className='flex w-full h-screen'>
      {sidebar}
      {children}
    </div>
  );
};

export default Layout;
