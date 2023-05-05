import { ZodError } from 'zod';

export const handleZodError = (error: ZodError) => {
  error.errors.forEach((e) => console.log(e.path.join(' '), e.message));
  return new Response('Invalid request payload', { status: 422 });
};
