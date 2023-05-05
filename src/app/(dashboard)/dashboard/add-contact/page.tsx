import AddContactForm from '@/components/AddContactForm';
import { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <main className='pt-8'>
      <h1 className='mb-8 font-bold text-5x1'>Add contact</h1>
      <AddContactForm />
    </main>
  );
};

export default page;
