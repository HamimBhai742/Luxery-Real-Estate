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
exports.propertyController = void 0;
const create_async_fn_1 = require("../../utils/create.async.fn");
const send_response_1 = require("../../utils/send.response");
const property_services_1 = require("./property.services");
const pick_query_1 = require("../../utils/pick.query");
const createProperty = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payload = Object.assign(Object.assign({}, req.body), { images: (_a = req.files) === null || _a === void 0 ? void 0 : _a.map((file) => file.path) });
    const property = yield property_services_1.propertyServices.createProperty(payload);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: 'Property created successfully',
        data: property,
    });
}));
const getMyProperties = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_query_1.pickQuery)(req.query, [
        'limit',
        'page',
        'search',
        'sortBy',
        'sortOrder',
    ]);
    const filters = (0, pick_query_1.pickQuery)(req.query, ['status']);
    const properties = yield property_services_1.propertyServices.getMyProperty(filters, options);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: 'Properties Retrived Successfully',
        data: properties,
    });
}));
const getAllProperties = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_query_1.pickQuery)(req.query, [
        'limit',
        'page',
        'search',
        'sortBy',
        'sortOrder',
        'prices',
        'bedrooms'
    ]);
    const filters = (0, pick_query_1.pickQuery)(req.query, ['status', 'price', 'bedrooms']);
    const properties = yield property_services_1.propertyServices.getAllProperties(filters, options);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: 'Properties Retrived Successfully',
        data: properties,
    });
}));
const getSingleProperty = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const property = yield property_services_1.propertyServices.getSingleProperty(req.params.slug);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: 'Property Retrived Successfully',
        data: property,
    });
}));
const updateProperty = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const property = yield property_services_1.propertyServices.updateProperty(req.params.id, req.body);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: 'Property updated successfully',
        data: property,
    });
}));
const deleteProperty = (0, create_async_fn_1.createAsyncFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const property = yield property_services_1.propertyServices.deleteProperty(req.params.id);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: 'Property deleted successfully',
        data: property,
    });
}));
exports.propertyController = {
    createProperty,
    getMyProperties,
    updateProperty,
    deleteProperty,
    getAllProperties,
    getSingleProperty,
};
