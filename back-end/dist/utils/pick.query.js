"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickQuery = void 0;
const pickQuery = (obj, keys) => {
    const picObj = {};
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            picObj[key] = obj[key];
        }
    }
    return picObj;
};
exports.pickQuery = pickQuery;
