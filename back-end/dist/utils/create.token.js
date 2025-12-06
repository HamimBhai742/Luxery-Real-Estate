"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwtToken = exports.createJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createJwtToken = (payload, secret, expiresIn) => {
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn });
};
exports.createJwtToken = createJwtToken;
const verifyJwtToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyJwtToken = verifyJwtToken;
