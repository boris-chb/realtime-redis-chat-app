'use client';

import { User } from 'lucide-react';
import Link from 'next/link';
import { FC, useState } from 'react';

interface FriendRequestSidebarOptionProps {
  userId: string;
  initialRequestCount: number;
}

const FriendRequestSidebarOption: FC<FriendRequestSidebarOptionProps> = ({
  userId,
  initialRequestCount,
}) => {
  const [friendRequestCount, setFriendRequestCount] =
    useState<number>(initialRequestCount);

  return (
    <Link
      className='flex items-center p-2 text-sm font-semibold leading-6 text-gray-700 rounded-md hover:text-indigo-600 hover:bg-gray-50 group gap-x-3'
      href='/dashboard/requests'
    >
      <div className='text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'>
        <User className='w-4 h-4' />
      </div>
      <p className='truncate'>Friend requests</p>

      {friendRequestCount > 0 ? (
        <div className='flex items-center justify-center w-5 h-5 text-xs text-white bg-indigo-600 rounded-full'>
          {friendRequestCount}
        </div>
      ) : null}
    </Link>
  );
};

export default FriendRequestSidebarOption;
