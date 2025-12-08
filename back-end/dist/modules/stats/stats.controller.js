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
Object.defineProperty(exports, "__esModule", { value: true });
exports.statsController = void 0;
const create_async_fn_1 = require("../../utils/create.async.fn");
const send_response_1 = require("../../utils/send.response");
const stats_services_1 = require("./stats.services");
const getAdminStats = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stats = yield stats_services_1.statsServices.getAdminStats();
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: 'Stats fetched successfully',
        data: stats,
    });
}));
const getUserStats = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const userId = Number(user === null || user === void 0 ? void 0 : user.userId);
    const stats = yield stats_services_1.statsServices.getUserStats(userId);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: 'Stats fetched successfully',
        data: stats,
    });
}));
const getHomeStats = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stats = yield stats_services_1.statsServices.getHomeStats();
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: 'Stats fetched successfully',
        data: stats,
    });
}));
exports.statsController = {
    getAdminStats,
    getUserStats,
    getHomeStats,
};
