"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errors_controllers_1 = require("./controllers/errors.controllers");
const api_router_1 = require("../routers/api-router");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", api_router_1.apiRouter);
app.use((request, response, next) => {
    response.status(404).send({ message: "path not found" });
});
app.use(errors_controllers_1.handlePsqlErrors);
app.use(errors_controllers_1.handleCustomErrors);
app.use(errors_controllers_1.handleServerErrors);
exports.default = app;
