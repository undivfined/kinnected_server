"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../src/utils");
describe("formatFunc", () => {
  test("returned nested arrays have expected elements", () => {
    // Arrange
    const credentialsData = [
      { username: "amaraj_93", password: "Starlight#42" },
      { username: "k_osei", password: "PalmWind01" },
    ];
    // Act
    const result = (0, utils_1.formatFunc)(credentialsData);
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
    (0, utils_1.formatFunc)(credentialsData);
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
