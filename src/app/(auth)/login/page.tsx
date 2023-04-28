'use client';

import Button from '@/components/UI/Button';
import Image from 'next/image';
import { FC, useState } from 'react';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { AiFillGithub } from 'react-icons/ai';
import { FaTelegramPlane } from 'react-icons/fa';

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

  const loginBtns = (
    <>
      <Button
        className='w-full max-w-sm mx-auto'
        isLoading={isLoading}
        type='button'
        onClick={() => signInWithProvider('google')}
      >
        <div className='flex flex-row gap-3'>
          <Image src='./google.svg' alt='google-logo' width={24} height={24} />
          Sign In with Google
        </div>
      </Button>
      <Button
        className='w-full max-w-sm mx-auto'
        isLoading={isLoading}
        type='button'
        onClick={() => signInWithProvider('github')}
      >
        <div className='flex flex-row items-center gap-3'>
          <AiFillGithub size={24} />
          Sign In with Github
        </div>
      </Button>
    </>
  );

  return (
    <div className='flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8'>
      <div className='flex flex-col items-center w-full max-w-md space-y-8'>
        <FaTelegramPlane size={48} />
        <h2 className='m-2 text-3xl font-semibold text-center text-gray-800'>
          Redis Chat
        </h2>
        <div className='flex flex-col items-center gap-8'>
          <h2 className='mt-4 text-2xl tracking-tight text-center text-gray-600'>
            Sign in to your account
          </h2>
        </div>
        {!isLoading ? loginBtns : null}
      </div>
    </div>
  );
};

export default Page;
