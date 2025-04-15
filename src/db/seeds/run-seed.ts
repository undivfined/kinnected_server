import seed from "./seed";
import db from "../connection";

import * as data from "../data/development/index";

const runSeed = () => {
  return seed(data).then(() => db.end());
};

runSeed();
