import db from "../connection";

type UserObject = {
  firstName: string;
  secondName: string;
};

type UserData = UserObject[];

const seed = ({ userData }: { userData: UserData }) => {
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
      console.log("Dropped tables");
    });
};
export default seed;
