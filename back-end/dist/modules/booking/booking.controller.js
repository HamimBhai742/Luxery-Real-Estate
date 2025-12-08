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
exports.bookingController = void 0;
const create_async_fn_1 = require("../../utils/create.async.fn");
const booking_services_1 = require("./booking.services");
const send_response_1 = require("../../utils/send.response");
const pick_query_1 = require("../../utils/pick.query");
const createBooking = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = req.user;
    const userId = Number(user === null || user === void 0 ? void 0 : user.userId);
    const propertyId = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.propertyId;
    const booking = yield booking_services_1.bookingServices.createBooking(userId, propertyId);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: 'Booking created successfully',
        data: booking,
    });
}));
const getMyBookings = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const userId = Number(user === null || user === void 0 ? void 0 : user.userId);
    const options = (0, pick_query_1.pickQuery)(req.query, [
        'limit',
        'page',
        'search',
        'sortBy',
        'sortOrder',
    ]);
    const filters = (0, pick_query_1.pickQuery)(req.query, ['status']);
    const bookings = yield booking_services_1.bookingServices.getMyBookings(userId, filters, options);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: 'Bookings fetched successfully',
        data: bookings,
    });
}));
exports.bookingController = {
    createBooking,
    getMyBookings,
};
