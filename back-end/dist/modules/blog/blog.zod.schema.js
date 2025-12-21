"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogSchema = exports.createBlogSchema = void 0;
const zod_1 = require("zod");
exports.createBlogSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(5, 'Title must be at least 5 characters')
        .max(150, 'Title is too long'),
    excerpt: zod_1.z
        .string()
        .min(10, 'Excerpt must be at least 10 characters')
        .max(200, 'Excerpt is too long'),
    content: zod_1.z.string().min(50, 'Content must be at least 50 characters'),
    category: zod_1.z.enum([
        'Real Estate Tips',
        'Market Analysis',
        'Investment Guide',
        'Property News',
        'Luxury Homes',
        'Interior Design',
    ]),
    tags: zod_1.z
        .array(zod_1.z.string().min(2, 'Tag is too short'))
        .min(1, 'At least one tag is required'),
    status: zod_1.z.enum(['draft', 'published']).optional(),
});
exports.updateBlogSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(5, 'Title must be at least 5 characters')
        .max(150, 'Title is too long')
        .optional(),
    excerpt: zod_1.z
        .string()
        .min(10, 'Excerpt must be at least 10 characters')
        .max(200, 'Excerpt is too long')
        .optional(),
    content: zod_1.z
        .string()
        .min(50, 'Content must be at least 50 characters')
        .optional(),
    category: zod_1.z
        .enum([
        'Real Estate Tips',
        'Market Analysis',
        'Investment Guide',
        'Property News',
        'Luxury Homes',
        'Interior Design',
    ])
        .optional(),
    tags: zod_1.z
        .array(zod_1.z.string().min(2, 'Tag is too short'))
        .min(1, 'At least one tag is required')
        .optional(),
    status: zod_1.z.enum(['draft', 'published']).optional(),
});
