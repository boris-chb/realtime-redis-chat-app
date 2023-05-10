'use client';

import { FC, useState } from 'react';
import Button from './UI/Button';
import { addContactValidator, FormData } from '@/lib/validation/contact';
import axios, { AxiosError } from 'axios';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const AddContactForm: FC = () => {
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

  const onAddContact = async (email: string) => {
    try {
      const validatedEmail = addContactValidator.parse({
        email,
      });

      let res = await axios.post('/api/contacts/add', {
        email: validatedEmail,
      });

      console.log(res);

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
    onAddContact(data.email);
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
      {!!contactAddedSuccess ? (
        <p className='mt-1 text-sm text-green-600'>Request sent.</p>
      ) : (
        <p className='mt-1 text-sm text-red-600'>{errors.email?.message}</p>
      )}
    </form>
  );
};

export default AddContactForm;
