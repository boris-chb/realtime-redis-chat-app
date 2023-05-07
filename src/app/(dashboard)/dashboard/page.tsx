import Button from '@/components/UI/Button';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  // TODO
  // const session = await getServerSession(authOptions)

  return <div>Select a chat</div>;
};

export default page;
