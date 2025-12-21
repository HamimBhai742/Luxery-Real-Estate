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
exports.bookingServices = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const prisma_configs_1 = require("../../config/prisma.configs");
const crypto_1 = __importDefault(require("crypto"));
const coustom_error_1 = require("../../error/coustom.error");
const pagination_1 = require("../../utils/pagination");
const booking_constain_1 = require("./booking.constain");
const tranx = () => {
    const id = crypto_1.default.randomBytes(5).toString('hex').substring(0, 10);
    return `tran_${id}`;
};
const createBooking = (userId, propertyId) => __awaiter(void 0, void 0, void 0, function* () {
    const property = yield prisma_configs_1.prisma.property.findUnique({
        where: { id: propertyId },
    });
    if (property === null || property === void 0 ? void 0 : property.isBooked) {
        throw new coustom_error_1.AppError('Property is already booked', http_status_codes_1.default.NOT_ACCEPTABLE);
    }
    return yield prisma_configs_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            userId: Number(userId),
            propertyId,
            totalAmount: Number(property === null || property === void 0 ? void 0 : property.price),
        };
        const booking = yield tx.booking.create({ data });
        yield tx.property.update({
            where: { id: propertyId },
            data: {
                isBooked: true,
                status: 'booked',
            },
        });
        yield tx.payment.create({
            data: {
                bookingId: booking.id,
                transactionId: tranx(),
                userId,
                amount: Number(property === null || property === void 0 ? void 0 : property.price),
            },
        });
        return booking;
    }));
});
const getMyBookings = (userId, filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.pagination)(options);
    const { search } = options;
    const searchTerm = booking_constain_1.bookingSearchFiled.map((field) => ({
        property: {
            [field]: {
                contains: search,
                mode: 'insensitive',
            },
        },
    }));
    const where = {
        AND: [
            { userId },
            filters && Object.keys(filters).length ? filters : undefined,
            search && { OR: searchTerm },
        ].filter(Boolean),
    };
    const bookings = yield prisma_configs_1.prisma.booking.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        include: {
            property: true,
        },
    });
    const total = yield prisma_configs_1.prisma.booking.count({
        where,
    });
    const pendingBookings = yield prisma_configs_1.prisma.booking.count({
        where: {
            userId,
            status: 'pending',
        },
    });
    const confirmedBookings = yield prisma_configs_1.prisma.booking.count({
        where: {
            userId,
            status: 'paid',
        },
    });
    const cancelledBookings = yield prisma_configs_1.prisma.booking.count({
        where: {
            userId,
            status: 'canceled',
        },
    });
    return {
        bookings,
        metaData: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            pendingBookings,
            confirmedBookings,
            cancelledBookings,
        },
    };
});
const getSingleBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield prisma_configs_1.prisma.booking.findUnique({
        where: { id: bookingId },
        include: { property: true },
    });
    return booking;
});
exports.bookingServices = {
    createBooking,
    getMyBookings,
    getSingleBooking,
};
