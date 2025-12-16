import { Router } from 'express';
import { multerUpload } from '../../config/multer.config';
import { blogController } from './blog.controller';
import { Role } from '@prisma/client';
import { checkAuth } from '../../middleware/check.auth';
import { validateRequest } from '../../middleware/zod.validation';
import { createBlogSchema } from './blog.zod.schema';

const router = Router();

router.post(
  '/create-blog',
  checkAuth(Role.ADMIN),
  multerUpload.single('file'),
  validateRequest(createBlogSchema),
  blogController.createBlog
);

router.get('/', blogController.getAllBlogs);

export const blogRoutes = router;
