import { Request, Response, NextFunction } from "express";
import { addCard, removeCard } from "../models/cards.models";
import { CreateCardDto } from "../../dto/dtos";

export function postCard(
  request: Request<{}, {}, CreateCardDto>,
  response: Response,
  next: NextFunction
) {
  const {
    creator_username,
    type_of_relationship,
    timezone,
    date_of_birth,
    name,
    date_of_last_contact,
  } = request.body;

  addCard({
    creator_username,
    type_of_relationship,
    timezone,
    date_of_birth,
    name,
    date_of_last_contact,
  })
    .then((card) => {
      response.status(201).send({ card });
    })
    .catch((error) => {
      next(error);
    });
}

export function deleteCard(
  request: Request<{ card_id: number }>,
  response: Response,
  next: NextFunction
) {
  const { card_id } = request.params;
  removeCard(card_id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
}
