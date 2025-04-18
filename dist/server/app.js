"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_controllers_1 = require("./controllers/users.controllers");
const connections_controllers_1 = require("./controllers/connections.controllers");
const errors_controllers_1 = require("./controllers/errors.controllers");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/api/users", users_controllers_1.getUsers);
app.post("/api/users", users_controllers_1.postUser);
app.get("/api/users/:username/credentials", users_controllers_1.getCredentialByUsername);
app.get("/api/users/:username/contacts", users_controllers_1.getContactsByUsername);
app.post("/api/connections", connections_controllers_1.postConnection);
app.delete("/api/connections/:connection_id", connections_controllers_1.deleteConnectionById);
app.get("/api/users/:username", users_controllers_1.getUserByUsername);
app.patch("/api/connections/:connection_id", connections_controllers_1.patchConnectionById);
app.use((request, response, next) => {
    response.status(404).send({ message: "path not found" });
});
app.use(errors_controllers_1.handlePsqlErrors);
app.use(errors_controllers_1.handleCustomErrors);
app.use(errors_controllers_1.handleServerErrors);
exports.default = app;
