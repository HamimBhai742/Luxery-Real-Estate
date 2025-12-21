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
exports.blogServices = void 0;
const prisma_configs_1 = require("../../config/prisma.configs");
const coustom_error_1 = require("../../error/coustom.error");
const generate_uniqe_slug_1 = require("../../utils/generate.uniqe.slug");
const pagination_1 = require("../../utils/pagination");
const blog_constain_1 = require("./blog.constain");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createBlog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = yield (0, generate_uniqe_slug_1.generateUniqueSlug)(payload.title);
    payload.slug = slug;
    const blog = yield prisma_configs_1.prisma.blog.create({ data: payload });
    return blog;
});
const getAllBlogs = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.pagination)(options);
    const { search } = options;
    const searchTerm = blog_constain_1.blogSearchField.map((field) => ({
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
    const blog = yield prisma_configs_1.prisma.blog.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield prisma_configs_1.prisma.blog.count({
        where,
    });
    return {
        blog,
        metaData: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
});
const getSingleBlog = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield prisma_configs_1.prisma.blog.findUnique({ where: { slug } });
    return blog;
});
const getMyBlogs = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.pagination)(options);
    const { search } = options;
    const searchTerm = blog_constain_1.blogSearchField.map((field) => ({
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
    const blog = yield prisma_configs_1.prisma.blog.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield prisma_configs_1.prisma.blog.count({
        where,
    });
    return {
        blog,
        metaData: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
});
const updateBlog = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findBlog = yield prisma_configs_1.prisma.blog.findUnique({ where: { id } });
    if (!findBlog) {
        throw new coustom_error_1.AppError('Blog not found', http_status_codes_1.default.NOT_FOUND);
    }
    if (payload.title) {
        const slug = yield (0, generate_uniqe_slug_1.generateUniqueSlug)(payload.title);
        payload.slug = slug;
    }
    const blog = yield prisma_configs_1.prisma.blog.update({ where: { id }, data: payload });
    return blog;
});
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield prisma_configs_1.prisma.blog.delete({ where: { id } });
    return blog;
});
exports.blogServices = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    getMyBlogs,
    updateBlog,
    deleteBlog,
};
