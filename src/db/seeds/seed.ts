import format from "pg-format";
import bcrypt from "bcrypt";

import db from "../connection";
import { Users, Credentials, Connections, Cards } from "../dataTypes";
import { formatFunc } from "../../utils";

const seed = ({
  userData,
  credentialsData,
  connectionsData,
  cardData,
}: {
  userData: Users;
  credentialsData: Credentials;
  connectionsData: Connections;
  cardData: Cards;
}) => {
  return db
    .query("DROP TABLE IF EXISTS credentials")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS connections");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS cards");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS users");
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
      const formattedUserData = formatFunc(userData);
      const usersString = format(
        `INSERT INTO users (first_name, last_name, username, timezone, date_of_birth, avatar_url) VALUES %L RETURNING *`,
        formattedUserData
      );
      return db.query(usersString);
    })
    .then(() => {
      return Promise.all(
        credentialsData.map((credential) => {
          return bcrypt.hash(credential.password, 10);
        })
      );
    })
    .then((hashedPasswords) => {
      const dataWithHashedPasswords = hashedPasswords.map((password, i) => {
        return { username: credentialsData[i].username, password: password };
      });
      const formattedCredentialData = formatFunc(dataWithHashedPasswords);
      const credentialsString = format(
        `INSERT INTO credentials (username, password) VALUES %L RETURNING *`,
        formattedCredentialData
      );
      return db.query(credentialsString);
    })
    .then(() => {
      const formattedCardsData = formatFunc(cardData);
      const cardsString = format(
        `INSERT INTO cards (creator_username, type_of_relationship, name, timezone, date_of_birth, date_of_last_contact) VALUES %L RETURNING *`,
        formattedCardsData
      );
      return db.query(cardsString);
    })
    .then(() => {
      const formattedConnectionsData = formatFunc(connectionsData);
      const connectionsString = format(
        `INSERT INTO connections (username_1, username_2, type_of_relationship, date_of_last_contact, messaging_link) VALUES %L RETURNING *`,
        formattedConnectionsData
      );
      return db.query(connectionsString);
    });
};

function createUsers() {
  return db.query(`CREATE TABLE users(
    username VARCHAR(50) PRIMARY KEY NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    timezone VARCHAR(50) NOT NULL, 
    date_of_birth DATE NOT NULL, 
    avatar_url VARCHAR(1000) 
    )`);
}

function createCredentials() {
  return db.query(`CREATE TABLE credentials(
    credentials_id SERIAL PRIMARY KEY, 
    username VARCHAR(50)  NOT NULL REFERENCES users(username) ON DELETE CASCADE,
    password VARCHAR(100) NOT NULL
    )`);
}

function createCards() {
  return db.query(`CREATE TABLE cards(
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
  return db.query(`CREATE TABLE connections(
    connection_id SERIAL PRIMARY KEY, 
    username_1 VARCHAR(50) NOT NULL REFERENCES users(username) ON DELETE CASCADE,
    username_2 VARCHAR(50) NOT NULL REFERENCES users(username) ON DELETE CASCADE,
    type_of_relationship VARCHAR(50), 
    date_of_last_contact TIMESTAMPTZ DEFAULT NULL,
    messaging_link VARCHAR(50),
    UNIQUE (username_1, username_2)
    )`);
}

export default seed;
