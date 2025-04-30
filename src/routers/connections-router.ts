import { Router } from "express";
import {
  deleteConnectionById,
  patchConnectionById,
  postConnection,
} from "../server/controllers/connections.controllers";

export const connectionsRouter = Router();

connectionsRouter.post("/", postConnection);
connectionsRouter
  .route("/:connection_id")
  .patch(patchConnectionById)
  .delete(deleteConnectionById);
