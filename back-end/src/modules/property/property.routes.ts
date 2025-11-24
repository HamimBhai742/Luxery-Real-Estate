import { Router } from 'express';
import { propertyController } from './property.controller';
import { checkAuth } from '../../middleware/check.auth';
import { Role } from '@prisma/client';

const router = Router();

router.post(
  '/create-property',
  checkAuth(Role.ADMIN),
  propertyController.createProperty
);

export const propertyRoutes = router;
