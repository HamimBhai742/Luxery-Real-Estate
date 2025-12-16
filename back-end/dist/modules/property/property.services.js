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
exports.propertyServices = void 0;
const generate_uniqe_slug_1 = require("../../utils/generate.uniqe.slug");
const prisma_configs_1 = require("../../config/prisma.configs");
const coustom_error_1 = require("../../error/coustom.error");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const pagination_1 = require("../../utils/pagination");
const properties_constain_1 = require("./properties.constain");
const createProperty = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = yield (0, generate_uniqe_slug_1.generateUniqueSlug)(payload.name);
    payload.slug = slug;
    const property = yield prisma_configs_1.prisma.property.create({ data: payload });
    return property;
});
const getMyProperty = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.pagination)(options);
    const { search } = options;
    const searchTerm = properties_constain_1.propertiesSearchField.map((field) => ({
        [field]: {
            contains: search,
            mode: 'insensitive',
        },
    }));
    const where = {
        AND: [
            filters && Object.keys(filters).length ? filters : undefined,
            search && { OR: searchTerm },
        ].filter(Boolean),
    };
    const properties = yield prisma_configs_1.prisma.property.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield prisma_configs_1.prisma.property.count({
        where,
    });
    const availableProperties = yield prisma_configs_1.prisma.property.count({
        where: {
            isBooked: false,
            status: 'available',
        },
    });
    const totalValue = yield prisma_configs_1.prisma.property.aggregate({
        _sum: {
            price: true,
        },
    });
    const totalviews = yield prisma_configs_1.prisma.property.aggregate({
        _sum: {
            views: true,
        },
    });
    return {
        properties,
        metaData: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            totalProperties: availableProperties,
            totalValue: totalValue._sum.price,
            totalViews: totalviews._sum.views,
        },
    };
});
const getAllProperties = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.pagination)(options);
    const { search, prices, bedrooms } = options;
    if (prices === 'under2k') {
        filters.price = {
            lte: 2000,
        };
    }
    else if (prices === '2kto5k') {
        filters.price = {
            gte: 2000,
            lte: 5000,
        };
    }
    else if (prices === '5kto10k') {
        filters.price = {
            gte: 5000,
            lte: 10000,
        };
    }
    else if (prices === 'over10k') {
        filters.price = {
            gte: 10000,
        };
    }
    if (bedrooms == 3) {
        filters.bedrooms = {
            gte: 3,
        };
    }
    else if (bedrooms == 4) {
        filters.bedrooms = {
            gte: 4,
        };
    }
    else if (bedrooms == 5) {
        filters.bedrooms = {
            gte: 5,
        };
    }
    else if (bedrooms == 6) {
        filters.bedrooms = {
            gte: 6,
        };
    }
    const searchTerm = properties_constain_1.propertiesSearchField.map((field) => ({
        [field]: {
            contains: search,
            mode: 'insensitive',
        },
    }));
    const where = {
        AND: [
            filters && Object.keys(filters).length ? filters : undefined,
            search && { OR: searchTerm },
        ].filter(Boolean),
    };
    const properties = yield prisma_configs_1.prisma.property.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield prisma_configs_1.prisma.property.count({
        where,
    });
    return {
        properties,
        metaData: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
});
const updateProperty = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const property = yield prisma_configs_1.prisma.property.findUnique({ where: { id } });
    if (!property) {
        throw new coustom_error_1.AppError('Property not found', http_status_codes_1.default.NOT_FOUND);
    }
    if (payload.name) {
        const slug = yield (0, generate_uniqe_slug_1.generateUniqueSlug)(payload.name);
        payload.slug = slug;
    }
    const updatedProperty = yield prisma_configs_1.prisma.property.update({
        where: { id },
        data: payload,
    });
    return updatedProperty;
});
const getSingleProperty = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_configs_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.property.update({
            where: { slug },
            data: {
                views: {
                    increment: 1,
                },
            },
        });
        return yield tx.property.findUnique({ where: { slug } });
    }));
});
const deleteProperty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const property = yield prisma_configs_1.prisma.property.findUnique({ where: { id } });
    if (!property) {
        throw new coustom_error_1.AppError('Property not found', http_status_codes_1.default.NOT_FOUND);
    }
    const deletedProperty = yield prisma_configs_1.prisma.property.delete({ where: { id } });
    return deletedProperty;
});
exports.propertyServices = {
    createProperty,
    getMyProperty,
    updateProperty,
    deleteProperty,
    getAllProperties,
    getSingleProperty,
};
