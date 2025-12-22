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
exports.reviewController = void 0;
const create_async_fn_1 = require("../../utils/create.async.fn");
const review_services_1 = require("./review.services");
const send_response_1 = require("../../utils/send.response");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const pick_query_1 = require("../../utils/pick.query");
const createReview = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const { userId } = req.user;
    const review = yield review_services_1.reviewServices.createReview(payload, Number(userId));
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: 'Review created successfully',
        data: review,
    });
}));
const getAllReviews = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_query_1.pickQuery)(req.query, [
        'limit',
        'page',
        'search',
        'sortBy',
        'sortOrder',
    ]);
    const filters = (0, pick_query_1.pickQuery)(req.query, ['status']);
    const reviews = yield review_services_1.reviewServices.getAllReviews(options);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'Reviews Retrived Successfully',
        data: reviews.reviews,
        metaData: reviews.metaData,
    });
}));
exports.reviewController = {
    createReview,
    getAllReviews,
};
