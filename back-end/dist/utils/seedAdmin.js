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
exports.seedAdmin = void 0;
const client_1 = require("@prisma/client");
const env_1 = require("../config/env");
const prisma_configs_1 = require("../config/prisma.configs");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = env_1.ENV.ADMIN_EMAIL;
        const admin = yield prisma_configs_1.prisma.user.findUnique({ where: { email } });
        if (admin) {
            console.error('Admin already exists');
            return;
        }
        const hashedPass = yield bcryptjs_1.default.hash(env_1.ENV.ADMIN_PASSWORD, env_1.ENV.ADMIN_PASS_SALT_ROUNDS);
        const payload = {
            name: 'Admin',
            email,
            password: hashedPass,
            role: client_1.Role.ADMIN,
        };
        const newAdmin = yield prisma_configs_1.prisma.user.create({
            data: payload,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.seedAdmin = seedAdmin;
