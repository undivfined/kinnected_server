import express from "express";
import cors from "cors";

import {
  getUsers,
  postUser,
  getCredentialByUsername,
  getContactsByUsername,
  getUserByUsername,
} from "./controllers/users.controllers";

import {
  postConnection,
  deleteConnectionById,
  patchConnectionById,
} from "./controllers/connections.controllers";
import {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} from "./controllers/errors.controllers";
import {
  deleteCard,
  patchCard,
  postCard,
} from "./controllers/cards.controllers";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/users", getUsers);

app.post("/api/users", postUser);

app.get("/api/users/:username/credentials", getCredentialByUsername);

app.get("/api/users/:username/contacts", getContactsByUsername);

app.post("/api/connections", postConnection);

app.delete("/api/connections/:connection_id", deleteConnectionById);

app.get("/api/users/:username", getUserByUsername);

app.patch("/api/connections/:connection_id", patchConnectionById);

app.post("/api/cards", postCard);

app.delete("/api/cards/:card_id", deleteCard);

app.patch("/api/cards/:card_id", patchCard);

app.use((request, response, next) => {
  response.status(404).send({ message: "path not found" });
});

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

export default app;
