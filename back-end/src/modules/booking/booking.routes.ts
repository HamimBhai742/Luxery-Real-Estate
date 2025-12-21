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

router.get(
  '/my-bookings',
  checkAuth(Role.USER),
  bookingController.getMyBookings
);

router.get(
  '/:bookingId',
  checkAuth(Role.USER),
  bookingController.getSingleBooking
);
export const bookingRoutes = router;
