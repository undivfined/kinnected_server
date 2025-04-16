"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.postUser = postUser;
exports.getUserbyUsername = getUserbyUsername;

const users_1 = require("../models/users");
function getUsers(request, response) {
    response.status(200).send((0, users_1.fetchUsers)());
}
function postUser(request, response) {
    response.status(202).send((0, users_1.createUser)(request.body));
}

function getUserbyUsername(request, response) {
    response.status(200).send((0, users_1.fetchUserByUsername)());
}