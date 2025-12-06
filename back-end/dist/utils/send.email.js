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
exports.sendEmail = void 0;
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../config/env");
const transporter = nodemailer_1.default.createTransport({
    host: env_1.ENV.SMTP_HOST,
    port: env_1.ENV.SMTP_PORT,
    secure: true,
    auth: {
        user: env_1.ENV.SMTP_USER,
        pass: env_1.ENV.SMTP_PASS,
    },
});
const sendEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ to, subject, templateName, templateData, }) {
    try {
        const template = path_1.default.join(__dirname, `templates/${templateName}.ejs`);
        const html = yield ejs_1.default.renderFile(template, templateData);
        yield transporter.sendMail({
            from: env_1.ENV.SMTP_USER,
            to: to,
            subject: subject,
            html: html,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendEmail = sendEmail;
