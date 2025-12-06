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
exports.paymentServices = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const prisma_configs_1 = require("../../config/prisma.configs");
const coustom_error_1 = require("../../error/coustom.error");
const client_1 = require("@prisma/client");
const sslcommerz_services_1 = require("../sslcommerz/sslcommerz.services");
const payment_constain_1 = require("./payment.constain");
const pagination_1 = require("../../utils/pagination");
const send_email_1 = require("../../utils/send.email");
const env_1 = require("../../config/env");
const initPayment = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield prisma_configs_1.prisma.payment.findUnique({ where: { bookingId } });
    if (!payment) {
        throw new coustom_error_1.AppError('Payment Not Found', http_status_codes_1.default.NOT_FOUND);
    }
    if (payment.status === client_1.PaymentStatus.succeeded) {
        throw new coustom_error_1.AppError('Payment already paid & booking complete', http_status_codes_1.default.NOT_FOUND);
    }
    if (payment.status === client_1.PaymentStatus.failed) {
        throw new coustom_error_1.AppError('Payment failed', http_status_codes_1.default.NOT_FOUND);
    }
    const booking = yield prisma_configs_1.prisma.booking.findUnique({ where: { id: bookingId } });
    const user = yield prisma_configs_1.prisma.user.findUnique({ where: { id: booking === null || booking === void 0 ? void 0 : booking.userId } });
    const sslPayload = {
        name: user === null || user === void 0 ? void 0 : user.name,
        amount: booking === null || booking === void 0 ? void 0 : booking.totalAmount,
        phone: user === null || user === void 0 ? void 0 : user.phone,
        email: user === null || user === void 0 ? void 0 : user.email,
        transactionId: payment.transactionId,
    };
    const sslPayment = yield sslcommerz_services_1.sslCommerzServices.paymentInit(sslPayload);
    return {
        paymentUrl: sslPayment.GatewayPageURL,
    };
});
//success Payment
const successPayment = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_configs_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const updatePayment = yield tx.payment.update({
            where: { transactionId: query.transactionId },
            data: {
                status: client_1.PaymentStatus.succeeded,
            },
        });
        const user = yield tx.user.findUnique({
            where: { id: updatePayment.userId },
        });
        const booking = yield tx.booking.update({
            where: { id: updatePayment.bookingId },
            data: {
                status: client_1.BookingStatus.paid,
            },
        });
        yield tx.property.update({
            where: { id: booking.propertyId },
            data: {
                isBooked: true,
                status: 'sold',
            },
        });
        (0, send_email_1.sendEmail)({
            to: user.email,
            subject: 'Payment Successful',
            templateName: 'paymentSuccess',
            templateData: {
                name: user.name,
                transactionId: updatePayment.transactionId,
                amount: updatePayment.amount,
                paymentDate: updatePayment.updatedAt.toISOString().split('T')[0],
                appName: env_1.ENV.APP_NAME,
            },
        });
        return {
            success: true,
            message: 'Payment Success & Booking Success',
        };
    }));
});
//failed Payment
const failedPayment = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_configs_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const updatePayment = yield tx.payment.update({
            where: { transactionId: query.transactionId },
            data: {
                status: client_1.PaymentStatus.failed,
            },
        });
        const user = yield tx.user.findUnique({
            where: { id: updatePayment.userId },
        });
        const booking = yield tx.booking.update({
            where: { id: updatePayment.bookingId },
            data: {
                status: 'canceled',
            },
        });
        yield tx.property.update({
            where: { id: booking.propertyId },
            data: {
                isBooked: false,
                status: 'available',
            },
        });
        (0, send_email_1.sendEmail)({
            to: user.email,
            subject: 'Payment Canceled',
            templateName: 'paymentCanceled',
            templateData: {
                name: user.name,
                transactionId: updatePayment.transactionId,
                amount: updatePayment.amount,
                failedDate: updatePayment.updatedAt.toISOString().split('T')[0],
                appName: env_1.ENV.APP_NAME,
                reason: 'Insufficient funds',
            },
        });
        return {
            failed: true,
            message: 'Payment Failed & Booking Failed',
        };
    }));
});
//cancel Payment
const cancelPayment = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_configs_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const updatePayment = yield tx.payment.update({
            where: { transactionId: query.transactionId },
            data: {
                status: client_1.PaymentStatus.canceled,
            },
        });
        const user = yield tx.user.findUnique({
            where: { id: updatePayment.userId },
        });
        const booking = yield tx.booking.update({
            where: { id: updatePayment.bookingId },
            data: {
                status: client_1.BookingStatus.canceled,
            },
        });
        yield tx.property.update({
            where: { id: booking.propertyId },
            data: {
                isBooked: false,
                status: 'available',
            },
        });
        (0, send_email_1.sendEmail)({
            to: user.email,
            subject: 'Payment Canceled',
            templateName: 'paymentCanceled',
            templateData: {
                name: user.name,
                transactionId: updatePayment.transactionId,
                amount: updatePayment.amount,
                canceledDate: updatePayment.updatedAt.toISOString().split('T')[0],
                appName: env_1.ENV.APP_NAME,
                reason: 'Payment Canceled',
            },
        });
        return {
            canceled: true,
            message: 'Payment Canceled & Booking Canceled',
        };
    }));
});
const getAllPayments = () => __awaiter(void 0, void 0, void 0, function* () {
    const payments = yield prisma_configs_1.prisma.payment.findMany();
    return payments;
});
const getMyPayments = (userId, filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, skip, sortBy, sortOrder } = (0, pagination_1.pagination)(options);
    const { search } = options;
    const searchTerm = payment_constain_1.paymentSearchFiled.map((field) => ({
        [field]: {
            contains: search,
            mode: 'insensitive',
        },
    }));
    const where = {
        AND: [
            { userId },
            filters && Object.keys(filters).length ? filters : undefined,
            search && { OR: searchTerm },
        ].filter(Boolean),
    };
    const payments = yield prisma_configs_1.prisma.payment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
    });
    const totalAmount = yield prisma_configs_1.prisma.payment.aggregate({
        where,
        _sum: {
            amount: true,
        },
    });
    const total = yield prisma_configs_1.prisma.payment.count({
        where,
    });
    const totalSuccess = yield prisma_configs_1.prisma.payment.count({
        where: {
            status: client_1.PaymentStatus.succeeded,
        },
    });
    const totalFailed = yield prisma_configs_1.prisma.payment.count({
        where: {
            status: client_1.PaymentStatus.failed,
        },
    });
    const totalCanceled = yield prisma_configs_1.prisma.payment.count({
        where: {
            status: client_1.PaymentStatus.canceled,
        },
    });
    const totalPending = yield prisma_configs_1.prisma.payment.count({
        where: {
            status: client_1.PaymentStatus.pending,
        },
    });
    return {
        payments,
        metaData: {
            total,
            totalSuccess,
            totalFailed,
            totalCanceled,
            totalAmount: totalAmount._sum.amount,
            totalPending,
            totalPages: Math.ceil(total / limit),
        },
    };
    return payments;
});
exports.paymentServices = {
    successPayment,
    failedPayment,
    cancelPayment,
    getAllPayments,
    initPayment,
    getMyPayments,
};
