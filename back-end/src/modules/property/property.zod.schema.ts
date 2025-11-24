import { z } from 'zod';

export const propertyCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional().nullable(),
  location: z.string().min(1, 'Location is required'),
  price: z.number().nonnegative('Price must be >= 0'),
  bedrooms: z.number().int().nonnegative('Bedrooms must be an integer >= 0'),
  bathrooms: z.number().int().nonnegative('Bathrooms must be an integer >= 0'),
  amenities: z.array(z.string().min(1)).optional().default([]),
  status: z.enum(['active', 'inactive']).default('active'),
});
