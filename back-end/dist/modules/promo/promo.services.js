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
exports.promoServices = void 0;
const prisma_configs_1 = require("../../config/prisma.configs");
const coustom_error_1 = require("../../error/coustom.error");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createPromo = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const promoCode = data.code.toUpperCase();
    const discount = Number(data.discount);
    const validFrom = new Date(data.validFrom);
    const validTo = new Date(data.validTo);
    const payload = {
        code: promoCode,
        discount,
        validFrom,
        validTo,
    };
    const promos = yield prisma_configs_1.prisma.promo.create({ data: payload });
    return promos;
});
const usePromo = (code, bookingId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const promos = yield prisma_configs_1.prisma.promo.findUnique({ where: { code } });
    if (!promos) {
        throw new coustom_error_1.AppError('Invalid Promo', http_status_codes_1.default.NOT_FOUND);
    }
    const promosUsages = yield prisma_configs_1.prisma.promoUsage.findUnique({
        where: { promoId_userId: { promoId: promos.id, userId } },
    });
    if (promosUsages) {
        throw new coustom_error_1.AppError('Promo already used', http_status_codes_1.default.NOT_FOUND);
    }
    const booking = yield prisma_configs_1.prisma.booking.findUnique({
        where: { id: bookingId },
        include: { property: true },
    });
    if (!booking) {
        throw new coustom_error_1.AppError('Booking not found', http_status_codes_1.default.NOT_FOUND);
    }
    const discountAmount = (Number(booking.property.price) * Number(promos.discount)) / 100;
    const totalAmount = Number(booking.property.price) - discountAmount;
    yield prisma_configs_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const booking = yield tx.booking.update({
            where: { id: bookingId },
            data: {
                totalAmount,
            },
        });
        yield tx.payment.update({
            where: { bookingId: booking.id },
            data: {
                amount: totalAmount,
            },
        });
    }));
    return { totalAmount, discountAmount, discount: promos.discount };
});
const createUsePromo = (code, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const promos = yield prisma_configs_1.prisma.promo.findUnique({ where: { code } });
    if (!promos) {
        throw new coustom_error_1.AppError('Invalid Promo', http_status_codes_1.default.NOT_FOUND);
    }
    return yield prisma_configs_1.prisma.promoUsage.create({
        data: {
            promoId: promos.id,
            userId,
        },
    });
});
exports.promoServices = {
    createPromo,
    usePromo,
    createUsePromo,
};
