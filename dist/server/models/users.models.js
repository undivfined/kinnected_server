"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUsers = fetchUsers;
exports.addUser = addUser;
exports.fetchUserByUsername = fetchUserByUsername;
exports.fetchCredentialByUsername = fetchCredentialByUsername;
exports.fetchContactsByUsername = fetchContactsByUsername;
const connection_1 = __importDefault(require("../../db/connection"));
const utils_1 = require("../../utils");
function fetchUsers(search) {
    let sqlString = `WITH full_name_table as (SELECT *, first_name || last_name as full_name FROM users)
                    SELECT first_name, last_name, username, timezone, date_of_birth, avatar_url FROM full_name_table`;
    const queryValues = [];
    if (search) {
        sqlString += ` WHERE full_name ILIKE $1`;
        queryValues.push(`%${search}%`);
    }
    return connection_1.default.query(sqlString, queryValues).then(({ rows }) => {
        return rows.map((row) => {
            return Object.assign(Object.assign({}, row), { avatar_url: row.avatar_url ? row.avatar_url : "" });
        });
    });
}
function addUser(newUser) {
    const { username, first_name, last_name, timezone, date_of_birth, avatar_url, password, } = newUser;
    if (!password) {
        return Promise.reject({ status: 400, message: "Bad Request" });
    }
    return connection_1.default
        .query(`SELECT * FROM users WHERE username = $1`, [username])
        .then(({ rows }) => {
        if (rows.length !== 0) {
            return Promise.reject({
                status: 400,
                message: "A user with this username already exists",
            });
        }
        else {
            return connection_1.default.query(`INSERT INTO users (username, first_name, last_name, timezone, date_of_birth,
        avatar_url) VALUES ($1, $2, $3, $4, $5, $6)`, [username, first_name, last_name, timezone, date_of_birth, avatar_url]);
        }
    })
        .then(() => {
        return connection_1.default.query(`INSERT INTO credentials (username, password) VALUES ($1, $2)`, [username, password]);
    })
        .then(() => {
        return connection_1.default.query(`SELECT users.*, credentials.password FROM users JOIN credentials
      ON users.username=credentials.username WHERE users.username=$1`, [username]);
    })
        .then(({ rows: [user] }) => {
        if (!user.password) {
            return connection_1.default
                .query(`DELETE FROM users WHERE username = $1`, [username])
                .then(() => {
                // Aware that this is a nested then-block but cannot figure out another way to make sure both deleting
                // and rejecting the promise happen if the condition is met. This is a check for the unlikely case when
                // something happened in between the username being saved in users and the password being saved in passwords,
                // as we do not want users in users that do not have passwords.
                return Promise.reject({
                    status: 500,
                    message: "Something went wrong, please try again later",
                });
            });
        }
        if (user.password) {
            return user;
        }
    });
}
function fetchUserByUsername(username) {
    return connection_1.default
        .query(`SELECT * FROM users WHERE username = $1`, [username])
        .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, message: "path not found" });
        }
        return rows[0];
    });
}
function fetchCredentialByUsername(username) {
    return connection_1.default
        .query(`SELECT * FROM credentials WHERE username = $1`, [username])
        .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, message: "Not Found" });
        }
        return rows[0];
    });
}
function fetchContactsByUsername(username) {
    return (0, utils_1.checkExists)("users", "username", username).then(() => {
        const promises = [
            connection_1.default.query(`SELECT connections.connection_id AS contact_id, 
      concat(users.first_name, ' ', users.last_name) AS name,
      connections.type_of_relationship, connections.date_of_last_contact, connections.messaging_link,
      users.date_of_birth, users.timezone, users.avatar_url, connections.username_2 AS username
      FROM connections LEFT JOIN users on users.username = connections.username_2
      WHERE connections.username_1 = $1`, [username]),
            connection_1.default.query(`SELECT card_id as contact_id, name, type_of_relationship, timezone, date_of_birth, date_of_last_contact FROM cards WHERE creator_username = $1`, [username]),
        ];
        return Promise.all(promises).then(([{ rows: connections }, { rows: cards }]) => {
            const connectionsToReturn = connections.map((connection) => {
                connection.isCard = false;
                return connection;
            });
            const cardsToReturn = cards.map((card) => {
                card.isCard = true;
                card.messaging_link = "";
                card.avatar_url = "";
                card.username = null;
                return card;
            });
            return [...connectionsToReturn, ...cardsToReturn];
        });
    });
}
