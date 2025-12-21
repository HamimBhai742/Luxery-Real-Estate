"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = require("express");
const multer_config_1 = require("../../config/multer.config");
const blog_controller_1 = require("./blog.controller");
const client_1 = require("@prisma/client");
const check_auth_1 = require("../../middleware/check.auth");
const zod_validation_1 = require("../../middleware/zod.validation");
const blog_zod_schema_1 = require("./blog.zod.schema");
const router = (0, express_1.Router)();
router.post('/create-blog', (0, check_auth_1.checkAuth)(client_1.Role.ADMIN), multer_config_1.multerUpload.single('file'), (0, zod_validation_1.validateRequest)(blog_zod_schema_1.createBlogSchema), blog_controller_1.blogController.createBlog);
router.get('/my-blogs', (0, check_auth_1.checkAuth)(client_1.Role.ADMIN), blog_controller_1.blogController.getMyBlogs);
router.get('/', blog_controller_1.blogController.getAllBlogs);
router.get('/:slug', blog_controller_1.blogController.getSingleBlog);
router.put('/update-blog/:id', (0, check_auth_1.checkAuth)(client_1.Role.ADMIN), 
// multerUpload.single('file'),
(0, zod_validation_1.validateRequest)(blog_zod_schema_1.updateBlogSchema), blog_controller_1.blogController.updateBlog);
router.delete('/delete-blog/:id', (0, check_auth_1.checkAuth)(client_1.Role.ADMIN), blog_controller_1.blogController.deleteBlog);
exports.blogRoutes = router;
