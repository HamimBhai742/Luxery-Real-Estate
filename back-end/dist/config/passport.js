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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_local_1 = require("passport-local");
const env_1 = require("./env");
const prisma_configs_1 = require("./prisma.configs");
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//gmail and pass login
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isExsist = yield prisma_configs_1.prisma.user.findUnique({ where: { email } });
        if (!isExsist) {
            return done(null, false, {
                message: 'Invalid email. Please enter a registered email address',
            });
        }
        const isGoogle = isExsist.provider === client_1.Auth_Provider.google;
        if (isGoogle && !isExsist.password) {
            return done(null, false, { message: 'You have login google' });
        }
        if (isExsist.status === 'inactive') {
            return done(null, false, {
                message: `${isExsist.role} is ${isExsist.status}`,
            });
        }
        if (isExsist.isDeleted) {
            return done(null, false, { message: `${isExsist.role} is deleted` });
        }
        const isMatchPassword = yield bcryptjs_1.default.compare(password, isExsist === null || isExsist === void 0 ? void 0 : isExsist.password);
        if (!isMatchPassword) {
            return done(null, false, {
                message: 'Incorrect password. Please try again.',
            });
        }
        return done(null, isExsist);
    }
    catch (error) {
        done(error);
    }
})));
// Configure the Google strategy
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: env_1.ENV.GOOGLE_CLIENT_ID,
    clientSecret: env_1.ENV.GOOGLE_CLIENT_SECRET,
    callbackURL: env_1.ENV.CALL_BACK_URL,
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = profile.emails[0].value;
        if (!email) {
            return done(null, false, { message: 'Email not found' });
        }
        let user = yield prisma_configs_1.prisma.user.findUnique({ where: { email } });
        if (user === null || user === void 0 ? void 0 : user.isDeleted) {
            return done(null, false, { message: 'User is deleted' });
        }
        if ((user === null || user === void 0 ? void 0 : user.status) === 'inactive') {
            return done(null, false, { message: 'User is inactive' });
        }
        if (!user) {
            user = yield prisma_configs_1.prisma.user.create({
                data: {
                    email,
                    profile: profile.photos[0].value,
                    name: profile.displayName,
                    provider: client_1.Auth_Provider.google,
                    providerId: profile.id,
                    role: client_1.Role.USER,
                },
            });
        }
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
})));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_configs_1.prisma.user.findUnique({
            where: {
                id,
            },
        });
        done(null, user);
    }
    catch (error) {
        done(error);
    }
}));
