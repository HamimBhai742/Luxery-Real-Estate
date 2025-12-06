"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAsyncFn = void 0;
const createAsyncFn = (fn) => (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
};
exports.createAsyncFn = createAsyncFn;
