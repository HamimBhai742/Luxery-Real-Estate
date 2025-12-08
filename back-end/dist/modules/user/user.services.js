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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const env_1 = require("../../config/env");
const prisma_configs_1 = require("../../config/prisma.configs");
const coustom_error_1 = require("../../error/coustom.error");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const pagination_1 = require("../../utils/pagination");
const user_contain_1 = require("./user.contain");
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = payload, rest = __rest(payload, ["password"]);
    const hashedPass = yield bcryptjs_1.default.hash(password, env_1.ENV.BCRYPT_SALT_ROUNDS);
    const user = yield prisma_configs_1.prisma.user.create({
        data: Object.assign(Object.assign({}, rest), { password: hashedPass, provider: 'creadintial', providerId: rest.email }),
    });
    return {
        name: user.name,
        email: user.email,
        role: user.role,
    };
});
const getMe = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_configs_1.prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new coustom_error_1.AppError('User not found', http_status_codes_1.default.NOT_FOUND);
    }
    return {
        name: user.name,
        email: user.email,
        role: user.role,
        id: user.id,
    };
});
const getAllUsers = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.pagination)(options);
    const { search } = options;
    const searchTerm = user_contain_1.userSearchFileds.map((field) => ({
        [field]: {
            contains: search,
            mode: 'insensitive',
        },
    }));
    const where = {
        AND: [
            filters && Object.keys(filters).length ? filters : undefined,
            search && { OR: searchTerm },
            {
                isDeleted: false,
                role: 'USER',
            },
        ].filter(Boolean),
    };
    const users = yield prisma_configs_1.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield prisma_configs_1.prisma.user.count({
        where,
    });
    const totalActive = yield prisma_configs_1.prisma.user.count({
        where: {
            status: 'active',
            role: 'USER',
        },
    });
    const totalInactive = yield prisma_configs_1.prisma.user.count({
        where: {
            status: 'inactive',
            role: 'USER',
        },
    });
    return {
        data: users,
        metaData: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            totalActive,
            totalInactive,
        },
    };
});
const updateUser = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_configs_1.prisma.user.update({
        where: { id },
        data: {
            status,
        },
    });
    return user;
});
exports.userService = {
    registerUser,
    getMe,
    getAllUsers,
    updateUser,
};
