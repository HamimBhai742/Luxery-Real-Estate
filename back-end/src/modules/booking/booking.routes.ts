import { Router } from 'express';
import { bookingController } from './booking.controller';
import { checkAuth } from '../../middleware/check.auth';
import { Role } from '@prisma/client';

const router = Router();

router.post(
  '/create-booking',
  checkAuth(Role.USER),
  bookingController.createBooking
);

export const bookingRoutes = router;
