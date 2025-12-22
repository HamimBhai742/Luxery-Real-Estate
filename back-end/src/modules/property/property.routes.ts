import { Router } from 'express';
import { propertyController } from './property.controller';
import { checkAuth } from '../../middleware/check.auth';
import { Role } from '@prisma/client';
import { validateRequest } from '../../middleware/zod.validation';
import { propertyCreateZodSchema } from './property.zod.schema';
import { multerUpload } from '../../config/multer.config';

const router = Router();

router.post(
  '/create-property',
   checkAuth(Role.ADMIN),
  multerUpload.array('files'),
  validateRequest(propertyCreateZodSchema),
  propertyController.createProperty
);

router.get(
  '/my-properties',
  checkAuth(Role.ADMIN),
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

router.get(
  '/find-single-property/:id',
  propertyController.findSingleProperty
);

export const propertyRoutes = router;
