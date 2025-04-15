import { NextFunction, Request, Response } from "express";
import { createUser, fetchUsers } from "../models/users";
import { CreateUserDto } from "../../dto/CreateUserDto";
import { createConnection } from "../models/connections";
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