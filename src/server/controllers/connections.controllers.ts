import { NextFunction, Request, Response } from "express";
import { createConnection, removeConnectionById } from "../models/connections.models";
import { connectionObject } from "../../db/dataTypes";
import { checkExists } from "../../utils";

type Params = { connection_id: number };

export function postConnection(request: Request<{}, {}, connectionObject>,response : Response, next: NextFunction) {
    const connection = request.body;
    createConnection(connection).then((createdConnection) => {
        response.status(201).send({createdConnection})
    })
    .catch((error) => {
        next(error);
      });
}

export function deleteConnectionById(request: Request<Params, {}, {}>,response : Response, next: NextFunction) {
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