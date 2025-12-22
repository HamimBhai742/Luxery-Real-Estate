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
exports.reviewServices = void 0;
const prisma_configs_1 = require("../../config/prisma.configs");
const pagination_1 = require("../../utils/pagination");
const createReview = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = Object.assign(Object.assign({}, payload), { userId });
    return prisma_configs_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.booking.update({
            where: { id: payload.bookingId },
            data: {
                isReviewed: true,
            },
        });
        return yield tx.review.create({ data });
    }));
});
const getAllReviews = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.pagination)(options);
    const reviews = yield prisma_configs_1.prisma.review.findMany({
        include: {
            booking: {
                include: {
                    property: true,
                },
            },
            user: {
                select: {
                    name: true,
                    email: true,
                    profile: true,
                },
            },
        },
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    return {
        reviews,
        metaData: {
            page,
            limit,
            total: yield prisma_configs_1.prisma.review.count(),
            totalPages: Math.ceil((yield prisma_configs_1.prisma.review.count()) / limit),
        },
    };
});
exports.reviewServices = {
    createReview,
    getAllReviews,
};
