import { NextFunction, Request, Response } from "express";
import {
  createConnection,
  removeConnectionById,
  updateCommentById,
} from "../models/connections.models";
import { checkExists } from "../../utils";
import { ChangeConnectionDto, CreateConnectionDto } from "../../dto/dtos";

export function postConnection(
  request: Request<{}, {}, CreateConnectionDto>,
  response: Response,
  next: NextFunction
) {
  const connection = request.body;
  createConnection(connection)
    .then((createdConnection) => {
      response.status(201).send({ createdConnection });
    })
    .catch((error) => {
      next(error);
    });
}

export function deleteConnectionById(
  request: Request<{connection_id: number}, {}, {}>,
  response: Response,
  next: NextFunction
) {
  const { connection_id } = request.params;
  checkExists("connections", "connection_id", connection_id)
    .then(() => {
      removeConnectionById(connection_id);
    })
    .then(() => {
      response.status(204).send();
    })
    .catch((error) => {
      next(error);
    });
}


export function patchConnectionById(
  request: Request<{connection_id: number}, {}, ChangeConnectionDto>,
  response: Response,
  next: NextFunction
) {
  const { connection_id } = request.params;
  const { type_of_relationship, date_of_last_contact } = request.body;

  const promises = [updateCommentById(connection_id, type_of_relationship, date_of_last_contact)];
  promises.push(checkExists("connections", "connection_id", connection_id));

  Promise.all(promises)
  .then(([updatedConnection]) => {
    response.status(200).send({ updatedConnection });
  })
  .catch((error) => {
    next(error);
  });
}