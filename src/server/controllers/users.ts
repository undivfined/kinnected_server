import { NextFunction, Request, Response } from "express";
import { createUser, fetchUsers } from "../models/users";
import { CreateUserDto } from "../../dto/CreateUserDto";

export function getUsers(request: Request,response : Response) {
    response.status(200).send(fetchUsers())
}

export function postUser(request: Request<{}, {}, CreateUserDto>,response : Response) {
    response.status(202).send(createUser(request.body))
}