"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardData = exports.connectionsData = exports.credentialsData = exports.userData = void 0;
const users_1 = __importDefault(require("./users"));
exports.userData = users_1.default;
const credentials_1 = __importDefault(require("./credentials"));
exports.credentialsData = credentials_1.default;
const connections_1 = __importDefault(require("./connections"));
exports.connectionsData = connections_1.default;
const cards_1 = __importDefault(require("./cards"));
exports.cardData = cards_1.default;
