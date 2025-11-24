import z from 'zod';

export const userZodSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(30, 'Name must be at most 30 characters'),
  email: z
    .email('Invalid email')
    .min(1, 'Email is required')
    .max(50, 'Email must be at most 50 characters'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});
