import z from 'zod';

export const promoSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  discount: z.number().min(1, 'Discount is required'),
  validFrom: z.string().min(1, 'Valid from is required'),
  validTo: z.string().min(1, 'Valid to is required'),
});

export const promoupdateSchema = z.object({
  code: z.string().min(1, 'Code is required').optional(),
  discount: z.number().min(1, 'Discount is required').optional(),
  validFrom: z.string().min(1, 'Valid from is required').optional(),
  validTo: z.string().min(1, 'Valid to is required').optional(),
});

export interface IPromo {
  code: string;
  discount: number;
  validFrom: string;
  validTo: string;
}
