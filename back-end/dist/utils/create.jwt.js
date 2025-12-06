"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserToken = void 0;
const env_1 = require("../config/env");
const create_token_1 = require("./create.token");
const createUserToken = (payload) => {
    const jsonPayload = {
        userId: payload.id,
        email: payload.email,
        role: payload.role,
    };
    const accessToken = (0, create_token_1.createJwtToken)(jsonPayload, env_1.ENV.JWT_SECRET, env_1.ENV.JWT_EXPIRES_IN);
    return {
        accessToken,
    };
};
exports.createUserToken = createUserToken;
