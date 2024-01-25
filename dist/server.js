"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
//.env
dotenv_1.default.config();
const server = new app_1.default();
//Data base
(0, database_1.startDataBase)();
server.listen();
//# sourceMappingURL=server.js.map