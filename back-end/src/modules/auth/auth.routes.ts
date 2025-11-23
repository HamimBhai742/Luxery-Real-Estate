import { Router } from 'express';
import { authController } from './auth.controller';
import { validateRequest } from '../../middleware/zod.validation';
import { loginZodSchema } from './auth.schema';

const router = Router();
router.post('/login', validateRequest(loginZodSchema),authController.login);
