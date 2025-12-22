import { Router } from 'express';
import { validateRequest } from '../../middleware/zod.validation';
import { promoSchema, promoupdateSchema } from './promo.schema';
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

router.get('/', checkAuth(Role.ADMIN), promoController.getAllPromo);

router.put(
  '/update/:id',
  checkAuth(Role.ADMIN),
  validateRequest(promoupdateSchema),
  promoController.updatePromo
);

router.delete(
  '/delete/:id',
  checkAuth(Role.ADMIN),
  promoController.deletePromo
);

export const promoRoutes = router;
