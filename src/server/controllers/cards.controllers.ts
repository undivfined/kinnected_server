import { Request, Response, NextFunction } from "express";
import { addCard } from "../models/cards.models";
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
