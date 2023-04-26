import { z } from 'zod';

export const addContactValidator = z.object({
  email: z.string().email(),
});
