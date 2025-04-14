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
};

function createUsers() {
  return db.query(`CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    timezone VARCHAR(50) NOT NULL, 
    date_of_birth DATE NOT NULL, 
    avatar_url VARCHAR(1000)
    )`)
}
export default seed;
