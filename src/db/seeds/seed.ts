import format from "pg-format";
import db from "../connection";

import { Users, Credentials, Connections, Cards } from "../dataTypes";
import { formatFunc } from "./utils";

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
    .then(()=>{
      return createCredentials();
    })
    .then(()=>{
      return createCards();
    })
    .then(()=>{
      return createConnections();
    })
    .then(()=>{
      const formattedUserData = formatFunc(userData)
      const usersString = format(
        `INSERT INTO users (first_name, last_name, username, timezone, date_of_birth, avatar_url) VALUES %L RETURNING *`, formattedUserData
      )
      return db.query(usersString)
    })
    .then(()=>{
      const formattedCredentialData = formatFunc(credentialsData)
      const credentialsString = format(
        `INSERT INTO credentials (username, password) VALUES %L RETURNING *`, formattedCredentialData
      )
      return db.query(credentialsString)
    })
};

function createUsers() {
  return db.query(`CREATE TABLE users(
    username VARCHAR(50) PRIMARY KEY NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    timezone VARCHAR(50) NOT NULL, 
    date_of_birth DATE NOT NULL, 
    avatar_url VARCHAR(1000) 
    )`)
}

function createCredentials(){
  return db.query(`CREATE TABLE credentials(
    credentials_id SERIAL PRIMARY KEY, 
    username VARCHAR(50) REFERENCES users(username) NOT NULL,
    password VARCHAR(15) NOT NULL
    )`)
}

function createCards(){
  return db.query(`CREATE TABLE cards(
    card_id SERIAL PRIMARY KEY,
    creator_username VARCHAR(50) NOT NULL, CONSTRAINT fk_creator_username FOREIGN KEY (creator_username) REFERENCES users(username),
    type_of_relationship VARCHAR(50),
    name VARCHAR(50) NOT NULL,
    timezone VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    date_of_last_contact TIMESTAMP DEFAULT NULL
    )`)
}

function createConnections(){
  return db.query(`CREATE TABLE connections(
    connection_id SERIAL PRIMARY KEY, 
    username_1 VARCHAR(50) NOT NULL, CONSTRAINT fk_username_1 FOREIGN KEY (username_1) REFERENCES users(username),
    username_2 VARCHAR(50) NOT NULL, CONSTRAINT fk_username_2 FOREIGN KEY (username_2) REFERENCES users(username),
    type_of_relationship VARCHAR(50), 
    date_of_last_contact TIMESTAMP DEFAULT NULL,
    messaging_link VARCHAR(50)
    )`)
}

export default seed;
