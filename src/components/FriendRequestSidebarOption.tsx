import Link from 'next/link';
import { FC } from 'react';

interface FriendRequestSidebarOptionProps {}

const FriendRequestSidebarOption: FC<
  FriendRequestSidebarOptionProps
> = ({}) => {
  return (
    <Link
      className='flex items-center text-gray-700 rounded-md hover:text-indigo-600 hover:bg-gray-50 group gap-x-3'
      href='/dashboard/requests'
    >
      bro
    </Link>
  );
};

export default FriendRequestSidebarOption;
