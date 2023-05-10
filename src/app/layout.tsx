import Providers from '@/components/UI/Providers';
import { Inter } from 'next/font/google';
import './globals.css';

import Sidebar from '@/components/Sidebar/Sidebar';
import { getContactsByUserId } from '@/helpers/getContactsByUserId';
import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Redis Chat',
  description:
    'Realtime Chat App using NextJS 13, Redis, NextAuth and TailwindCSS',
};

interface LayoutProps {
  children: ReactNode;
}

export interface SidebarOption {
  id: number;
  title: string;
  href: string;
}

const sidebarOptions: SidebarOption[] = [
  {
    id: 1,
    title: 'Add contact',
    href: '/dashboard/add-contact',
  },
  {
    id: 2,
    title: 'Friend requests',
    href: '/dashboard/requests',
  },
];

export default async function RootLayout({ children }: LayoutProps) {
  const session = await getServerSession(authOptions);
  if (!session) return;

  const currentUser = session.user;

  // get contacts in sorted order
  const contacts = (await getContactsByUserId(currentUser.id)).sort();

  const initialFriendRequestCount = (
    (await fetchRedis(
      'smembers',
      `user:${currentUser.id}:incoming_friend_requests`
    )) as User[]
  ).length;

  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <div className='flex w-full h-screen'>
            <Sidebar
              contacts={contacts}
              options={sidebarOptions}
              initialFriendRequestCount={initialFriendRequestCount}
              currentUser={session.user}
            />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
