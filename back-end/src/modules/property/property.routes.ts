import { Router } from 'express';
import { propertyController } from './property.controller';
import { checkAuth } from '../../middleware/check.auth';
import { Role } from '@prisma/client';
import { validateRequest } from '../../middleware/zod.validation';
import { propertyZodSchema } from './property.zod.schema';

const router = Router();

router.post(
  '/create-property',
  validateRequest(propertyZodSchema),
  checkAuth(Role.ADMIN),
  propertyController.createProperty
);

router.get(
  '/my-properties',
  checkAuth(Role.ADMIN),
  propertyController.getProperties
);

export const propertyRoutes = router;
