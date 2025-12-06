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
exports.statsServices = void 0;
const prisma_configs_1 = require("../../config/prisma.configs");
const getAdminStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalProperties = yield prisma_configs_1.prisma.property.count();
    const totalUsers = yield prisma_configs_1.prisma.user.count();
    const totalBookings = yield prisma_configs_1.prisma.booking.count({
        where: {
            status: 'pending',
        },
    });
    const totalRevenue = yield prisma_configs_1.prisma.payment.aggregate({
        where: {
            status: 'succeeded',
        },
        _sum: {
            amount: true,
        },
    });
    const today = new Date();
    const last7days = new Date();
    last7days.setDate(today.getDate() - 6);
    const dailyRevenue = yield prisma_configs_1.prisma.payment.groupBy({
        by: ['createdAt'],
        where: {
            status: 'succeeded',
            createdAt: {
                gte: last7days,
                lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
            },
        },
        _sum: {
            amount: true,
        },
    });
    const chartData = Array.from({ length: 7 }).map((_, i) => {
        const date = new Date();
        date.setDate(today.getDate() - (6 - i));
        const formatted = date.toISOString().split('T')[0];
        const found = dailyRevenue.find((d) => d.createdAt.toISOString().split('T')[0] === formatted);
        return {
            date: formatted,
            revenue: (found === null || found === void 0 ? void 0 : found._sum.amount) || 0,
        };
    });
    const paymentCounts = yield prisma_configs_1.prisma.payment.groupBy({
        by: ['status'],
        _count: {
            status: true,
        },
    });
    console.log(paymentCounts);
    const paymentData = paymentCounts.map((p) => {
        let color = '';
        if (p.status === 'succeeded')
            color = '#16a34a'; // green
        else if (p.status === 'failed')
            color = '#f59e0b'; // amber
        else if (p.status === 'canceled')
            color = '#dc2626'; // red
        else if (p.status === 'pending')
            color = '#3b82f6'; // blue (Tailwind: blue-500)
        return {
            name: p.status === 'succeeded'
                ? 'Success'
                : p.status === 'failed'
                    ? 'Failed'
                    : p.status === 'canceled'
                        ? 'Canceled'
                        : 'Pending',
            value: p._count.status,
            color,
        };
    });
    const recentProperties = yield prisma_configs_1.prisma.property.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        take: 5,
    });
    return {
        totalProperties,
        totalUsers,
        totalBookings,
        totalRevenue: totalRevenue._sum.amount || 0,
        recentProperties,
        chartData,
        paymentData,
    };
});
const getUserStats = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const totalMyBookings = yield prisma_configs_1.prisma.booking.count({
        where: {
            userId,
        },
    });
    const totalMyBookingsCompleted = yield prisma_configs_1.prisma.booking.count({
        where: {
            userId,
            status: 'paid',
        },
    });
    const totalMyBookingsPending = yield prisma_configs_1.prisma.booking.count({
        where: {
            userId,
            status: 'pending',
        },
    });
    const totalSpent = yield prisma_configs_1.prisma.payment.aggregate({
        where: {
            userId,
            status: 'succeeded',
        },
        _sum: {
            amount: true,
        },
    });
    const recentBookings = yield prisma_configs_1.prisma.booking.findMany({
        where: {
            userId,
        },
        orderBy: {
            updatedAt: 'desc',
        },
        take: 3,
        include: {
            property: true,
        },
    });
    const recentsPayments = yield prisma_configs_1.prisma.payment.findMany({
        where: {
            userId,
        },
        orderBy: {
            updatedAt: 'desc',
        },
        take: 3,
    });
    const getMe = yield prisma_configs_1.prisma.user.findUnique({
        where: { id: userId },
        select: {
            name: true,
            email: true,
            role: true,
        },
    });
    return {
        totalMyBookings,
        totalMyBookingsCompleted,
        totalMyBookingsPending,
        totalSpent: totalSpent._sum.amount || 0,
        recentBookings,
        recentsPayments,
        user: getMe,
    };
});
const getHomeStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalProperties = yield prisma_configs_1.prisma.property.count();
    const totalUsers = yield prisma_configs_1.prisma.user.count();
    const totalBookings = yield prisma_configs_1.prisma.booking.count({
        where: {
            status: 'pending',
        },
    });
    const totalValue = yield prisma_configs_1.prisma.property.aggregate({
        _sum: {
            price: true,
        },
    });
    return {
        totalProperties,
        totalUsers,
        totalBookings,
        totalValue: totalValue._sum.price || 0,
    };
});
exports.statsServices = {
    getAdminStats,
    getUserStats,
    getHomeStats,
};
