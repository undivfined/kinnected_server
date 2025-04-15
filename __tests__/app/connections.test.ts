import app from "../../src/server/app";
import request from "supertest";
import db from "../../src/db/connection";
import * as data from "../../src/db/data/test/index";
import seed from "../../src/db/seeds/seed";

beforeAll(() => seed(data));
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
        test.only("201: Creates a new connection object and inserts the connection into the database, responding with the inserted connection object", () => {
          return request(app)
            .post("/api/connections")
            .send({
                username_1: "amaraj_93",
                username_2: "z_ali_01",
                type_of_relationship: "Friend",
                date_of_last_contact: "2025-01-01T12:45:00Z",
                messaging_link: ""
              })
            .expect(201)
            .then(({ body }) => {
              expect(body).toMatchObject({
                createdConnection: {
                    connection_id: 16,
                    username_1: "amaraj_93",
                    username_2: "z_ali_01",
                    type_of_relationship: "Friend",
                    date_of_last_contact: expect.any(String),
                    messaging_link: ""
                },
              });
            });
        });
        test("400: Responds with bad request when request body does not contain required properties", () => {
          return request(app)
            .post("/api/connections")
            .send({
                username_1: "amaraj_93",
                type_of_relationship: "Friend",
                date_of_last_contact: "2025-01-01T12:45:00Z",
                messaging_link: ""
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
                date_of_last_contact: "2025/01/31",
                messaging_link: ""
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
                username_2: "someone_New",
                type_of_relationship: "Friend",
                date_of_last_contact: "2025/01/31",
                messaging_link: ""
              })
            .expect(400)
            .then(({ body }) => {
              expect(body.message).toBe("bad request");
            });
        });
        test("400: Responds with bad request when request body matches already-existing object", () => {
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
      });
})
