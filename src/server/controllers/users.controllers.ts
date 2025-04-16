import { NextFunction, Request, Response } from "express";
import { addUser, fetchUsers, fetchUserByUsername } from "../models/users.models";
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
export function getUserByUsername(request: Request, response: Response) {
  const {username}  = request.params;
console.log(username)
  fetchUserByUsername(username).then((user) => {
    response.status(200).send({ user });
  });
}