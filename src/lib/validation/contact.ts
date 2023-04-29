import { z } from 'zod';

export const addContactValidator = z.object({
  email: z.string().email(),
});

export const friendRequestValidator = z.object({
  senderId: z.string(),
  action: z.literal('ACCEPT').or(z.literal('REJECT')),
});
