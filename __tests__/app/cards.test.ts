import app from "../../src/server/app";
import request from "supertest";

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
});
