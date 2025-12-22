import { Router } from 'express';
import { validateRequest } from '../../middleware/zod.validation';
import { reviewSchema } from './reviewZodSchema';
import { reviewController } from './review.controller';
import { Role } from '@prisma/client';
import { checkAuth } from '../../middleware/check.auth';

const router = Router();

router.post(
  '/create',
  checkAuth(Role.USER),
  validateRequest(reviewSchema),
  reviewController.createReview
);

router.get('/', reviewController.getAllReviews);

export const reviewRoutes = router;
