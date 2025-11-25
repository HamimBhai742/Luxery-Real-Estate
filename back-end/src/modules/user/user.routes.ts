import { Router } from 'express';
import { userController } from './user.controller';
import { validateRequest } from '../../middleware/zod.validation';
import { userZodSchema } from './user.zod.schema';
import { checkAuth } from '../../middleware/check.auth';
import { Role } from '@prisma/client';

const router = Router();

router.post(
  '/register',
  validateRequest(userZodSchema),
  userController.registerUser
);

router.post(
  '/me',
  checkAuth(...Object.values(Role)),
  userController.getMe
);

export const userRoutes = router;
