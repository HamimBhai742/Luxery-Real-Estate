import { z } from 'zod';

export const createBlogSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(150, 'Title is too long'),
  excerpt: z
    .string()
    .min(10, 'Excerpt must be at least 10 characters')
    .max(200, 'Excerpt is too long'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  category: z.enum([
    'Real Estate Tips',
    'Market Analysis',
    'Investment Guide',
    'Property News',
    'Luxury Homes',
    'Interior Design',
  ]),
  tags: z
    .array(z.string().min(2, 'Tag is too short'))
    .min(1, 'At least one tag is required'),
  status: z.enum(['draft', 'published']).optional(),
});

export const updateBlogSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(150, 'Title is too long')
    .optional(),
  excerpt: z
    .string()
    .min(10, 'Excerpt must be at least 10 characters')
    .max(200, 'Excerpt is too long')
    .optional(),
  content: z
    .string()
    .min(50, 'Content must be at least 50 characters')
    .optional(),
  category: z
    .enum([
      'Real Estate Tips',
      'Market Analysis',
      'Investment Guide',
      'Property News',
      'Luxury Homes',
      'Interior Design',
    ])
    .optional(),
  tags: z
    .array(z.string().min(2, 'Tag is too short'))
    .min(1, 'At least one tag is required')
    .optional(),
  status: z.enum(['draft', 'published']).optional(),
});

export interface UpdateBlogData {
  title?: string;
  excerpt?: string;
  content?: string;
  category?:
    | 'Real Estate Tips'
    | 'Market Analysis'
    | 'Investment Guide'
    | 'Property News'
    | 'Luxury Homes'
    | 'Interior Design';
  tags?: string[];
  status?: 'draft' | 'published';
}

