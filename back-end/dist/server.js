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
const app_1 = require("./app");
const env_1 = require("./config/env");
const conneect_db_1 = require("./config/conneect.db");
const seedAdmin_1 = require("./utils/seedAdmin");
let server;
const PORT = env_1.ENV.PORT;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    server = app_1.app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
(() => {
    (0, conneect_db_1.connectDB)();
    startServer();
    (0, seedAdmin_1.seedAdmin)();
})();
