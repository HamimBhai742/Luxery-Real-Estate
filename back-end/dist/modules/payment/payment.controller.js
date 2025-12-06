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
exports.paymentController = void 0;
const create_async_fn_1 = require("../../utils/create.async.fn");
const payment_services_1 = require("./payment.services");
const send_response_1 = require("../../utils/send.response");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const env_1 = require("../../config/env");
const pick_query_1 = require("../../utils/pick.query");
const createPayment = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield payment_services_1.paymentServices.initPayment(req.body.bookingId);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: 'Payment Initiated Successfully',
        data: payment,
    });
}));
//success payment
const successPayment = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const payment = yield payment_services_1.paymentServices.successPayment(query);
    if (payment.success) {
        res.redirect(`${env_1.ENV.SSL_SUCCESS_FRONT_END_URL}?transactionId=${query.transactionId}&message=${payment.message}&amount=${query.amount}&status=${query.status}`);
    }
}));
//failed payment
const failedPayment = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const payment = yield payment_services_1.paymentServices.failedPayment(query);
    if (payment.failed) {
        res.redirect(`${env_1.ENV.SSL_FAIL_FRONT_END_URL}?transactionId=${query.transactionId}&message=${payment.message}&amount=${query.amount}&status=${query.status}`);
    }
}));
//cancel payment
const cancelPayment = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const payment = yield payment_services_1.paymentServices.cancelPayment(query);
    if (payment.canceled) {
        res.redirect(`${env_1.ENV.SSL_CANCEL_FRONT_END_URL}?transactionId=${query.transactionId}&message=${payment.message}&amount=${query.amount}&status=${query.status}`);
    }
}));
const getAllPayments = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payments = yield payment_services_1.paymentServices.getAllPayments();
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'All Payments',
        data: payments,
    });
}));
const getMyPayments = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const options = (0, pick_query_1.pickQuery)(req.query, [
        'limit',
        'page',
        'search',
        'sortBy',
        'sortOrder',
    ]);
    const filters = (0, pick_query_1.pickQuery)(req.query, ['status']);
    const payments = yield payment_services_1.paymentServices.getMyPayments(Number((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId), filters, options);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'My Payments',
        data: payments,
    });
}));
exports.paymentController = {
    createPayment,
    successPayment,
    failedPayment,
    cancelPayment,
    getAllPayments,
    getMyPayments,
};
