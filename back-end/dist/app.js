"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const routes_1 = require("./routes/routes");
const cors_1 = __importDefault(require("cors"));
const not_found_1 = require("./middleware/not.found");
const global_error_1 = require("./middleware/global.error");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const env_1 = require("./config/env");
require("./config/passport");
exports.app = (0, express_1.default)();
exports.app.use((0, express_session_1.default)({
    secret: env_1.ENV.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
exports.app.use(passport_1.default.initialize());
exports.app.use(passport_1.default.session());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.set('trust proxy', 1);
exports.app.use((0, cors_1.default)({
    origin: [
        'http://localhost:3000',
        'https://luxery-real-estate-742.vercel.app',
    ],
    credentials: true,
}));
exports.app.use('/api/v1', routes_1.router);
exports.app.get('/', (req, res) => {
    res.send('Luxiery Real Estate Server Running.........');
});
exports.app.use(global_error_1.globalErrorHandel);
exports.app.use(not_found_1.notFound);
