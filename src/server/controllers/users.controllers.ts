import { NextFunction, Request, Response } from "express";
import { addUser, fetchUsers } from "../models/users.models";
import { CreateUserDto } from "../../dto/dtos";

export function getUsers(request: Request, response: Response) {
  const { search } = request.query;

  fetchUsers(search).then((users) => {
    response.status(200).send({ users });
  });
}

export function postUser(
  request: Request<{}, {}, CreateUserDto>,
  response: Response,
  next: NextFunction
) {
  const {
    username,
    first_name,
    last_name,
    timezone,
    date_of_birth,
    avatar_url,
    password,
  } = request.body;

  addUser({
    username,
    first_name,
    last_name,
    timezone,
    date_of_birth,
    avatar_url,
    password,
  })
    .then((user) => {
      response.status(201).send({ user });
    })
    .catch((error) => {
      next(error);
    });
}
