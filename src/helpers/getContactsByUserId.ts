import { fetchRedis } from './redis';

export const getContactsByUserId = async (userId: string) => {
  const contactIds = (await fetchRedis(
    'smembers',
    `user:${userId}:contacts`
  )) as string[];

  const contacts = await Promise.all(
    contactIds.map(async (contactId) => {
      const contact = (await fetchRedis('get', `user:${contactId}`)) as User;

      return contact;
    })
  );

  return contacts;
};
