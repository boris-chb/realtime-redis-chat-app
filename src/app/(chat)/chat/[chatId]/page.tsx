import ChatHeader from '@/components/Chat/ChatHeader';
import ChatInput from '@/components/Chat/ChatInput';
import Messages from '@/components/Chat/Messages';
import { getChatMessages } from '@/helpers/getChatMessages';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { User } from '@/types/next-auth';
import { getServerSession } from 'next-auth';

interface PageProps {
  params: {
    chatId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { chatId } = params;
  const session = await getServerSession(authOptions);
  if (!session) return;

  const currentUser = session.user;
  const [userId1, userId2] = chatId.split('--');
  const partnerId = userId1 === currentUser.id ? userId2 : userId1;
  const userId = userId1 === currentUser.id ? userId2 : userId1;

  if (userId !== currentUser.id) {
    // is not part of this chat!
    // notFound();
  }

  const partnerUser = (await db.get(`user:${partnerId}`)) as User;
  const initialMessages = (await getChatMessages(chatId)) as Message[];

  return (
    <div className='flex flex-col justify-between flex-1 h-full '>
      <ChatHeader partnerUser={partnerUser} />
      <Messages
        initialMessages={initialMessages}
        currentUser={currentUser}
        partnerUser={partnerUser}
        chatId={chatId}
      />
      <ChatInput chatId={chatId} />
    </div>
  );
};

export default Page;
