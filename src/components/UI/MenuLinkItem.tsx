'use client';

import { Icon } from 'lucide-react';
import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { IconType } from 'react-icons';

interface MenuLinkItemProps {
  href: string;
  title: string;
  Icon?: IconType;
  badge?: string | number;
}

const MenuLinkItem: FC<MenuLinkItemProps> = ({ href, Icon, title, badge }) => {
  return (
    <>
      <Link
        className='flex items-center justify-center w-3/4 gap-3 p-2 text-sm font-semibold leading-6 text-gray-700 rounded-md hover:text-indigo-600 hover:bg-gray-50 group'
        href={href}
      >
        <span className='text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'></span>
        <span className='truncate grow'>{title}</span>

        {badge && (
          <div className='flex w-auto items-center justify-center  h-5 text-xs text-white bg-indigo-600 rounded-lg min-w-[10%]'>
            {badge}
          </div>
        )}
      </Link>
    </>
  );
};

export default MenuLinkItem;
