"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../connection"));
const seed = ({ userData }) => {
    return connection_1.default
        .query("DROP TABLE IF EXISTS credentials")
        .then(() => {
        return connection_1.default.query("DROP TABLE IF EXISTS connections");
    })
        .then(() => {
        return connection_1.default.query("DROP TABLE IF EXISTS contact_cards");
    })
        .then(() => {
        return connection_1.default.query("DROP TABLE IF EXISTS users");
    })
        .then(() => {
        console.log("Dropped tables");
    });
};
exports.default = seed;
