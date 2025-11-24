import { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { propertyRoutes } from '../modules/property/property.routes';
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
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});
