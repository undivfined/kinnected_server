import { formatFunc } from "../src/utils";
import { checkExists } from "../src/utils";
import db from "../src/db/connection";
import seed from "../src/db/seeds/seed";
import * as data from "../src/db/data/test/index";

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("formatFunc", () => {
  test("returned nested arrays have expected elements", () => {
    // Arrange
    const credentialsData = [
      { username: "amaraj_93", password: "Starlight#42" },
      { username: "k_osei", password: "PalmWind01" },
    ];

    // Act
    const result = formatFunc(credentialsData);

    // Assert
    expect(result[0]).toEqual(["amaraj_93", "Starlight#42"]);
    expect(result[1]).toEqual(["k_osei", "PalmWind01"]);
  });
  test("does not mutate the input array nor nested objects", () => {
    // Arrange
    const credentialsData = [
      { username: "amaraj_93", password: "Starlight#42" },
    ];

    // Act
    formatFunc(credentialsData);

    // Assert
    expect(credentialsData).toEqual([
      { username: "amaraj_93", password: "Starlight#42" },
    ]);
    expect(credentialsData[0]).toEqual({
      username: "amaraj_93",
      password: "Starlight#42",
    });
  });
});

describe("checkExists", () => {
  test("resolves when row exists", () => {
    return checkExists("connections", "connection_id", 1)
      .then(() => {
        expect(true).toBe(true);
      });
  });

  test("rejects with error when row does not exist", () => {
    return checkExists("connections", "connection_id", 9999)
      .catch((err) => {
        expect(err).toEqual({
          status: 404,
          message: "not found",
        });
      });
  });
});