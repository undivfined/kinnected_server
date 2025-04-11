"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUsers = fetchUsers;
exports.createUser = createUser;
function fetchUsers() {
    return {
        user1: "User 1",
        user2: "User 2",
    };
}
function createUser(body) {
    return body;
}
