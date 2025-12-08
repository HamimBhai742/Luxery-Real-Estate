"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const create_token_1 = require("../utils/create.token");
const env_1 = require("../config/env");
const coustom_error_1 = require("../error/coustom.error");
const prisma_configs_1 = require("../config/prisma.configs");
const checkAuth = (...roles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const token = ((_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken) || ((_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b.authorization);
        if (!token) {
            throw new coustom_error_1.AppError('You are not login, please login first', http_status_codes_1.default.UNAUTHORIZED);
        }
        const decod = (0, create_token_1.verifyJwtToken)(token, env_1.ENV.JWT_SECRET);
        const user = yield prisma_configs_1.prisma.user.findUnique({
            where: { email: decod.email },
        });
        if (!user) {
            throw new coustom_error_1.AppError('User not found', http_status_codes_1.default.NOT_FOUND);
        }
        if (user.status === 'inactive') {
            throw new coustom_error_1.AppError('User is inactive', http_status_codes_1.default.NOT_ACCEPTABLE);
        }
        if (user.isDeleted) {
            throw new coustom_error_1.AppError('User is deleted', http_status_codes_1.default.NOT_ACCEPTABLE);
        }
        if (user.provider)
            if (!roles.includes(decod.role)) {
                throw new coustom_error_1.AppError('You are not authorized to access this route', http_status_codes_1.default.UNAUTHORIZED);
            }
        req.user = decod;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.checkAuth = checkAuth;
