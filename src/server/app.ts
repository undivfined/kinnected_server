import express from "express";

import { getUsers, postUser } from "./controllers/users.controllers";
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

const app = express();

app.use(express.json());

app.get("/api/users", getUsers);

app.post("/api/users", postUser);

app.post("/api/connections", postConnection);

app.delete("/api/connections/:connection_id", deleteConnectionById);

app.patch("/api/connections/:connection_id", patchConnectionById);

app.use((request, response, next) => {
  response.status(404).send({ message: "path not found" });
});

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

export default app;
