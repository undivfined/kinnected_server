"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_format_1 = __importDefault(require("pg-format"));
const connection_1 = __importDefault(require("../connection"));
const utils_1 = require("./utils");
const seed = ({ userData, credentialsData, connectionsData, cardData, }) => {
    return connection_1.default
        .query("DROP TABLE IF EXISTS credentials")
        .then(() => {
        return connection_1.default.query("DROP TABLE IF EXISTS connections");
    })
        .then(() => {
        return connection_1.default.query("DROP TABLE IF EXISTS cards");
    })
        .then(() => {
        return connection_1.default.query("DROP TABLE IF EXISTS users");
    })
        .then(() => {
        return createUsers();
    })
        .then(() => {
        return createCredentials();
    })
        .then(() => {
        return createCards();
    })
        .then(() => {
        return createConnections();
    })
        .then(() => {
        const formattedUserData = (0, utils_1.formatFunc)(userData);
        const usersString = (0, pg_format_1.default)(`INSERT INTO users (first_name, last_name, username, timezone, date_of_birth, avatar_url) VALUES %L RETURNING *`, formattedUserData);
        return connection_1.default.query(usersString);
    })
        .then(() => {
        const formattedCredentialData = (0, utils_1.formatFunc)(credentialsData);
        const credentialsString = (0, pg_format_1.default)(`INSERT INTO credentials (username, password) VALUES %L RETURNING *`, formattedCredentialData);
        return connection_1.default.query(credentialsString);
    })
        .then(() => {
        const formattedCardsData = (0, utils_1.formatFunc)(cardData);
        const cardsString = (0, pg_format_1.default)(`INSERT INTO cards (creator_username, type_of_relationship, name, timezone, date_of_birth, date_of_last_contact) VALUES %L RETURNING *`, formattedCardsData);
        return connection_1.default.query(cardsString);
    })
        .then(() => {
        const formattedConnectionsData = (0, utils_1.formatFunc)(connectionsData);
        const connectionsString = (0, pg_format_1.default)(`INSERT INTO connections (username_1, username_2, type_of_relationship, date_of_last_contact, messaging_link) VALUES %L RETURNING *`, formattedConnectionsData);
        return connection_1.default.query(connectionsString);
    });
};
function createUsers() {
    return connection_1.default.query(`CREATE TABLE users(
    username VARCHAR(50) PRIMARY KEY NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    timezone VARCHAR(50) NOT NULL, 
    date_of_birth DATE NOT NULL, 
    avatar_url VARCHAR(1000) 
    )`);
}
function createCredentials() {
    return connection_1.default.query(`CREATE TABLE credentials(
    credentials_id SERIAL PRIMARY KEY, 
    username VARCHAR(50)  NOT NULL REFERENCES users(username) ON DELETE CASCADE,
    password VARCHAR(15) NOT NULL
    )`);
}
function createCards() {
    return connection_1.default.query(`CREATE TABLE cards(
    card_id SERIAL PRIMARY KEY,
    creator_username VARCHAR(50) NOT NULL REFERENCES users(username) ON DELETE CASCADE,
    type_of_relationship VARCHAR(50),
    name VARCHAR(50) NOT NULL,
    timezone VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    date_of_last_contact TIMESTAMP DEFAULT NULL
    )`);
}
function createConnections() {
    return connection_1.default.query(`CREATE TABLE connections(
    connection_id SERIAL PRIMARY KEY, 
    username_1 VARCHAR(50) NOT NULL REFERENCES users(username) ON DELETE CASCADE,
    username_2 VARCHAR(50) NOT NULL REFERENCES users(username) ON DELETE CASCADE,
    type_of_relationship VARCHAR(50), 
    date_of_last_contact TIMESTAMP DEFAULT NULL,
    messaging_link VARCHAR(50)
    )`);
}
exports.default = seed;
