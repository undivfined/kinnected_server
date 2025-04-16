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
describe("POST /api/users", () => {
  test("201: Responds with an object representing the newly created user", () => {
    return request(app)
      .post("/api/users")
      .send({
        username: "new_user",
        first_name: "John",
        last_name: "Doe",
        timezone: "America/New_York",
        date_of_birth: "1996-07-08",
        password: "123456789",
      })
      .expect(201)
      .then(({ body: { user } }) => {
        expect(user).toMatchObject({
          username: "new_user",
          first_name: "John",
          last_name: "Doe",
          timezone: "America/New_York",
          date_of_birth: "1996-07-07T23:00:00.000Z",
          avatar_url: null,
          password: "123456789",
        });
      });
  });
  test("400: Responds with bad request if a user with the given username already exists", () => {
    return request(app)
      .post("/api/users")
      .send({
        username: "sofmartz",
        first_name: "John",
        last_name: "Doe",
        timezone: "America/New_York",
        date_of_birth: "1996-07-08",
        password: "123456789",
      })
      .expect(400)
      .then(({ body: { message } }) => {
        expect(message).toBe("A user with this username already exists");
      });
  });
  test("400: Responds with Bad Request in case the password in not valid", () => {
    return request(app)
      .post("/api/users")
      .send({
        username: "new_user",
        first_name: "John",
        last_name: "Doe",
        timezone: "America/New_York",
        date_of_birth: "1996-07-08",
        password: "",
      })
      .expect(400)
      .then(({ body: { message } }) => {
        expect(message).toBe("Bad Request");
      });
  });
  test("400: Responds with Bad Request if any of the required properies are missing", () => {
    return request(app)
      .post("/api/users")
      .send({
        username: "new_user",

        last_name: "Doe",
        timezone: "America/New_York",
        date_of_birth: "1996-07-08",
        password: "1234456",
      })
      .expect(400)
      .then(({ body: { message } }) => {
        expect(message).toBe("bad request");
      });
  });
  test("400: Responds with Bad Request if any of the properies are of the wrong data type", () => {
    return request(app)
      .post("/api/users")
      .send({
        username: "new_user",
        first_name: "John",
        last_name: "Doe",
        timezone: "America/New_York",
        date_of_birth: 123,
        password: "1234456",
      })
      .expect(400)
      .then(({ body: { message } }) => {
        expect(message).toBe("bad request");
      });
  });
});
describe("GET /api/users/:username", () => {
  test.only("200: Responds with a user object", () => {
    return request(app)
      .get("/api/users/amaraj_93")
      .expect(200)
      .then(({ body }) => {
        const user = body.user
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
