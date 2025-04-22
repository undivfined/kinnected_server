"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCard = addCard;
const connection_1 = __importDefault(require("../../db/connection"));
function addCard({ creator_username, type_of_relationship, timezone, date_of_birth, name, date_of_last_contact, }) {
    return connection_1.default
        .query(`INSERT INTO cards (creator_username, type_of_relationship,
  timezone, date_of_birth, name, date_of_last_contact) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [
        creator_username,
        type_of_relationship,
        timezone,
        date_of_birth,
        name,
        date_of_last_contact,
    ])
        .then(({ rows: [card] }) => {
        return card;
    });
}
