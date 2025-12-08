import { NextFunction, Request, Response, Router } from 'express';
import { authController } from './auth.controller';
import { validateRequest } from '../../middleware/zod.validation';
import { loginZodSchema } from './auth.schema';
import { checkAuth } from '../../middleware/check.auth';
import { Role } from '@prisma/client';
import passport from 'passport';
import { ENV } from '../../config/env';

const router = Router();
router.post('/login', validateRequest(loginZodSchema), authController.login);
router.post(
  '/verify',
  checkAuth(...Object.values(Role)),
  authController.verifyUser
);

router.get(
  '/google',
  async (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query.redricet || '/';
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      state: redirect as string,
    })(req, res, next);
  }
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${ENV.CLIENT_URL}/login?erro=You have not logged in google `,
  }),
  authController.googleCallback
);

router.post('/forgot-password', authController.forgetPassword);

router.post('/reset-password', authController.resetPassword);

router.post('/logout', authController.logout);
export const authRoutes = router;
