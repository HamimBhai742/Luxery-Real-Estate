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
exports.generateUniqueSlug = void 0;
const prisma_configs_1 = require("../config/prisma.configs");
const generateUniqueSlug = (title) => __awaiter(void 0, void 0, void 0, function* () {
    const baseSlug = title.toLowerCase().trim().split(' ').join('-');
    let counter = 0;
    let slug = baseSlug;
    while ((yield prisma_configs_1.prisma.property.findUnique({ where: { slug } })) ||
        (yield prisma_configs_1.prisma.blog.findUnique({ where: { slug } }))) {
        counter++;
        slug = `${baseSlug}-${counter}`;
    }
    return slug;
});
exports.generateUniqueSlug = generateUniqueSlug;
