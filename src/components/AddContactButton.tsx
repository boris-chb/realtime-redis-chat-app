'use client';

import { FC, useState } from 'react';
import Button from './UI/Button';
import { addContactValidator } from '@/lib/validation/add-contact';
import axios, { AxiosError } from 'axios';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface AddContactButtonProps {}

type FormData = z.infer<typeof addContactValidator>;

const AddContactButton: FC<AddContactButtonProps> = ({}) => {
  const [contactAddedSuccess, setContactAddedSuccess] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addContactValidator),
  });

  const addContact = async (email: string) => {
    try {
      const validatedEmail = addContactValidator.parse({
        email,
      });

      // TODO
      // await axios.post('/api/contacts/add', {
      //   email: validatedEmail,
      // });

      setContactAddedSuccess(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError('email', { message: error.message });
        return;
      }

      if (error instanceof AxiosError) {
        setError('email', { message: error.response?.data });
        return;
      }

      setError('email', { message: 'Something went wrong' });
    }
  };

  const onSubmit = (data: FormData) => {
    addContact(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-sm'>
      <label
        htmlFor='email'
        className='block text-sm font-medium leading-6 text-gray-900'
      >
        Add contact by email
      </label>
      <div className='flex gap-4 mt-2'>
        <input
          {...register('email')}
          type='text'
          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 '
          placeholder='email@example.com'
        />
        <Button>Add</Button>
      </div>
      {/* <p className='mt-1 text-sm text-red-600'>{errors.email?.message}</p> */}
      {!!contactAddedSuccess ? (
        <p className='mt-1 text-sm text-green-600'>Request sent.</p>
      ) : (
        <p className='mt-1 text-sm text-red-600'>{errors.email?.message}</p>
      )}
    </form>
  );
};

export default AddContactButton;