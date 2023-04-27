'use client';

import Button from '@/components/UI/Button';
import Image from 'next/image';
import { FC, useState } from 'react';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signInWithProvider = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    try {
      await signIn(provider);
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8'>
      <div className='flex flex-col items-center w-full max-w-md space-y-8'>
        <div className='flex flex-col items-center gap-8'>
          LOGO
          <h2 className='mt-6 text-3xl font-bold tracking-tight text-center text-gray-900'>
            Sign in to your account
          </h2>
        </div>
        <Button
          className='w-full max-w-sm mx-auto'
          isLoading={isLoading}
          type='button'
          onClick={() => signInWithProvider('google')}
        >
          {!isLoading ? (
            <div className='flex flex-row gap-3'>
              <Image
                src='./google.svg'
                alt='google-logo'
                width={24}
                height={24}
              />
              Sign In with Google
            </div>
          ) : null}
        </Button>
        <Button
          className='w-full max-w-sm mx-auto'
          isLoading={isLoading}
          type='button'
          onClick={() => signInWithProvider('github')}
        >
          {!isLoading ? (
            <div className='flex flex-row gap-3'>Sign In with Github</div>
          ) : null}
        </Button>
      </div>
    </div>
  );
};

export default Page;
