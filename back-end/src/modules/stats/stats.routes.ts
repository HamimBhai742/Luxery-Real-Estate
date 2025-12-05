import { Router } from 'express';
import { statsController } from './stats.controller';
import { checkAuth } from '../../middleware/check.auth';
import { Role } from '@prisma/client';

const router = Router();

router.get('/admin', checkAuth(Role.ADMIN), statsController.getAdminStats);

router.get('/user', checkAuth(Role.USER), statsController.getUserStats);

router.get('/home', statsController.getHomeStats);

export const statsRoutes = router;
