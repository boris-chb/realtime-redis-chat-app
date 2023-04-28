'use client';

import { ButtonHTMLAttributes, FC, useState } from 'react';
import Button from './UI/Button';
import { toast } from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SignOutButton: FC<SignOutButtonProps> = ({ ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSignOut = async () => {
    setIsLoading(true);

    try {
      await signOut();
    } catch (error) {
      toast.error('Error signin out.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      isLoading={isLoading}
      variant={'ghost'}
      onClick={onSignOut}
      {...props}
    >
      <LogOut className='w-4 h-4' />
    </Button>
  );
};

export default SignOutButton;
