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
exports.cloudinaryUpload = exports.deleteCloudinaryImage = void 0;
const cloudinary_1 = require("cloudinary");
const env_1 = require("./env");
const coustom_error_1 = require("../error/coustom.error");
cloudinary_1.v2.config({
    cloud_name: env_1.ENV.CLOUDINARY_API_NAME,
    api_key: env_1.ENV.CLOUDINARY_API_KEY,
    api_secret: env_1.ENV.CLOUDINARY_API_SECRET,
});
const deleteCloudinaryImage = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const match = url.match(/([^/]+\.(?:png|jpe?g|gif|webp))$/i);
        if (match && match[1]) {
            const publicId = match[1].replace(/\.(png|jpe?g|gif|webp)$/i, "");
            yield cloudinary_1.v2.uploader.destroy(publicId);
        }
    }
    catch (error) {
        console.log(error);
        throw new coustom_error_1.AppError('Cloudinary images delete failed', 500);
    }
});
exports.deleteCloudinaryImage = deleteCloudinaryImage;
exports.cloudinaryUpload = cloudinary_1.v2;
