import { Router } from 'express';
import { statsController } from './stats.controller';

const router = Router();

router.get('/admin', statsController.getAdminStats);

export const statsRoutes = router;
