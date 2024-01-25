"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = (0, express_1.Router)();
//Home
route
    .get("/", (req, res) => {
    res.status(200).json({
        message: "Hello from Home"
    });
});
exports.default = route;
//# sourceMappingURL=home.js.map