import { db } from '@/lib/db';

export default async function Home() {
  // testing db
  // await db.set('is', 'working');

  return <div className='text-red-500'>hello world</div>;
}
