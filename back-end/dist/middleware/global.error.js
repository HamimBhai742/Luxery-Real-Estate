"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandel = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const client_1 = require("@prisma/client");
const globalErrorHandel = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong';
    const errSource = [];
    const handelZodError = (err) => {
        statusCode = 400;
        message = 'Zod error';
        err.issues.forEach((i) => {
            errSource.push({
                path: i.path[i.path.length - 1],
                message: i.message,
            });
        });
    };
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            statusCode = http_status_codes_1.default.CONFLICT;
            message = 'Duplicate field value';
            errSource.push(err.meta);
        }
    }
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
            statusCode = http_status_codes_1.default.NOT_FOUND;
            message = 'Data not found';
        }
    }
    if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        statusCode = http_status_codes_1.default.BAD_REQUEST;
        const lines = err.message.split('\n');
        message = lines[lines.length - 1].trim();
    }
    if (err.name === 'ZodError') {
        handelZodError(err);
    }
    res.status(statusCode).json({
        success: false,
        message,
        errSource,
    });
};
exports.globalErrorHandel = globalErrorHandel;
