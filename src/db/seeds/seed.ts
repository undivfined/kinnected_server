import db from "../connection";

import { Users, Credentials, Connections, Cards } from "../dataTypes";

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
      return db.query("DROP TABLE IF EXISTS contact_cards");
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
    username VARCHAR(50) NOT NULL, CONSTRAINT fk_username FOREIGN KEY (username) REFERENCES users(username),
    password VARCHAR(15) NOT NULL
    )`)
}

function createCards(){
  return db.query(`CREATE TABLE cards(
    creator_username VARCHAR(50) NOT NULL, CONSTRAINT fk_creator_username FOREIGN KEY (creator_username) REFERENCES users(username),
    type_of_relationship VARCHAR(50),
    name VARCHAR(50) NOT NULL,
    timezone VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    date_of_last_contact DATE DEFAULT NULL
    )`)
}

export default seed;
