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
exports.promoController = void 0;
const create_async_fn_1 = require("../../utils/create.async.fn");
const promo_services_1 = require("./promo.services");
const send_response_1 = require("../../utils/send.response");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createPromo = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const promo = yield promo_services_1.promoServices.createPromo(payload);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: 'Promo created successfully',
        data: promo,
    });
}));
const usePromo = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, bookingId } = req.body;
    const { userId } = req.user;
    console.log(code, bookingId, userId);
    const promos = yield promo_services_1.promoServices.usePromo(code.toUpperCase(), bookingId, Number(userId));
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'Promo used successfully',
        data: promos,
    });
}));
const createUsePromo = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.body;
    const { userId } = req.user;
    const promos = yield promo_services_1.promoServices.createUsePromo(code.toUpperCase(), Number(userId));
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'Promo used successfully',
        data: promos,
    });
}));
const getAllPromo = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const promos = yield promo_services_1.promoServices.getAllPromos();
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'Promo used successfully',
        data: promos,
    });
}));
const updatePromo = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const promos = yield promo_services_1.promoServices.updatePromo(id, payload);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'Promo updated successfully',
        data: promos,
    });
}));
const deletePromo = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const promos = yield promo_services_1.promoServices.deletePromo(id);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'Promo deleted successfully',
        data: promos,
    });
}));
exports.promoController = {
    createPromo,
    usePromo,
    createUsePromo,
    getAllPromo,
    updatePromo,
    deletePromo,
};
