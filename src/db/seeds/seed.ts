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
      console.log("Dropped all tables");
    });
};
export default seed;
