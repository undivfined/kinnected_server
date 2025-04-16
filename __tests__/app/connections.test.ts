import app from "../../src/server/app";
import request from "supertest";
import db from "../../src/db/connection";
import * as data from "../../src/db/data/test/index";
import seed from "../../src/db/seeds/seed";

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("/api/notAPath", () => {
  test("ANY 404: responds with error message when path is not found", () => {
    return request(app)
      .get("/api/notAPath")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("path not found");
      });
  });
});

describe("/api/connections", () => {
  describe("POST", () => {
    test("201: Creates a new connection object and inserts the connection into the database, responding with the inserted connection object", () => {
      return request(app)
        .post("/api/connections")
        .send({
          username_1: "amaraj_93",
          username_2: "z_ali_01",
          type_of_relationship: "Friend",
          date_of_last_contact: "2025-01-01T12:45:00Z",
          messaging_link: "",
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.createdConnection).toMatchObject({
            username_1: "amaraj_93",
            username_2: "z_ali_01",
            type_of_relationship: "Friend",
            date_of_last_contact: expect.any(String),
            messaging_link: "",
          });
          expect(body.createdConnection.connection_id).toEqual(
            expect.any(Number)
          );
        });
    });
    test("400: Responds with bad request when request body does not contain required properties", () => {
      return request(app)
        .post("/api/connections")
        .send({
          username_1: "amaraj_93",
          type_of_relationship: "Friend",
          date_of_last_contact: "2025-01-01T12:45:00Z",
          messaging_link: "",
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("bad request");
        });
    });
    test("400: Responds with bad request when request body has required properties, but with invalid values", () => {
      return request(app)
        .post("/api/connections")
        .send({
          username_1: "amaraj_93",
          username_2: "z_ali_01",
          type_of_relationship: "Friend",
          date_of_last_contact: "31/01/2025",
          messaging_link: "",
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("bad request");
        });
    });
    test("400: Responds with bad request when request body has required properties, but with invalid values where property value is foreign key referenced from another table", () => {
      return request(app)
        .post("/api/connections")
        .send({
          username_1: "amaraj_93",
          username_2: "nonexistent_User",
          type_of_relationship: "Friend",
          date_of_last_contact: "2025/01/31",
          messaging_link: "",
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("bad request");
        });
    });
    test("400: Responds with bad request when request body's username_1 & username_2 exactly match already-existing object's usernames", () => {
      return request(app)
        .post("/api/connections")
        .send({
          username_1: "amaraj_93",
          username_2: "liamc2020",
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("bad request");
        });
    });
    test("201: Creates a new connection object and inserts the connection into the database, responding with the inserted connection object, even if connection object exists with username_1 and username_2 values in switched position", () => {
      return request(app)
        .post("/api/connections")
        .send({
          username_1: "liamc2020",
          username_2: "amaraj_93",
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.createdConnection).toMatchObject({
            username_1: "liamc2020",
            username_2: "amaraj_93",
          });
          expect(body.createdConnection.connection_id).toEqual(
            expect.any(Number)
          );
        });
    });
  });
  describe("DELETE", () => {
    test("204: Deletes the given connection by connection_id", () => {
      return request(app).delete("/api/connections/5").expect(204);
    });
    test("400: Responds with bad request when given invalid connection_id", () => {
      return request(app)
        .delete("/api/connections/banana")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("bad request");
        });
    });
    test("404: Responds with not found when given valid connection_id which doesn't exist", () => {
      return request(app)
        .delete("/api/connections/58")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("not found");
        });
    });
  });
  describe("PATCH", () => {
    test("200: Updates type_of_relationship values of a connection object specified by connection_id, responding with updated connection, leaving other property values unchanged", () => {
      return request(app)
        .patch("/api/connections/1")
        .send({
          type_of_relationship: "Partner",
        })
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            updatedConnection: {
              username_1: "amaraj_93",
              username_2: "liamc2020",
              type_of_relationship: "Partner",
              date_of_last_contact: expect.any(String),
              messaging_link: "",
            },
          });
          expect(body.updatedConnection.connection_id).toEqual(
            expect.any(Number)
          );
        });
    });
    test("200: Updates date_of_last_contact values of a connection object specified by connection_id, responding with updated connection, leaving other property values unchanged", () => {
      return request(app)
        .patch("/api/connections/1")
        .send({
          date_of_last_contact: "2025-03-12T12:45:00Z",
        })
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            updatedConnection: {
              username_1: "amaraj_93",
              username_2: "liamc2020",
              type_of_relationship: "Friend",
              date_of_last_contact: "2025-03-12T12:45:00.000Z",
              messaging_link: "",
            },
          });
        });
    });
    test("200: Updates both type_of_relationship and date_of_last_contact values of a connection object specified by connection_id, responding with updated connection, leaving other property values unchanged", () => {
      return request(app)
        .patch("/api/connections/1")
        .send({
          type_of_relationship: "Family",
          date_of_last_contact: "2025-03-12T12:45:00Z",
        })
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            updatedConnection: {
              username_1: "amaraj_93",
              username_2: "liamc2020",
              type_of_relationship: "Family",
              date_of_last_contact: "2025-03-12T12:45:00.000Z",
              messaging_link: "",
            },
          });
        });
    });
    test("400: Responds with bad request when request body is missing required properties", () => {
      return request(app)
        .patch("/api/connections/1")
        .send({ some_other_field: "blahblah" })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("bad request");
        });
    });
    test("400: Responds with bad request when connection_id provided is invalid'", () => {
      return request(app)
        .patch("/api/connections/three")
        .send({
          type_of_relationship: "Partner",
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("bad request");
        });
    });
    test("404: Responds with not found when connection_id provided is valid, but doesnt exist", () => {
      return request(app)
        .patch("/api/connections/58")
        .send({
          type_of_relationship: "Partner",
        })
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("not found");
        });
    });
  });
});
