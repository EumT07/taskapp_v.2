"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("colors");
const dotenv_1 = __importDefault(require("dotenv"));
//Routes
const home_1 = __importDefault(require("./routes/home"));
dotenv_1.default.config();
class App {
    constructor() {
        //Routes
        this.apiPath = {
            home: "/api/v2/",
            auth: "/api/v2/auth",
            errorPage: "/api/v2/error"
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "4000";
        //Middlewares
        //Routes
        this.routes();
    }
    //Routing
    routes() {
        this.app.use(this.apiPath.home, home_1.default);
    }
    //Server Function
    listen() {
        this.app.listen(this.port, () => {
            try {
                console.log(`Server Running on http://localhost`.bgGreen, `:${this.port} `.black.bgYellow);
            }
            catch (error) {
                console.log("Server Error".red);
                console.log("Error Message: ", error);
            }
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map