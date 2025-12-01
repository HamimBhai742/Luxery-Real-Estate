import { Router } from 'express';
import { paymentController } from './payment.controller';
import { checkAuth } from '../../middleware/check.auth';
import { Role } from '@prisma/client';

const router = Router();

router.post(
  '/initiate-payment',
  checkAuth(Role.USER),
  paymentController.createPayment
);

router.post('/success', paymentController.successPayment);

router.post('/failed', paymentController.failedPayment);

router.post('/cancel', paymentController.cancelPayment);

router.get('/', paymentController.getAllPayments);

router.get('/my-payments', checkAuth(Role.USER), paymentController.getMyPayments);

export const paymentRoutes = router;
