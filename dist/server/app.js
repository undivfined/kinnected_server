"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const express_1 = __importDefault(require("express"));
const users_1 = require("./controllers/users");
const app = (0, express_1.default)();

app.use(express_1.default.json());
app.get("/api/users", users_1.getUsers);
app.post("/api/users", users_1.postUser);
app.get("/api/users/:username", users_1.getUserbyUsername);

exports.default = app;

