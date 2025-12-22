"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promoupdateSchema = exports.promoSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.promoSchema = zod_1.default.object({
    code: zod_1.default.string().min(1, 'Code is required'),
    discount: zod_1.default.number().min(1, 'Discount is required'),
    validFrom: zod_1.default.string().min(1, 'Valid from is required'),
    validTo: zod_1.default.string().min(1, 'Valid to is required'),
});
exports.promoupdateSchema = zod_1.default.object({
    code: zod_1.default.string().min(1, 'Code is required').optional(),
    discount: zod_1.default.number().min(1, 'Discount is required').optional(),
    validFrom: zod_1.default.string().min(1, 'Valid from is required').optional(),
    validTo: zod_1.default.string().min(1, 'Valid to is required').optional(),
});
