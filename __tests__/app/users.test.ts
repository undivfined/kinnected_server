import app from "../../src/server/app";
import request from "supertest";
import { UserObject } from "../../src/db/dataTypes";
import seed from "../../src/db/seeds/seed";
import * as data from "../../src/db/data/test";
import db from "../../src/db/connection";

beforeEach(() => seed(data));

afterAll(() => db.end());

describe("GET /api/users", () => {
  test("200: Responds with an array of all user objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users.length).toBe(15);
        users.forEach((user: UserObject) => {
          expect(user).toMatchObject({
            username: expect.any(String),
            first_name: expect.any(String),
            last_name: expect.any(String),
            timezone: expect.any(String),
            date_of_birth: expect.any(String),
            avatar_url: expect.any(String),
          });
        });
      });
  });
  describe("?search", () => {
    test("200: Returns object where the search string can be found in first or last name", () => {
      return request(app)
        .get("/api/users?search=okoro")
        .expect(200)
        .then(({ body: { users } }) => {
          expect(users.length).toBe(1);
          expect(users[0].username).toBe("jamal.ok");
        });
    });
    test("200: Returns object where the search string can be found in first and last name combined", () => {
      return request(app)
        .get("/api/users?search=ayakawasaki")
        .expect(200)
        .then(({ body: { users } }) => {
          expect(users.length).toBe(1);
          expect(users[0].username).toBe("ayak_k");
        });
    });
    test("200: Returns an empty array if no users are found matching the search string", () => {
      return request(app)
        .get("/api/users?search=unknownuser")
        .expect(200)
        .then(({ body: { users } }) => {
          expect(users.length).toBe(0);
        });
    });
  });
});
