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
exports.authController = void 0;
const create_async_fn_1 = require("../../utils/create.async.fn");
const auth_services_1 = require("./auth.services");
const create_jwt_1 = require("../../utils/create.jwt");
const send_response_1 = require("../../utils/send.response");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const env_1 = require("../../config/env");
const login = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const user = yield auth_services_1.authService.login({ email, password });
    const token = yield (0, create_jwt_1.createUserToken)(user);
    // setCookies(res, token);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'User logged in successfully',
        data: {
            accessToken: token.accessToken,
            role: user.role,
        },
    });
}));
const verifyUser = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, send_response_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'User logged in',
        data: req.user,
    });
}));
const logout = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: env_1.ENV.NODE_ENV === 'production',
        sameSite: env_1.ENV.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    (0, send_response_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'User logged out',
        data: null,
    });
}));
const forgetPassword = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield auth_services_1.authService.forgetPassword(req.body.email);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'Reset Link Sent Successfully',
        data: null,
    });
}));
const resetPassword = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, password } = req.body;
    const data = yield auth_services_1.authService.resetPassword(token, password);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'Password Changed Successfully',
        data: null,
    });
}));
exports.authController = {
    login,
    verifyUser,
    logout,
    forgetPassword,
    resetPassword,
};
