"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.reviewSchema = zod_1.default.object({
    rating: zod_1.default
        .number()
        .min(1, 'Rating is required')
        .max(5, 'Rating must be between 1 and 5'),
    comment: zod_1.default.string().min(1, 'Comment is required'),
    bookingId: zod_1.default.string().min(1, 'Property Id is required'),
    propertyId: zod_1.default.string().min(1, 'Property Id is required'),
});
