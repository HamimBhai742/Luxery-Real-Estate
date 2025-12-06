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
exports.authService = void 0;
const prisma_configs_1 = require("../../config/prisma.configs");
const coustom_error_1 = require("../../error/coustom.error");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const create_token_1 = require("../../utils/create.token");
const env_1 = require("../../config/env");
const send_email_1 = require("../../utils/send.email");
const login = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password, }) {
    const user = yield prisma_configs_1.prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new coustom_error_1.AppError('User not found', http_status_codes_1.default.NOT_FOUND);
    }
    const isMatchPassword = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatchPassword) {
        throw new coustom_error_1.AppError('Invalid password', http_status_codes_1.default.UNAUTHORIZED);
    }
    return {
        name: user.name,
        email: user.email,
        role: user.role,
        id: user.id,
    };
});
const forgetPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_configs_1.prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        throw new coustom_error_1.AppError('User not found', http_status_codes_1.default.NOT_FOUND);
    }
    if (user.status === client_1.Status.inactive) {
        throw new coustom_error_1.AppError(`User is ${user.status}`, http_status_codes_1.default.NOT_ACCEPTABLE);
    }
    const jwtPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
    };
    const token = (0, create_token_1.createJwtToken)(jwtPayload, env_1.ENV.RESET_JWT_SECRET, env_1.ENV.RESET_TOKEN_EXPIRE_IN);
    const resetUrl = `${env_1.ENV.CLIENT_URL}/reset-password?token=${token}&id=${user.id}`;
    (0, send_email_1.sendEmail)({
        to: user.email,
        subject: 'Reset Password',
        templateName: 'forgetPassword',
        templateData: {
            name: user.name,
            resetUrl,
        },
    });
});
const resetPassword = (token, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new coustom_error_1.AppError('Token is missing', http_status_codes_1.default.BAD_REQUEST);
    }
    const decode = (0, create_token_1.verifyJwtToken)(token, env_1.ENV.RESET_JWT_SECRET);
    if (!decode) {
        throw new coustom_error_1.AppError('Token is invalid', http_status_codes_1.default.BAD_REQUEST);
    }
    const user = yield prisma_configs_1.prisma.user.findUnique({
        where: {
            email: decode.email,
        },
    });
    if (!user) {
        throw new coustom_error_1.AppError('User not found', http_status_codes_1.default.NOT_FOUND);
    }
    const hashPass = yield bcryptjs_1.default.hash(newPassword, env_1.ENV.BCRYPT_SALT_ROUNDS);
    yield prisma_configs_1.prisma.user.update({
        where: {
            email: decode.email,
        },
        data: {
            password: hashPass,
        },
    });
    (0, send_email_1.sendEmail)({
        to: user.email,
        subject: 'Reset Password Successfully',
        templateName: 'resetPassword',
        templateData: {
            name: user.name,
            appName: 'Luxery Real Estate',
        },
    });
});
exports.authService = {
    login,
    forgetPassword,
    resetPassword,
};
