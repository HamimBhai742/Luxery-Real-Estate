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
exports.userController = void 0;
const create_async_fn_1 = require("../../utils/create.async.fn");
const user_services_1 = require("./user.services");
const send_response_1 = require("../../utils/send.response");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const pick_query_1 = require("../../utils/pick.query");
const registerUser = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_services_1.userService.registerUser(req.body);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: 'User created successfully',
        data: user,
    });
}));
const getMe = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = req.user;
    const user = yield user_services_1.userService.getMe(userInfo === null || userInfo === void 0 ? void 0 : userInfo.email);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'User Retrived Successfully',
        data: user,
    });
}));
const getAllUsers = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_query_1.pickQuery)(req.query, [
        'limit',
        'page',
        'search',
        'sortBy',
        'sortOrder',
    ]);
    const filters = (0, pick_query_1.pickQuery)(req.query, ['email', 'phone', 'status']);
    const users = yield user_services_1.userService.getAllUsers(filters, options);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'Users Retrived Successfully',
        data: users,
    });
}));
const updateUser = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_services_1.userService.updateUser(Number(req.params.id), req.body.status);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'User updated successfully',
        data: user,
    });
}));
exports.userController = {
    registerUser,
    getMe,
    getAllUsers,
    updateUser,
};
