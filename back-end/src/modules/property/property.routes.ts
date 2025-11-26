import { Router } from 'express';
import { propertyController } from './property.controller';
import { checkAuth } from '../../middleware/check.auth';
import { Role } from '@prisma/client';
import { validateRequest } from '../../middleware/zod.validation';
import { propertyCreateZodSchema } from './property.zod.schema';

const router = Router();

router.post(
  '/create-property',
  validateRequest(propertyCreateZodSchema),
  checkAuth(Role.ADMIN),
  propertyController.createProperty
);

router.get(
  '/my-properties',
  propertyController.getMyProperties
);

router.get('/', propertyController.getAllProperties);

router.get('/:slug', propertyController.getSingleProperty);

router.put(
  '/update-property/:id',
  checkAuth(Role.ADMIN),
  propertyController.updateProperty
);

router.delete(
  '/delete-property/:id',
  checkAuth(Role.ADMIN),
  propertyController.deleteProperty
);

export const propertyRoutes = router;
