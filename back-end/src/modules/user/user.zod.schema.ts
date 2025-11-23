import z from 'zod';

export const userZodSchema = z.object({
  name: {
    min: [3, 'Name must be at least 3 characters'],
    max: [20, 'Name must be at most 20 characters'],
  },
  email: z.email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
