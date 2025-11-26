import { Router } from 'express';
import { authController } from './auth.controller';
import { validateRequest } from '../../middleware/zod.validation';
import { loginZodSchema } from './auth.schema';
import { checkAuth } from '../../middleware/check.auth';
import { Role } from '@prisma/client';

const router = Router();
router.post('/login', validateRequest(loginZodSchema), authController.login);
router.post(
  '/verify',
  checkAuth(...Object.values(Role)),
  authController.verifyUser
);

router.post('/logout', authController.logout);
export const authRoutes = router;
