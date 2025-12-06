"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookies = void 0;
const setCookies = (res, token) => {
    if (token === null || token === void 0 ? void 0 : token.accessToken) {
        res.cookie('accessToken', token.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
            // domain:'.luxery-real-estate-742.vercel.app'
        });
    }
};
exports.setCookies = setCookies;
