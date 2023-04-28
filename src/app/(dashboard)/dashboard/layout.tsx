import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { FC, ReactElement, ReactNode } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import { FaTelegramPlane } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { Sidebar } from 'lucide-react';
import Image from 'next/image';
import SignOutButton from '@/components/SignOutButton';
import FriendRequestSidebarOption from '@/components/FriendRequestSidebarOption';

interface LayoutProps {
  children: ReactNode;
}

interface SidebarOption {
  id: number;
  name: string;
  href: string;
  Icon: IconType;
}

const sidebarOptions: SidebarOption[] = [
  {
    id: 1,
    name: 'Add contact',
    href: '/dashboard/add-contact',
    Icon: AiOutlineUserAdd,
  },
];

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);

  const chatsData = [
    { id: 1, title: 'Chat 1' },
    { id: 2, title: 'Chat 2' },
    { id: 3, title: 'Chat 3' },
    { id: 4, title: 'Chat 4' },
  ];

  if (!session) notFound();
  const userInfoTab = (
    <div className='flex items-center flex-1 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 gap-x-4'>
      <div className='relative w-8 h-8 bg-gray-50'>
        <Image
          fill
          referrerPolicy='no-referrer'
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
        {sidebarOptions.map(({ id, href, name, Icon }) => (
          <li key={id}>
            <Link
              className='flex gap-3 p-2 text-sm font-semibold leading-6 text-gray-700 rounded-md hover:text-indigo-600 hover:bg-gray-50 group'
              href={href}
            >
              <span className='text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'>
                <Icon className='w-4 h-4' />
              </span>
              <span className='truncate'>{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );

  const chatList = (
    <nav className='flex flex-col flex-1'>
      <ul role='list' className='flex flex-col flex-1 gap-y-7'>
        {chatsData.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}

        <li>
          <FriendRequestSidebarOption />
        </li>

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
      <Link className='flex items-center h-16 shrink-0' href='/dashboard'>
        <FaTelegramPlane className='w-auto h-8 text-indigo-600' />
      </Link>

      <div className='font-semibold leading-6 text-gray-600 text-s'>Chats</div>
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
