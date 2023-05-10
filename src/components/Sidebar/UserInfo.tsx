import { User } from '@/types/next-auth';
import Image from 'next/image';
import { FC } from 'react';

interface UserInfoProps {
  user: User;
}

const UserInfo: FC<UserInfoProps> = ({ user }) => {
  return (
    <div className='flex items-center flex-1 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 gap-x-4'>
      <div className='relative w-8 h-8 bg-gray-50'>
        <Image
          fill
          referrerPolicy='no-referrer'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className='rounded-full'
          src={user.image || ''}
          alt='Your profile picture'
        />
      </div>

      <span className='sr-only'>Your profile</span>
      <div className='flex flex-col'>
        <span aria-hidden='true'>{user.name}</span>
        <span className='text-xs text-zinc-400' aria-hidden='true'>
          {user.email}
        </span>
      </div>
    </div>
  );
};

export default UserInfo;
