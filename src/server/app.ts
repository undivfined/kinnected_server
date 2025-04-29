import express from "express";
import cors from "cors";

import {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} from "./controllers/errors.controllers";

import { apiRouter } from "../routers/api-router";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.use((request, response, next) => {
  response.status(404).send({ message: "path not found" });
});

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

export default app;
