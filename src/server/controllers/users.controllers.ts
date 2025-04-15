import { Request, Response } from "express";
import { fetchUsers } from "../models/users.models";

export function getUsers(request: Request, response: Response) {
  const { search } = request.query;

  fetchUsers(search).then((users) => {
    response.status(200).send({ users });
  });
}

export function postUsers(request: Request, response: Response) {
}
