import { User } from '@/types/next-auth';
import Image from 'next/image';
import { FC } from 'react';

interface ChatHeaderProps {
  partnerUser: User;
}

const ChatHeader: FC<ChatHeaderProps> = ({ partnerUser }) => {
  return (
    <div className='flex justify-between p-3 border-b-2 border-gray-200 sm:items-center'>
      <div className='relative flex items-center space-x-4'>
        <div className='relative'>
          <div className='relative w-8 h-8 sm:w-12 sm:h-12'>
            <Image
              fill
              src={partnerUser.image as string}
              alt={`${partnerUser.name}-avatar`}
              referrerPolicy='no-referrer'
              className='rounded-full'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </div>
        </div>

        <div className='flex flex-col leading-tight'>
          <div className='flex items-center text-xl'>
            <span className='mr-3 font-semibold text-gray-700'>
              {partnerUser.name}
            </span>
          </div>
          <span className='text-sm text-gray-600'>{partnerUser.email}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
