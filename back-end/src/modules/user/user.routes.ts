import { Router } from 'express';
import { userController } from './user.controller';
import { validateRequest } from '../../middleware/zod.validation';
import { updateUserZodSchema, userZodSchema } from './user.zod.schema';
import { checkAuth } from '../../middleware/check.auth';
import { Role } from '@prisma/client';
import { multerUpload } from '../../config/multer.config';

const router = Router();

router.post(
  '/register',
  validateRequest(userZodSchema),
  userController.registerUser
);

router.post('/me', checkAuth(...Object.values(Role)), userController.getMe);

router.get('/', checkAuth(Role.ADMIN), userController.getAllUsers);

router.patch(
  '/update-status/:id',
  checkAuth(Role.ADMIN),
  userController.updateUser
);

router.patch(
  '/update-profile',
  multerUpload.single('file'),
  validateRequest(updateUserZodSchema),
  checkAuth(...Object.values(Role)),
  userController.updateProfile
);

export const userRoutes = router;
