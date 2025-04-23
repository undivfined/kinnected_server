import app from "../../src/server/app";
import request from "supertest";
import db from "../../src/db/connection";
import seed from "../../src/db/seeds/seed";
import * as data from "../../src/db/data/test/index";

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("POST /api/cards", () => {
  test("201: Responds with an object representing the newly created card", () => {
    return request(app)
      .post("/api/cards")
      .send({
        creator_username: "sofmartz",
        name: "John Doe",
        type_of_relationship: "Friend",
        timezone: "America/New_York",
        date_of_birth: "1996-07-08",
        date_of_last_contact: "2025-04-08",
      })
      .expect(201)
      .then(({ body: { card } }) => {
        expect(card).toMatchObject({
          card_id: expect.any(Number),
          creator_username: "sofmartz",
          name: "John Doe",
          type_of_relationship: "Friend",
          timezone: "America/New_York",
          date_of_birth: expect.any(String),
          date_of_last_contact: expect.any(String),
        });
      });
  });
  test("201: Responds with an object representing the newly created card when only required fields are provided", () => {
    return request(app)
      .post("/api/cards")
      .send({
        creator_username: "sofmartz",
        name: "John Doe",
        timezone: "America/New_York",
        date_of_last_contact: "2025-04-08",
      })
      .expect(201)
      .then(({ body: { card } }) => {
        expect(card).toMatchObject({
          card_id: expect.any(Number),
          creator_username: "sofmartz",
          name: "John Doe",
          timezone: "America/New_York",
          date_of_last_contact: expect.any(String),
          type_of_relationship: null,
          date_of_birth: null,
        });
      });
  });
  test("400: Responds with bad request if a user with the provided creator_username does not exist", () => {
    return request(app)
      .post("/api/cards")
      .send({
        creator_username: "not_a_user",
        name: "John Doe",
        timezone: "America/New_York",
        date_of_last_contact: "2025-04-08",
      })
      .expect(400)
      .then(({ body: { message } }) => {
        expect(message).toBe("bad request");
      });
  });
  test("400: Responds with bad request if any of the required fields are not provided", () => {
    return request(app)
      .post("/api/cards")
      .send({
        creator_username: "sofmartz",
        timezone: "America/New_York",
        date_of_last_contact: "2025-04-08",
      })
      .expect(400)
      .then(({ body: { message } }) => {
        expect(message).toBe("bad request");
      });
  });
});
describe("DELETE /api/cards/:card_id", () => {
  test("204: Responds with 204 and deletes the card", () => {
    return request(app)
      .delete("/api/cards/1")
      .expect(204)
      .then(() => {
        return db.query(`SELECT * FROM cards WHERE card_id=1`);
      })
      .then(({ rows }) => {
        expect(rows.length).toBe(0);
      })
      .then(() => {
        return db.query(`SELECT * FROM cards`);
      })
      .then(({ rows }) => {
        expect(rows.length).toBe(14);
      });
  });
  test("404: Responds with not found if the requested card does not exist", () => {
    return request(app)
      .delete("/api/cards/1000")
      .expect(404)
      .then(({ body: { message } }) => {
        expect(message).toBe("not found");
      });
  });
  test("400: Responds with bad request if the card_id is not valid", () => {
    return request(app)
      .delete("/api/cards/not_an_id")
      .expect(400)
      .then(({ body: { message } }) => {
        expect(message).toBe("bad request");
      });
  });
});

describe("PATCH /api/cards/card_id", () => {
  test("200: Updates a single property of a card object specified by card_id, responding with updated card, leaving other property values unchanged", () => {
    return request(app)
      .patch("/api/cards/1")
      .send({
        type_of_relationship: "Partner",
      })
      .expect(200)
      .then(({ body: { card } }) => {
        expect(card).toMatchObject({
          card_id: 1,
          creator_username: "amaraj_93",
          type_of_relationship: "Partner",
          name: "Auntie T",
          timezone: "Europe/London",
          date_of_birth: expect.any(String),
          date_of_last_contact: expect.any(String),
        });
      });
  });
  test("200: Updates two values of a card object specified by card_id, responding with updated card, leaving other property values unchanged", () => {
    return request(app)
      .patch("/api/cards/1")
      .send({
        type_of_relationship: "Partner",
        name: "New Name",
      })
      .expect(200)
      .then(({ body: { card } }) => {
        expect(card).toMatchObject({
          card_id: 1,
          creator_username: "amaraj_93",
          type_of_relationship: "Partner",
          name: "New Name",
          timezone: "Europe/London",
          date_of_birth: expect.any(String),
          date_of_last_contact: expect.any(String),
        });
      });
  });
  test("200: Updates all values of a card object specified by card_id, responding with updated card, leaving other property values unchanged", () => {
    return request(app)
      .patch("/api/cards/1")
      .send({
        type_of_relationship: "Family",
        date_of_last_contact: "2025-03-12T12:45:00Z",
        name: "New Name",
        timezone: "Europe/Minsk",
        date_of_birth: "2020-03-12T12:45:00Z",
      })
      .expect(200)
      .then(({ body: { card } }) => {
        expect(card).toMatchObject({
          card_id: 1,
          creator_username: "amaraj_93",
          type_of_relationship: "Family",
          name: "New Name",
          timezone: "Europe/Minsk",
          date_of_birth: "2020-03-12T00:00:00.000Z",
          date_of_last_contact: "2025-03-12T12:45:00.000Z",
        });
      });
  });
  test("400: Responds with bad request when request body is missing required properties", () => {
    return request(app)
      .patch("/api/cards/1")
      .send({ some_other_field: "blahblah" })
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("bad request");
      });
  });
  test("400: Responds with bad request when card_id provided is invalid'", () => {
    return request(app)
      .patch("/api/cards/three")
      .send({
        type_of_relationship: "Partner",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("bad request");
      });
  });
  test("404: Responds with not found when card_id provided is valid, but doesnt exist", () => {
    return request(app)
      .patch("/api/cards/1000")
      .send({
        type_of_relationship: "Partner",
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("not found");
      });
  });
});
