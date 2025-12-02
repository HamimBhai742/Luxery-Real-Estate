import { z } from 'zod';

export const propertyCreateZodSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional().nullable(),
  location: z.string().min(1, 'Location is required'),
  price: z.number().nonnegative('Price must be >= 0'),
  bedrooms: z.number().int().nonnegative('Bedrooms must be an integer >= 0'),
  bathrooms: z.number().int().nonnegative('Bathrooms must be an integer >= 0'),
  amenities: z.array(z.string().min(1)).optional().default([]),
  isBooked: z.boolean().default(false).optional()
});

export const propertyUpdateZodSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  price: z.number().optional(),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  amenities: z.array(z.string()).optional(),
  status: z.enum(['active', 'inactive']).optional(),
});
