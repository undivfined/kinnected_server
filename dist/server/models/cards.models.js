"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCard = addCard;
exports.removeCard = removeCard;
exports.editCard = editCard;
const connection_1 = __importDefault(require("../../db/connection"));
const utils_1 = require("../../utils");
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
function removeCard(card_id) {
    return (0, utils_1.checkExists)("cards", "card_id", card_id).then(() => {
        return connection_1.default.query(`DELETE FROM cards WHERE card_id=$1`, [card_id]);
    });
}
function editCard(card_id, type_of_relationship, name, timezone, date_of_birth, date_of_last_contact) {
    return (0, utils_1.checkExists)("cards", "card_id", card_id).then(() => {
        const updates = [];
        const values = [];
        let paramIndex = 1;
        if (type_of_relationship !== undefined) {
            updates.push(`type_of_relationship = $${paramIndex++}`);
            values.push(type_of_relationship);
        }
        if (date_of_last_contact !== undefined) {
            updates.push(`date_of_last_contact = $${paramIndex++}`);
            values.push(date_of_last_contact);
        }
        if (name) {
            updates.push(`name = $${paramIndex++}`);
            values.push(name);
        }
        if (timezone) {
            updates.push(`timezone = $${paramIndex++}`);
            values.push(timezone);
        }
        if (date_of_birth !== undefined) {
            updates.push(`date_of_birth = $${paramIndex++}`);
            values.push(date_of_birth);
        }
        values.push(card_id);
        const query = `
      UPDATE cards
      SET ${updates.join(", ")}
      WHERE card_id = $${paramIndex}
      RETURNING *;
    `;
        return connection_1.default.query(query, values).then(({ rows }) => rows[0]);
    });
}
