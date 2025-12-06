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
exports.sslCommerzServices = void 0;
const axios_1 = __importDefault(require("axios"));
const coustom_error_1 = require("../../error/coustom.error");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const env_1 = require("../../config/env");
const paymentInit = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            store_id: env_1.ENV.SSL_STORE_ID,
            store_passwd: env_1.ENV.SSL_STORE_PASSWORD,
            total_amount: payload.amount,
            currency: 'USD',
            tran_id: payload.transactionId,
            success_url: `${env_1.ENV.SSL_SUCCESS_BACK_END_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=succeeded`,
            fail_url: `${env_1.ENV.SSL_FAILED_BACK_END_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=failed`,
            cancel_url: `${env_1.ENV.SSL_CANCEL_BACK_END_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=canceled`,
            ipn_url: env_1.ENV.SSL_IPN_URL,
            cus_name: payload.name,
            cus_email: payload.email,
            cus_add2: 'N/A',
            cus_city: 'Dhaka',
            cus_state: 'Tejgaon',
            cus_postcode: 1208,
            cus_country: 'Bangladesh',
            cus_phone: payload.phone,
            cus_fax: '01711111111',
            ship_name: 'N/A',
            ship_add1: 'N/A',
            ship_add2: 'N/A',
            ship_city: 'N/A',
            ship_state: 'N/A',
            ship_postcode: 1000,
            ship_country: 'N/A',
        };
        const res = yield (0, axios_1.default)({
            method: 'POST',
            url: env_1.ENV.SSL_PAYMENT_API,
            data: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return res.data;
    }
    catch (error) {
        console.log(error);
        throw new coustom_error_1.AppError(error.message, http_status_codes_1.default.BAD_REQUEST);
    }
});
exports.sslCommerzServices = {
    paymentInit,
};
