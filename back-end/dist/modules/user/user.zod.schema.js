"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserZodSchema = exports.userZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userZodSchema = zod_1.default.object({
    name: zod_1.default
        .string()
        .min(1, 'Name is required')
        .min(3, 'Name must be at least 3 characters')
        .max(30, 'Name must be at most 30 characters'),
    email: zod_1.default
        .email('Invalid email')
        .min(1, 'Email is required')
        .max(50, 'Email must be at most 50 characters'),
    phone: zod_1.default
        .string()
        .min(1, 'Phone is required')
        .min(11, 'Phone must be at least 11 characters')
        .max(11, 'Phone must be at most 11 characters'),
    password: zod_1.default
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters'),
});
exports.updateUserZodSchema = zod_1.default.object({
    name: zod_1.default
        .string()
        .min(1, 'Name is required')
        .min(3, 'Name must be at least 3 characters')
        .max(30, 'Name must be at most 30 characters')
        .optional(),
    phone: zod_1.default
        .string()
        .min(1, 'Phone is required')
        .min(11, 'Phone must be at least 11 characters')
        .max(11, 'Phone must be at most 11 characters')
        .optional(),
    address: zod_1.default.string().optional(),
});
