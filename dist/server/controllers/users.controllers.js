"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.postUser = postUser;
exports.getUserByUsername = getUserByUsername;
exports.getCredentialByUsername = getCredentialByUsername;
exports.getContactsByUsername = getContactsByUsername;
const users_models_1 = require("../models/users.models");
function getUsers(request, response) {
    const { search } = request.query;
    (0, users_models_1.fetchUsers)(search).then((users) => {
        response.status(200).send({ users });
    });
}
function postUser(request, response, next) {
    const { username, first_name, last_name, timezone, date_of_birth, avatar_url, password, } = request.body;
    (0, users_models_1.addUser)({
        username,
        first_name,
        last_name,
        timezone,
        date_of_birth,
        avatar_url,
        password,
    })
        .then((user) => {
        response.status(201).send({ user });
    })
        .catch((error) => {
        next(error);
    });
}
function getUserByUsername(request, response, next) {
    const { username } = request.params;
    (0, users_models_1.fetchUserByUsername)(username)
        .then((user) => {
        response.status(200).send({ user });
    })
        .catch((error) => {
        next(error);
    });
}
function getCredentialByUsername(request, response, next) {
    const { username } = request.params;
    (0, users_models_1.fetchCredentialByUsername)(username)
        .then((credential) => {
        response.status(200).send({ credential });
    })
        .catch((error) => {
        next(error);
    });
}
function getContactsByUsername(request, response, next) {
    const { username } = request.params;
    (0, users_models_1.fetchContactsByUsername)(username)
        .then((contacts) => {
        response.status(200).send({ contacts });
    })
        .catch((error) => {
        next(error);
    });
}
