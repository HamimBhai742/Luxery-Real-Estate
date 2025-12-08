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
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const zod_validation_1 = require("../../middleware/zod.validation");
const auth_schema_1 = require("./auth.schema");
const check_auth_1 = require("../../middleware/check.auth");
const client_1 = require("@prisma/client");
const passport_1 = __importDefault(require("passport"));
const env_1 = require("../../config/env");
const router = (0, express_1.Router)();
router.post('/login', (0, zod_validation_1.validateRequest)(auth_schema_1.loginZodSchema), auth_controller_1.authController.login);
router.post('/verify', (0, check_auth_1.checkAuth)(...Object.values(client_1.Role)), auth_controller_1.authController.verifyUser);
router.get('/google', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const redirect = req.query.redricet || '/';
    passport_1.default.authenticate('google', {
        scope: ['profile', 'email'],
        state: redirect,
    })(req, res, next);
}));
router.get('/google/callback', passport_1.default.authenticate('google', {
    failureRedirect: `${env_1.ENV.CLIENT_URL}/login?erro=You have not logged in google `,
}), auth_controller_1.authController.googleCallback);
router.post('/forgot-password', auth_controller_1.authController.forgetPassword);
router.post('/reset-password', auth_controller_1.authController.resetPassword);
router.post('/logout', auth_controller_1.authController.logout);
router.patch('/change-password', (0, check_auth_1.checkAuth)(...Object.values(client_1.Role)), auth_controller_1.authController.changePassword);
exports.authRoutes = router;
