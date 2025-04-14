import seed from "./seed";
import db from "../connection";

const runSeed = () => {
  return seed({
    userData: [{ firstName: "FirstName", secondName: "SecondName" }],
  }).then(() => db.end());
};

runSeed();
