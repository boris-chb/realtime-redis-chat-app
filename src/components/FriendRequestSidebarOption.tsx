'use client';

import { User } from 'lucide-react';
import Link from 'next/link';
import { FC, useState } from 'react';
import MenuLinkItem from './UI/MenuLinkItem';

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
    <MenuLinkItem
      href='/dashboard/requests'
      title='Friend requests'
      badge={initialRequestCount > 0 ? initialRequestCount : undefined}
    />
  );
};

export default FriendRequestSidebarOption;
