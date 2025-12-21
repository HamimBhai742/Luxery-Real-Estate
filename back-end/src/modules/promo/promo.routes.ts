import { Router } from 'express';
import { validateRequest } from '../../middleware/zod.validation';
import { promoSchema } from './promo.schema';
import { promoController } from './promo.controller';
import { checkAuth } from '../../middleware/check.auth';
import { Role } from '@prisma/client';

const router = Router();

router.post(
  '/create',
  validateRequest(promoSchema),
  checkAuth(Role.ADMIN),
  promoController.createPromo
);

router.post('/use', checkAuth(Role.USER), promoController.usePromo);

router.post(
  '/usage-promo',
  checkAuth(Role.USER),
  promoController.createUsePromo
);

export const promoRoutes = router;
