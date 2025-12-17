import { Router } from 'express';
import { multerUpload } from '../../config/multer.config';
import { blogController } from './blog.controller';
import { Role } from '@prisma/client';
import { checkAuth } from '../../middleware/check.auth';
import { validateRequest } from '../../middleware/zod.validation';
import { createBlogSchema, updateBlogSchema } from './blog.zod.schema';

const router = Router();

router.post(
  '/create-blog',
  checkAuth(Role.ADMIN),
  multerUpload.single('file'),
  validateRequest(createBlogSchema),
  blogController.createBlog
);
router.get('/my-blogs', checkAuth(Role.ADMIN), blogController.getMyBlogs);

router.get('/', blogController.getAllBlogs);

router.get('/:slug', blogController.getSingleBlog);

router.put(
  '/update-blog/:id',
  checkAuth(Role.ADMIN),
  // multerUpload.single('file'),
  validateRequest(updateBlogSchema),
  blogController.updateBlog
);

router.delete(
  '/delete-blog/:id',
  checkAuth(Role.ADMIN),
  blogController.deleteBlog
);

export const blogRoutes = router;
