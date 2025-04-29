"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionsRouter = void 0;
const express_1 = require("express");
const connections_controllers_1 = require("../server/controllers/connections.controllers");
exports.connectionsRouter = (0, express_1.Router)();
exports.connectionsRouter.post("/", connections_controllers_1.postConnection);
exports.connectionsRouter
    .route("/:connection_id")
    .patch(connections_controllers_1.patchConnectionById)
    .delete(connections_controllers_1.deleteConnectionById);
