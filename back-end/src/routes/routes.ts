import { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { propertyRoutes } from '../modules/property/property.routes';
import { bookingRoutes } from '../modules/booking/booking.routes';
import { paymentRoutes } from '../modules/payment/payment.routes';
import { statsRoutes } from '../modules/stats/stats.routes';
import { blogRoutes } from '../modules/blog/blog.routes';
export const router = Router();
const routes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/property',
    route: propertyRoutes,
  },
  {
    path: '/booking',
    route: bookingRoutes,
  },
  {
    path: '/payment',
    route: paymentRoutes,
  },
  {
    path: '/stats',
    route: statsRoutes,
  },
  {
    path: '/blog',
    route: blogRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});
