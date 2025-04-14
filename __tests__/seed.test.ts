import db from "../src/db/connection";
import seed from "../src/db/seeds/seed";

beforeAll(() =>
  seed({
    userData: [{ firstName: "FirstName", secondName: "SecondName" }],
  })
);
afterAll(() => db.end());

describe("Tests...", () => {
  test("Empty test", () => {});
});
