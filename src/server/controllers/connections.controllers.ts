import { NextFunction, Request, Response } from "express";
import { createConnection } from "../models/connections.models";
import { connectionObject } from "../../db/dataTypes";


export function postConnection(request: Request<{}, {}, connectionObject>,response : Response, next: NextFunction) {
    const connection = request.body;
    createConnection(connection).then((createdConnection) => {
        response.status(201).send({createdConnection})
    })
    .catch((error) => {
        next(error);
      });
}