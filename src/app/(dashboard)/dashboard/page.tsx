import Button from '@/components/UI/Button';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  // TODO
  // const session = await getServerSession(authOptions)

  return (
    <div>
      <Button size='lg' variant={'ghost'}>
        ghost lg btn
      </Button>
      <Button>default btn</Button>
      <Button size='sm' variant={'default'}>
        active sm btn
      </Button>
    </div>
  );
};

export default page;
