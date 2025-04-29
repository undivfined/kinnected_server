"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const users_controllers_1 = require("../server/controllers/users.controllers");
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter.route("/").get(users_controllers_1.getUsers).post(users_controllers_1.postUser);
exports.usersRouter
    .route("/:username")
    .get(users_controllers_1.getUserByUsername)
    .patch(users_controllers_1.patchUserByUsername)
    .delete(users_controllers_1.deleteUserByUsername);
exports.usersRouter.get("/:username/credentials", users_controllers_1.getCredentialByUsername);
exports.usersRouter.get("/:username/contacts", users_controllers_1.getContactsByUsername);
