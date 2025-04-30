import { Router } from "express";
import {
  deleteCard,
  patchCard,
  postCard,
} from "../server/controllers/cards.controllers";

export const cardsRouter = Router();

cardsRouter.post("/", postCard);
cardsRouter.route("/:card_id").patch(patchCard).delete(deleteCard);
