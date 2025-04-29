import { Router } from "express";
import { usersRouter } from "./users-router";
import { cardsRouter } from "./cards-router";
import { connectionsRouter } from "./connections-router";

export const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/cards", cardsRouter);
apiRouter.use("/connections", connectionsRouter);
