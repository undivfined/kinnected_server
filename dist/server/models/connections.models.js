"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConnection = createConnection;
exports.removeConnectionById = removeConnectionById;
exports.updateCommentById = updateCommentById;
const connection_1 = __importDefault(require("../../db/connection"));
function createConnection(connection) {
    const { username_1, username_2, type_of_relationship, date_of_last_contact, messaging_link, } = connection;
    return connection_1.default
        .query(`INSERT INTO connections(username_1, username_2, type_of_relationship, date_of_last_contact, messaging_link) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [
        username_1,
        username_2,
        type_of_relationship,
        date_of_last_contact,
        messaging_link,
    ])
        .then(({ rows }) => {
        return rows[0];
    });
}
function removeConnectionById(connection_id) {
    return connection_1.default.query(`DELETE FROM connections WHERE connection_id = $1`, [
        connection_id,
    ]);
}
function updateCommentById(connection_id, type_of_relationship, date_of_last_contact) {
    if (type_of_relationship === undefined && date_of_last_contact === undefined) {
        return Promise.reject({ status: 400, message: "bad request" });
    }
    if (!type_of_relationship && !date_of_last_contact) {
        return connection_1.default.query(`SELECT * FROM connections WHERE connection_id = $1`, [connection_id])
            .then(({ rows }) => rows[0]);
    }
    const updates = [];
    const values = [];
    let paramIndex = 1;
    if (type_of_relationship) {
        updates.push(`type_of_relationship = $${paramIndex++}`);
        values.push(type_of_relationship);
    }
    if (date_of_last_contact) {
        updates.push(`date_of_last_contact = $${paramIndex++}`);
        values.push(date_of_last_contact);
    }
    values.push(connection_id);
    const query = `
    UPDATE connections
    SET ${updates.join(", ")}
    WHERE connection_id = $${paramIndex}
    RETURNING *;
  `;
    return connection_1.default.query(query, values).then(({ rows }) => rows[0]);
}
