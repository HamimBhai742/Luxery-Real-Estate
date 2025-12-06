"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyUpdateZodSchema = exports.propertyCreateZodSchema = void 0;
const zod_1 = require("zod");
exports.propertyCreateZodSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    description: zod_1.z.string().optional().nullable(),
    location: zod_1.z.string().min(1, 'Location is required'),
    price: zod_1.z.number().nonnegative('Price must be >= 0'),
    bedrooms: zod_1.z.number().int().nonnegative('Bedrooms must be an integer >= 0'),
    bathrooms: zod_1.z.number().int().nonnegative('Bathrooms must be an integer >= 0'),
    amenities: zod_1.z.array(zod_1.z.string().min(1)).optional().default([]),
    isBooked: zod_1.z.boolean().default(false).optional()
});
exports.propertyUpdateZodSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
    price: zod_1.z.number().optional(),
    bedrooms: zod_1.z.number().optional(),
    bathrooms: zod_1.z.number().optional(),
    amenities: zod_1.z.array(zod_1.z.string()).optional(),
    status: zod_1.z.enum(['active', 'inactive']).optional(),
});
